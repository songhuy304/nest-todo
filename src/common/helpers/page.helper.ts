import { PageDto, PageMetaDto } from '../dtos';

export function buildPage<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PageDto<T> {
  const meta = new PageMetaDto({
    pageNumber: page,
    maxPerPage: limit,
    totalItem: total,
  });

  return new PageDto(data, meta);
}
