import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './error-box/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Heroes-Angular';
  isError = false;
  message: string;
  errorSub: Subscription;
  messageSub: Subscription;
  constructor(
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.messageSub = this.errorService.message.subscribe((errMessage) => {
      this.message = errMessage;
    });
    this.errorSub = this.errorService.isError.subscribe(
      (err) => (this.isError = err)
    );
  }

  openErrorBox() {
    this.isError = true;
  }

  closeErrorBox() {
    this.isError = false;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe;
    this.messageSub.unsubscribe;
  }
}
