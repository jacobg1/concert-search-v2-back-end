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

const { MP3 } = MediaFormat;

@Injectable()
export class ConcertService {
  async getConcertList({
    searchTerm,
    max,
    sortBy,
    ...rest
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

    return paginateResponse(searchConcerts, rest);
  }

  async getSingleConcert(id: string): Promise<ConcertData> {
    const concert: ConcertResponse = await archiveSearch.metaSearch(id);
    const { metadata, files } = concert;

    return {
      metadata,
      // Filter for mp3 so that we don't send uneeded formats to front-end
      // We can switch formats by updating file name someId.mp3 => someId.ogg
      trackList: files.filter((file) => file.format === MP3),
    };
  }
}
