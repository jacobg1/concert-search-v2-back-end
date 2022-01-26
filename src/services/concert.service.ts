import { archiveSearch } from 'archive-search';
import { Injectable } from '@nestjs/common';
import { baseOptions, formatResponse } from './concert.util';
import {
  ConcertSearchOptions,
  ArchiveSearchOptions,
  SearchResponse,
  PaginatedConcertList,
} from '../interface/concerts.interface';

import * as concertListMock from '../../test/mocks/concertListMock.json';
import * as searchResponse from '../../test/mocks/searchResponse.json';

@Injectable()
export class ConcertService {
  async getConcertList({
    searchTerm,
    max,
    sortOrder,
  }: ConcertSearchOptions): Promise<PaginatedConcertList> {
    const searchOptions: ArchiveSearchOptions = {
      ...baseOptions,
      max,
      sortBy: { date: sortOrder },
    };
    // const searchConcerts: SearchResponse = await archiveSearch.search(
    //   searchTerm,
    //   searchOptions,
    // );
    const searchConcerts: SearchResponse = searchResponse;
    return formatResponse(searchConcerts);
  }
}
