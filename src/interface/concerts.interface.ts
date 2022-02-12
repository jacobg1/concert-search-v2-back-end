export interface SingleConcert {
  description: string;
  identifier: string;
  mediatype: string;
  title: string;
  year: number;
  date: string;
  coverage: string;
  creator: string;
  downloads: number;
  format: string[];
  source: string;
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

export type SortBy = Record<string, SortOrder>;

// Passed from front-end
export interface ConcertSearchOptions {
  searchTerm: string; // EX: 'Grateful+Dead+AND+year%3A1977'
  max: number;
  sortBy: SortBy;
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
  sortBy: SortBy;
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
  trackList: TrackListData[];
  metadata: TrackMetaData;
}

export interface ConcertResponse extends Omit<ConcertData, 'trackList'> {
  files: TrackListData[];
}
