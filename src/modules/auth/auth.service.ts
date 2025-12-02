import { AppException, ErrorCodes } from '@/common';
import { User } from '@/modules/users/entities';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from './bcrypt.service';
import { SignInDto, SignUpDto } from './dtos';
import { IAuthResponse, IJwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: SignUpDto): Promise<void> {
    const exist = await this.usersRepository.findOneBy({
      username: payload.username,
    });
    if (exist) throw new AppException(ErrorCodes.USER_ALREADY_EXISTS);

    const hashedPassword = await this.bcryptService.hash(payload.password);
    await this.usersRepository.save({ ...payload, password: hashedPassword });
  }

  async signIn(user: SignInDto): Promise<IAuthResponse> {
    const validateUser = await this.validateUser(user);

    const token = await this.generateTokens(validateUser.id);
    const hashed = await this.bcryptService.hash(token.refreshToken);
    await this.usersRepository.update(validateUser.id, {
      refreshToken: hashed,
    });

    return token;
  }

  async refreshTokens(refreshToken: string): Promise<IAuthResponse> {
    try {
      const payload =
        await this.jwtService.verifyAsync<IJwtPayload>(refreshToken);

      const user = await this.usersRepository.findOne({
        where: { id: payload.id },
      });
      if (!user || !user.refreshToken)
        throw new UnauthorizedException('Invalid token');

      const isMatch = await this.bcryptService.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isMatch) throw new UnauthorizedException('Invalid token');

      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(user.id);
      const hashed = await this.bcryptService.hash(newRefreshToken);
      await this.usersRepository.update(user.id, { refreshToken: hashed });
      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async generateTokens(userId: number) {
    const payload: IJwtPayload = { id: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async validateUser(signInDto: SignInDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      username: signInDto.username,
    });
    if (!user)
      throw new AppException(
        ErrorCodes.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );

    const valid = await this.bcryptService.compare(
      signInDto.password,
      user.password,
    );
    if (!valid)
      throw new AppException(
        ErrorCodes.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async validateJwtUser(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'username'],
    });

    if (!user) throw new UnauthorizedException('User not found!');
    return user;
  }
}
