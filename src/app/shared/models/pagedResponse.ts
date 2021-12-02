import { Hero } from './hero';

export interface PagedResponse {
  data: Hero[];
  maxPages: number;
}
