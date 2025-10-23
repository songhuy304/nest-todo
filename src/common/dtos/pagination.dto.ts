import { Transform, Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Transform(({ value }) => (value ? Number(value) : 10))
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : 1))
  page: number = 1;
}
