import { Logger, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ConcertListDto } from '../dto';
import { MediaFormat } from '../interface';
import type { ConcertSearchOptions } from '../interface';

export class ConcertValidator {
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

    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const joinErrors = (array) => (acc, curr, i) => {
        const sep = array.length > 1 && i >= 1 ? ', ' : '';
        return (acc += `${sep}${curr}`);
      };

      Logger.error(errors);

      // TODO - recursive function to format errors
      throw new BadRequestException(
        errors
          .map(({ constraints, children }) => {
            const nestedErrorsArray = children?.length
              ? children.map(({ constraints }) => Object.values(constraints))
              : [];

            const constraintsArray = constraints
              ? Object.values(constraints)
              : [];

            const array = [...constraintsArray, ...nestedErrorsArray];

            return array.reduce(joinErrors(array), '');
          })
          .join(', '),
      );
    }
    return formatObj;
  }
}
