import { archiveSearch } from 'archive-search';
import { Injectable } from '@nestjs/common';
import { baseOptions, paginateResponse } from './concert.util';
import {
  ConcertSearchOptions,
  ArchiveSearchOptions,
  SearchResponse,
  PaginatedConcertList,
  ConcertData,
  MediaFormat,
} from '../interface/concerts.interface';

// import * as concertListMock from '../../test/mocks/concertListMock.json';
// import * as searchResponse from '../../test/mocks/searchResponse.json';

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
    const searchConcerts: SearchResponse = await archiveSearch.search(
      searchTerm,
      searchOptions,
    );
    // const searchConcerts: SearchResponse = searchResponse;
    return paginateResponse(searchConcerts);
  }

  async getSingleConcert(
    id: string,
    format: MediaFormat,
  ): Promise<ConcertData> {
    const selectedFormat = MediaFormat[format.toUpperCase()];
    const concert: ConcertData = await archiveSearch.metaSearch(id);

    const { metadata, files } = concert;
    return {
      metadata,
      files: files.filter((file) => file.format === selectedFormat),
    };
  }
}
