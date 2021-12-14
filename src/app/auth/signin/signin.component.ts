import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/error-box/error.service';

import { SigninCredentials } from 'src/app/shared/models/signin-credentials';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    let signinCredantials: SigninCredentials = {
      userName: signInForm.value.name,
      password: signInForm.value.password,
    };
    this.authService.signIn(signinCredantials).subscribe(
      () => {
        this.router.navigate(['heroes/my-heroes']);
      },
      (err) => {
        this.authService.handelError();
        this.errorService.setError(err.error.StatusCode);
      }
    );
  }
}
