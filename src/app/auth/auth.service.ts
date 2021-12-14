import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ErrorService } from '../error-box/error.service';
import { HeroesService } from '../heroes/heroes.service';
import { SigninCredentials } from '../shared/models/signin-credentials';
import { SignupCredentials } from '../shared/models/signup-credentials';
import { User } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private apiAdress = environment.apiAdress + 'trainers/';

  constructor(
    private heroesService: HeroesService,
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  signIn(signinCredentials: SigninCredentials) {
    return this.http.post(this.apiAdress + 'signin', signinCredentials).pipe(
      tap((response: { success: boolean; token: string }) => {
        this.handleAutentication(response);
      })
    );
  }

  logout() {
    this.user.next(null);
    sessionStorage.removeItem('userData');
    this.heroesService.resetData();
  }

  signUp(signupCredentials: SignupCredentials) {
    return this.http.post(this.apiAdress + 'signup', signupCredentials).pipe(
      tap((response: { success: boolean; token: string }) => {
        this.handleAutentication(response);
      })
    );
  }

  autoLogin() {
    const user: User = JSON.parse(sessionStorage.getItem('userData'));
    if (user) {
      this.user.next(user);
    }
  }

  handleAutentication(response: { success: boolean; token: string }) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(response.token);
    let user: User = {
      userName: decodedToken['unique_name'],
      userId: decodedToken['userId'],
      token: response.token,
    };
    this.user.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }

  handelError() {
    this.user.next(null);
  }
}
