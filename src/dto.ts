import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  ConcertSearchOptions,
  SortOrder,
} from './interface/concerts.interface';

export class GetConcertDto implements ConcertSearchOptions {
  @IsString()
  searchTerm: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  max: number;

  @IsEnum(SortOrder)
  sortOrder: SortOrder;

  @IsBoolean()
  filterDuplicates: boolean;
}
