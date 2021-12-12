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
  successSub: Subscription;
  isSuccess: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    let signupCredentials: SignupCredentials = {
      userName: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };
    this.authService.signUp(signupCredentials).subscribe();
    if (this.successSub == null) {
      this.successSub = this.authService.isSuccess.subscribe((res) => {
        this.isSuccess = res;
        if (this.isSuccess === true) this.signUpForm.resetForm();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.successSub) this.successSub.unsubscribe();
  }
}
