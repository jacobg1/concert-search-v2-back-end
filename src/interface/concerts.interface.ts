export interface SingleConcert {
  description: string;
  identifier: string;
  mediatype: string;
  title: string;
  year: number;
  date: string;
}

export type PaginatedConcertList = SingleConcert[][];

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum MediaType {
  ETREE = 'etree',
}

export const { ETREE } = MediaType;

export enum MediaFormat {
  MP3 = 'VBR MP3',
  OGG = 'Ogg Vorbis',
}

// Passed from front-end
export interface ConcertSearchOptions {
  searchTerm: string; // 'Grateful+Dead+AND+year%3A1977'
  max: number;
  sortOrder: SortOrder;
}

type SortByOptions = Record<string, SortOrder>;

// Passed into archiveSearch library
export interface ArchiveSearchOptions {
  searchBy: string;
  fields: string[];
  max: number;
  sortBy: SortByOptions;
}

// Response from archive's api
export interface SearchResponse {
  numFound: number;
  start: number;
  docs: SingleConcert[];
}

interface TrackMetaData {
  title: string;
  numTracks: string;
  creator: string;
  description: string;
  date: string;
  venue: string;
  source: string;
}

interface TrackListData {
  name: string;
  link: string;
  title: string;
  creator: string;
  length: string;
  track: string;
  source: string;
  album: string;
  format: string;
}

export interface ConcertData {
  files: TrackListData[];
  metadata: TrackMetaData;
}
