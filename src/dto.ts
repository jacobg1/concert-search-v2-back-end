import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SortOrder } from './interface/concerts.interface';
import type { SortBy } from './interface/concerts.interface';

class SortByDto {
  @IsOptional()
  @IsEnum(SortOrder)
  date: SortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  downloads: SortOrder;
}

export class GetConcertDto {
  @IsString()
  searchTerm: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  max: number;

  @IsBoolean()
  filterDuplicates: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => SortByDto)
  sortBy: SortBy;
}
