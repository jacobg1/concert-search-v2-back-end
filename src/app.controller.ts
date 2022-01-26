import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ConcertService } from './services/concert.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly concertService: ConcertService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/concertList/:artistName/:artistYear?')
  getConcerts(@Param() { artistName, artistYear }: ConcertListParams) {
    return this.concertService.getConcertList(artistName, artistYear);
  }
}
