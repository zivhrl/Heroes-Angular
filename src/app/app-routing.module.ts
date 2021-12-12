import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { SigninComponent } from './auth/signin/signin.component';
//import { SignupComponent } from './auth/signup/signup.component';
//import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllHeroesComponent } from './heroes/all-heroes/all-heroes.component';
//import { TrainersHeroesComponent } from './heroes/trainers-heroes/trainers-heroes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes/all-heroes' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
