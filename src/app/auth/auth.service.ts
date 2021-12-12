import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HeroesService } from '../heroes/heroes.service';
import { SigninCredentials } from '../shared/models/signin-credentials';
import { SignupCredentials } from '../shared/models/signup-credentials';
import { User } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  isSuccess = new BehaviorSubject<boolean>(false);
  private apiAdress = environment.apiAdress + 'trainers/';

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private http: HttpClient
  ) {}

  signIn(signinCredentials: SigninCredentials) {
    return this.http.post(this.apiAdress + 'signin', signinCredentials).pipe(
      tap(
        (response: { success: boolean; token: string }) => {
          this.handleAutentication(response);
        },
        (error) => {
          this.isSuccess.next(false);
        }
      )
    );
  }

  logout() {
    this.user.next(null);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/signin']);
    this.heroesService.resetData();
  }

  signUp(signupCredentials: SignupCredentials) {
    return this.http.post(this.apiAdress + 'signup', signupCredentials).pipe(
      tap(
        (response: { success: boolean; token: string }) => {
          this.handleAutentication(response);
        },
        (error) => {
          this.isSuccess.next(false);
        }
      )
    );
  }

  handleAutentication(response: { success: boolean; token: string }) {
    this.isSuccess.next(true);
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(response.token);
    let user: User = {
      userName: decodedToken['unique_name'],
      userId: decodedToken['userId'],
      token: response.token,
    };
    this.user.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));

    this.router.navigate(['/my-heroes']);
  }
}
