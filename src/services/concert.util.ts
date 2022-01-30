import chunk from 'lodash.chunk';
import {
  ArchiveSearchOptions,
  ETREE,
  PaginatedConcertList,
  SearchResponse,
} from '../interface/concerts.interface';

export const baseOptions: Omit<ArchiveSearchOptions, 'max' | 'sortBy'> = {
  searchBy: 'creator',
  fields: ['description', 'identifier', 'mediatype', 'title', 'year', 'date'],
};

export function paginateResponse(
  searchResponse: SearchResponse,
): PaginatedConcertList {
  const filterMediaType = searchResponse.docs.filter(
    ({ mediatype }) => mediatype === ETREE,
  );
  return chunk(filterMediaType, 30);
}
