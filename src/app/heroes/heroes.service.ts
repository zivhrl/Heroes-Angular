import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hero } from '../shared/models/hero';
import { PagedResponse } from '../shared/models/pagedResponse';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  heroes: Hero[] = [];
  heroesUpdated = new Subject<Hero[]>();
  maxPages = new BehaviorSubject<number>(1);
  private apiAdress = environment.apiAdress + 'heroes';

  constructor(private http: HttpClient) {}

  getHeroes(pageSize: number, pageNumber: number, filterForTrainer: boolean) {
    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)
      .set('filterForTrainer', filterForTrainer);
    return this.http.get<PagedResponse>(this.apiAdress, { params }).pipe(
      tap((res: PagedResponse) => {
        console.log('heroesService', res);
        this.heroes = res.data;
        this.maxPages.next(res.maxPages);
        this.heroesUpdated.next(this.heroes);
      })
    );
  }

  trainHero(id: string) {
    return this.http.patch<Hero>(this.apiAdress + '/' + id, '').pipe(
      tap((res: Hero) => {
        let index = this.heroes.findIndex((hero) => hero.id === res.id);
        this.heroes[index] = res;
      })
    );
  }

  resetData() {
    this.heroes = [];
  }
}
