export interface SingleConcert {
  description: string;
  identifier: string;
  mediatype: string;
  title: string;
  year: number;
  date: string;
}

export type PaginatedConcertList = SingleConcert[][];

export enum SortOrder {
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
  searchTerm: string; // EX: 'Grateful+Dead+AND+year%3A1977'
  max: number;
  sortOrder: SortOrder;
  filterDuplicates: boolean;
}

// Base options not set by user
export interface BaseSearchOptions {
  searchBy: string;
  fields: string[];
}

// Options passed to archive.org
export interface ArchiveSearchOptions extends BaseSearchOptions {
  max: number;
  sortBy: Record<string, SortOrder>;
  filterDuplicates: boolean;
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
