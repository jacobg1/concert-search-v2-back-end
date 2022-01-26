import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ConcertSearchOptions,
  PaginatedConcertList,
} from './interface/concerts.interface';
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

  @Post('/searchConcerts')
  getConcerts(
    @Body() { searchTerm, max, sortOrder }: ConcertSearchOptions,
  ): Promise<PaginatedConcertList> {
    return this.concertService.getConcertList({ searchTerm, max, sortOrder });
  }
}
