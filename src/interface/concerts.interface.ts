interface ConcertListParams {
  artistName: string;
  artistYear?: string;
}

interface SingleConcert {
  description: string;
  identifier: string;
  mediatype: string;
  title: string;
  year: number;
}

type PaginatedConcertList = SingleConcert[][];
