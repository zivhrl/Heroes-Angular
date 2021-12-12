import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { TrainersHeroesComponent } from './trainers-heroes/trainers-heroes.component';

const routes: Routes = [
  {
    path: 'all-heroes',
    component: AllHeroesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-heroes',
    component: TrainersHeroesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
