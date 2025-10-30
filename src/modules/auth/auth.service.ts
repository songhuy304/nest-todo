import { AppException, ErrorCodes } from '@/common';
import { User } from '@/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { BcryptService } from './bcrypt.service';
import { SignInDto, SignUpDto } from './dtos';
import { JwtPayload } from '@/common/interfaces';
import { IAuthResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(user: SignInDto): Promise<IAuthResponse> {
    const userEntity = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (!userEntity) {
      throw new AppException(
        ErrorCodes.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await this.bcryptService.compare(
      user.password,
      userEntity.password,
    );

    if (!isPasswordValid) {
      throw new AppException(
        ErrorCodes.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { accessToken, refreshToken } = await this.generateTokens(userEntity);

    await this.usersRepository.update(userEntity.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(payload: SignUpDto): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        username: payload.username,
      },
    });

    if (user) {
      throw new AppException(
        ErrorCodes.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.bcryptService.hash(payload.password);

    await this.usersRepository.save({
      ...payload,
      password: hashedPassword,
    });

    return;
  }

  async refreshTokens(refreshToken: string): Promise<IAuthResponse> {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.usersRepository.findOne({
        where: { id: payload.id },
      });

      if (!user || !user.refreshToken) {
        throw new AppException(
          ErrorCodes.USER_INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isMatch = await this.bcryptService.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isMatch) {
        throw new AppException(
          ErrorCodes.USER_INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(user);

      await this.usersRepository.update(user.id, {
        refreshToken: newRefreshToken,
      });

      // 6. Trả token mới
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new AppException(
        ErrorCodes.USER_INVALID_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenId = randomUUID();

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      tokenId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const hashedRefresh = await this.bcryptService.hash(refreshToken);

    return { accessToken, refreshToken: hashedRefresh };
  }
}
