import { Module } from '@nestjs/common';
import { TaskModule } from '@/modules';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
