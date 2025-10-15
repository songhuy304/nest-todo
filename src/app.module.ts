import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskModule } from '@/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from '@/common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { apiConfig, typeorm } from '@/config';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
