import { AppException, ErrorCodes } from '@/common';
import { User } from '@/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { BcryptService } from './bcrypt.service';
import { SignInDto, SignUpDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(user: SignInDto): Promise<{ accessToken: string }> {
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

    return await this.generateAccessToken(userEntity);
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

  async generateAccessToken(
    user: Partial<User>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();

    const payload = {
      id: user.id,
      email: user.email,
      tokenId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
