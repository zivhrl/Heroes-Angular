import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HeroesService } from '../heroes/heroes.service';
import { SigninCredentials } from '../shared/models/signin-credentials';
import { SignupCredentials } from '../shared/models/signup-credentials';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  signUpResult = new BehaviorSubject<string>(null);
  private apiAdress = environment.apiAdress + 'trainers/';

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private http: HttpClient
  ) {}

  signIn(signinCredentials: SigninCredentials) {
    this.http
      .post(this.apiAdress + 'signin', signinCredentials)
      .subscribe((response: { success: boolean; token: string }) => {
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(response.token);
        let user: User = {
          userName: decodedToken['unique_name'],
          userId: decodedToken['userId'],
          token: response.token,
        };
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/my-heroes']);
      });
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/signin']);
    this.heroesService.resetData();
  }

  signUp(signupCredentials: SignupCredentials) {
    this.http
      .post(this.apiAdress + 'signup', signupCredentials)
      .subscribe((response: { success: boolean; token: string }) => {
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(response.token);
        let user: User = {
          userName: decodedToken['unique_name'],
          userId: decodedToken['userId'],
          token: response.token,
        };
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/my-heroes']);
      });
  }
}
