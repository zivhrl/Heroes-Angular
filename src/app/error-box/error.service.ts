import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  isError = new BehaviorSubject<boolean>(false);
  message = new BehaviorSubject<string>('');
  constructor() {}

  setError(statusCode: number) {
    console.log(statusCode);
    switch (statusCode) {
      case 400:
        this.isError.next(true);
        this.message.next('Invalid credentials');
        break;
      case 401:
        this.isError.next(true);
        this.message.next('UserName or Password are invalid');
        break;
      case 405:
        this.isError.next(true);
        this.message.next('Action not allowed by server');
        break;
      case 409:
        this.isError.next(true);
        this.message.next('A user alredy exist with this UserName or Email');
        break;
      default:
        this.isError.next(true);
        this.message.next('Internal Server Error');
        break;
    }
  }
}
