import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskModule } from '@/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from '@/common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { apiConfig, typeorm } from '@/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm')!,
    }),
    TaskModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
