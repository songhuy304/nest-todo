import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule, JwtAuthGuard, QuizModule, UsersModule } from '@/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from '@/common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { apiConfig, typeorm } from '@/config';
import { APP_GUARD } from '@nestjs/core';
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
    AuthModule,
    UsersModule,
    QuizModule,
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
