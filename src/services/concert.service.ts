import { Injectable } from '@nestjs/common';
import * as concertListMock from '../../test/mocks/concertListMock.json';

@Injectable()
export class ConcertService {
  getConcertList(artistName: string, artistYear: string): any {
    return concertListMock;
  }
}
