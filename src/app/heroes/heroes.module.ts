import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroesRoutingModule } from './hero-routing.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { TrainersHeroesComponent } from './trainers-heroes/trainers-heroes.component';

@NgModule({
  declarations: [
    HeroCardComponent,
    HeroesListComponent,
    AllHeroesComponent,
    TrainersHeroesComponent,
  ],
  imports: [CommonModule, HeroesRoutingModule],
})
export class HeroesModule {}
