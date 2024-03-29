import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/error-box/error.service';

import { Hero } from 'src/app/shared/models/hero';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit, OnDestroy {
  @Input() pageSize: number;
  @Input() isFiltered: boolean;
  heroes: Hero[];
  heroesSub: Subscription;
  currentPage: number = 1;
  maxPages: number;
  maxPagesSub: Subscription;
  constructor(
    private heroesService: HeroesService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getHeroes(this.pageSize, this.currentPage, this.isFiltered);
    this.heroesSub = this.heroesService.heroesUpdated.subscribe((res) => {
      this.heroes = res;
    });
    this.maxPagesSub = this.heroesService.maxPages.subscribe((res) => {
      this.maxPages = res;
    });
    console.log(this.maxPages, this.currentPage);
  }

  goToNext() {
    if (this.currentPage === this.maxPages) return;
    this.getHeroes(this.pageSize, this.currentPage + 1, this.isFiltered);
    this.currentPage++;
  }

  goToPrevious() {
    if (this.currentPage === 1) return;
    this.getHeroes(this.pageSize, this.currentPage - 1, this.isFiltered);
    this.currentPage--;
  }

  getHeroes(pageSize: number, page: number, isFiltered: boolean) {
    this.heroesService.getHeroes(pageSize, page, isFiltered).subscribe(
      () => {},
      (err) => {
        this.errorService.setError(err.error.StatusCode);
      }
    );
  }

  ngOnDestroy(): void {
    this.heroesSub.unsubscribe();
    this.maxPagesSub.unsubscribe();
  }
}
