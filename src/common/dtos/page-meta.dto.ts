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
