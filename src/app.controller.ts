import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ConcertSearchOptions,
  MediaFormat,
  PaginatedConcertList,
} from './interface/concerts.interface';
import { ConcertService } from './services/concert.service';

@Controller()
export class AppController {
  constructor(private readonly concertService: ConcertService) {}

  @Post('/concerts')
  getConcerts(
    @Body() body: ConcertSearchOptions,
  ): Promise<PaginatedConcertList> {
    return this.concertService.getConcertList(body);
  }

  @Get('/concerts/:id/format/:format')
  getConcertDataById(
    @Param('id') id: string,
    @Param('format') format: MediaFormat,
  ) {
    return this.concertService.getSingleConcert(id, format);
  }
}
