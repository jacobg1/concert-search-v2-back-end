import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConcertModule } from './services/concert.module';

@Module({
  imports: [ConcertModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
