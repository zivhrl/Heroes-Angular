import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SigninCredentials } from 'src/app/shared/models/signin-credentials';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    let signinCredantials: SigninCredentials = {
      userName: signInForm.value.name,
      password: signInForm.value.password,
    };
    this.authService.signIn(signinCredantials);
  }
}
