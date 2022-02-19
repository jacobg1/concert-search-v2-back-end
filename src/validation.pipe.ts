import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ConcertListDto } from './dto';
import {
  ConcertSearchOptions,
  MediaFormat,
} from './interface/concerts.interface';

@Injectable()
export class MediaFormatPipe implements PipeTransform {
  formatValue(value: string[]): MediaFormat[] {
    return value.map((val) => MediaFormat[val.toLocaleUpperCase()]);
  }
  async transform(value: ConcertSearchOptions) {
    const { mediaFormat, ...rest } = value;

    const formatObj = {
      ...(mediaFormat && { mediaFormat: this.formatValue(mediaFormat) }),
      ...rest,
    };

    const instance = plainToClass(ConcertListDto, formatObj);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const joinErrors = (array) => (acc, curr, i) => {
        const sep = array.length > 1 && i >= 1 ? ', ' : '';
        return (acc += `${sep}${curr}`);
      };

      throw new BadRequestException(
        errors.map(({ constraints }) => {
          const array = Object.values(constraints);
          return array.reduce(joinErrors(array), '');
        }),
      );
    }
    return formatObj;
  }
}
