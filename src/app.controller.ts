import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  ConcertSearchOptions,
  PaginatedConcertList,
} from './interface/concerts.interface';
import { ConcertService } from './services/concert.service';
// import concertListMock from '../test/mocks/concertListMock.json';
// import singleConcertResponse from '../test/mocks/singleConcertResponse.json';
import { MediaFormatPipe } from './validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly concertService: ConcertService) {}

  @Get('/')
  @HttpCode(200)
  async healthCheck(): Promise<string> {
    return 'Instance is healthy';
  }

  @Post('/concerts')
  @HttpCode(200)
  @UsePipes(new MediaFormatPipe())
  async getConcerts(
    @Body() body: ConcertSearchOptions,
  ): Promise<PaginatedConcertList> {
    return this.concertService.getConcertList(body);
  }

  @Get('/concerts/:id')
  async getConcertDataById(@Param('id') id: string) {
    return this.concertService.getSingleConcert(id);
  }
}
