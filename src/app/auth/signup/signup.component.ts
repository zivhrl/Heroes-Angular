import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SignupCredentials } from 'src/app/shared/models/signup-credentials';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('signUpForm', { static: false }) signUpForm: NgForm;
  signupResult: string = '';
  resultSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.signUpResult.subscribe((res) => {
      this.signupResult = res;
      if (this.signupResult === 'success') this.signUpForm.resetForm();
    });
  }

  onSubmit() {
    let signupCredentials: SignupCredentials = {
      userName: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };
    this.authService.signUp(signupCredentials);
    console.log(this.signupResult);
  }

  ngOnDestroy(): void {
    if (this.resultSub) this.resultSub.unsubscribe();
  }
}
