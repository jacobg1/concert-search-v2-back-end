import * as chunk from 'lodash.chunk';
import {
  ArchiveSearchOptions,
  PaginatedConcertList,
  SearchResponse,
  SingleConcert,
} from '../interface/concerts.interface';

export const baseOptions: Omit<ArchiveSearchOptions, 'max' | 'sortBy'> = {
  searchBy: 'creator',
  fields: ['description', 'identifier', 'mediatype', 'title', 'year', 'date'],
};

export function formatResponse(
  searchResponse: SearchResponse,
): PaginatedConcertList {
  const filterMediaType = searchResponse.docs.filter(
    ({ mediatype }) => mediatype === 'etree',
  );
  return chunk(filterMediaType, 30);
}
