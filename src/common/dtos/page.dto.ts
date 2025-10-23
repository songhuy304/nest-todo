import { IsArray } from 'class-validator';
import { IPageMeta } from '../interfaces';

export class PageMetaDto implements IPageMeta {
  readonly pageNumber: number;
  readonly maxPerPage: number;
  readonly totalItem: number;
  readonly totalPage: number;

  constructor({ pageNumber, maxPerPage, totalItem }: IPageMeta) {
    this.pageNumber = pageNumber;
    this.maxPerPage = maxPerPage;
    this.totalItem = totalItem;
    this.totalPage = Math.ceil(totalItem / maxPerPage);
  }
}

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly pageNumber: number;
  readonly maxPerPage: number;
  readonly totalItem: number;
  readonly totalPage: number;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.pageNumber = meta.pageNumber;
    this.maxPerPage = meta.maxPerPage;
    this.totalItem = meta.totalItem;
    this.totalPage = meta.totalPage;
  }
}
