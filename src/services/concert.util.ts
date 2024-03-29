import { BadRequestException } from '@nestjs/common';
import chunk from 'lodash.chunk';
import {
  BaseSearchOptions,
  ConcertSearchOptions,
  MediaFormat,
  PaginatedConcertList,
  SearchResponse,
  SingleConcert,
} from '../interface/concerts.interface';

export const baseOptions: BaseSearchOptions = {
  searchBy: 'creator',
  fields: [
    'avg_rating',
    'reviews',
    'coverage',
    'creator',
    'date',
    'description',
    'downloads',
    'format',
    'licenseurl',
    'mediatype',
    'name',
    'num_reviews',
    'source',
    'title',
    'year',
  ],
};

// This ensures that concerts will have requested formats sent from front-end
const isProperFormat = (
  concertFormats: MediaFormat[],
  mediaFormat: MediaFormat[],
) => {
  return mediaFormat.some((format) => concertFormats.indexOf(format) !== -1);
};

type FilterParams = Pick<
  ConcertSearchOptions,
  'filterDuplicates' | 'mediaFormat'
>;

// Apply filters from front-end and paginate
export function paginateResponse(
  searchResponse: SearchResponse,
  { filterDuplicates, mediaFormat }: FilterParams,
): PaginatedConcertList {
  const filterAndDedupe = searchResponse.docs.reduce<SingleConcert[]>(
    (acc, curr) => {
      if (filterDuplicates) {
        if (
          isProperFormat(curr.format, mediaFormat) &&
          !acc.some(({ date }) => date === curr.date)
        ) {
          return acc.concat(curr);
        }
        return acc;
      }
      if (isProperFormat(curr.format, mediaFormat)) {
        return acc.concat(curr);
      }
      return acc;
    },
    [],
  );

  if (!filterAndDedupe.length) {
    throw new BadRequestException('No results');
  }

  return chunk(filterAndDedupe, 30);
}
