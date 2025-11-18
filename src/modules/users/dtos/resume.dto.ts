import { Expose, Transform } from 'class-transformer';

export class ResumeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url?: string;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString() ?? null, { toPlainOnly: true })
  createdAt?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString() ?? null, { toPlainOnly: true })
  updatedAt?: string;
}
