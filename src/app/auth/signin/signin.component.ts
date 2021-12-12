import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SigninCredentials } from 'src/app/shared/models/signin-credentials';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  successSub: Subscription;
  isSuccess: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    let signinCredantials: SigninCredentials = {
      userName: signInForm.value.name,
      password: signInForm.value.password,
    };
    this.authService.signIn(signinCredantials).subscribe();
    if (this.successSub == null) {
      this.successSub = this.authService.isSuccess.subscribe((res) => {
        this.isSuccess = res;
      });
    }
  }
  ngOnDestroy(): void {
    if (this.successSub) this.successSub.unsubscribe();
  }
}
