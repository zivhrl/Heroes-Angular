import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SignupCredentials } from 'src/app/shared/models/signup-credentials';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm', { static: false }) signUpForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let signupCredentials: SignupCredentials = {
      userName: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };
    this.authService.signUp(signupCredentials).subscribe(
      () => {
        this.router.navigate(['heroes/all-heroes']);
      },
      (err) => {
        this.authService.handelError(err.error.StatusCode);
      }
    );
  }
}
