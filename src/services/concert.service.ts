import { archiveSearch } from 'archive-search';
import { Injectable } from '@nestjs/common';
import { baseOptions, paginateResponse } from './concert.util';
import {
  ConcertSearchOptions,
  SearchResponse,
  PaginatedConcertList,
  ConcertData,
  MediaFormat,
  ArchiveSearchOptions,
  ConcertResponse,
} from '../interface/concerts.interface';

// import * as concertListMock from '../../test/mocks/concertListMock.json';
// import * as searchResponse from '../../test/mocks/searchResponse.json';

@Injectable()
export class ConcertService {
  async getConcertList({
    searchTerm,
    max,
    sortBy,
    filterDuplicates,
  }: ConcertSearchOptions): Promise<PaginatedConcertList> {
    const searchOptions: ArchiveSearchOptions = {
      ...baseOptions,
      max,
      sortBy,
    };
    const searchConcerts: SearchResponse = await archiveSearch.search(
      searchTerm,
      searchOptions,
    );
    // const searchConcerts: any = searchResponse;
    return paginateResponse(searchConcerts, filterDuplicates);
  }
  async getSingleConcert(
    id: string,
    format: MediaFormat,
  ): Promise<ConcertData> {
    const selectedFormat = MediaFormat[format.toUpperCase()];
    const concert: ConcertResponse = await archiveSearch.metaSearch(id);

    const { metadata, files } = concert;
    return {
      metadata,
      trackList: files.filter((file) => file.format === selectedFormat),
    };
  }
}
