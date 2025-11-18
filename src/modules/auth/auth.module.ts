import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import { UsersModule } from '../users';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities';
import { jwtConfig } from '@/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  exports: [AuthService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
