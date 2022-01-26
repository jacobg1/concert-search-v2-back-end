export interface SingleConcert {
  description?: string;
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

// Passed from front-end
export interface ConcertSearchOptions {
  searchTerm: string; // 'Grateful+Dead+AND+year%3A1977'
  max: number;
  sortOrder: SortOrder;
}

// Passed into archiveSearch library
export interface ArchiveSearchOptions {
  searchBy: string;
  fields: string[];
  max: number;
  sortBy: SortByOptions;
}

type SortByOptions = Record<string, SortOrder>;

// Response from archive's api
export interface SearchResponse {
  numFound: number;
  start: number;
  docs: SingleConcert[];
}
