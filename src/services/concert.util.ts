import { BadRequestException } from '@nestjs/common';
import chunk from 'lodash.chunk';
import {
  BaseSearchOptions,
  ETREE,
  MediaFormat,
  PaginatedConcertList,
  SearchResponse,
  SingleConcert,
} from '../interface/concerts.interface';

const { MP3, OGG } = MediaFormat;

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

const includesFormat = (array: string[]) => {
  return [OGG, MP3].some((format) => array.indexOf(format) !== -1);
};

const isProperFormat = (mediatype: string, format: string[]) => {
  return mediatype === ETREE && includesFormat(format);
};

export function paginateResponse(
  searchResponse: SearchResponse,
  filterDuplicates: boolean,
): PaginatedConcertList {
  const filterAndDedupe = searchResponse.docs.reduce<SingleConcert[]>(
    (acc, curr) => {
      if (filterDuplicates) {
        if (
          isProperFormat(curr.mediatype, curr.format) &&
          !acc.some(({ date }) => date === curr.date)
        ) {
          return acc.concat(curr);
        }
        return acc;
      }
      if (isProperFormat(curr.mediatype, curr.format)) {
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
