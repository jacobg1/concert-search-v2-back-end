import { Module } from '@nestjs/common';
import { ConcertModule } from './services/concert.module';

@Module({
  imports: [ConcertModule],
  providers: [],
})
export class AppModule {}
