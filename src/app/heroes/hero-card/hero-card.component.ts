import { Component, Input, OnInit } from '@angular/core';

import { Hero } from 'src/app/shared/models/hero';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Hero;
  @Input() allowTraining: boolean;
  startedTraining: Date;
  canTrain: boolean;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.canTrain = true;
    if (this.hero.trainingCounter === 5) {
      this.canTrain = false;
    }
    this.startedTraining = new Date(this.hero.startedTraining);
  }

  trainHero() {
    console.log(this.hero.id);
    let hero: Hero = this.heroesService.trainHero(this.hero.id);
    console.log(hero);
    // if (hero !== null) this.hero = hero;
  }
}
