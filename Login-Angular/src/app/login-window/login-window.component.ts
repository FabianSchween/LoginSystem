import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-window',
  imports: [NgIf, FormsModule],
  standalone: true,
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.scss',
})
export class LoginWindowComponent {
  selectionFlag: boolean = true; // true == login , false == register
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loginResult: any;

  constructor(private loginService: LoginService) {}

  selectOption() {
    this.selectionFlag = !this.selectionFlag;

    if (this.selectionFlag == true) {
      document.getElementById('loginselection')!.textContent = 'Login';
      document.getElementById('cardtitle')!.textContent = 'Login';
    } else {
      document.getElementById('loginselection')!.textContent = 'Register';
      document.getElementById('cardtitle')!.textContent = 'Register';
    }
  }

  submitAction() {
    if (this.selectionFlag == false) {
      if (this.password != this.confirmPassword) {
        document.getElementById('systemnot')!.textContent =
          "passwords don't match!";
        setTimeout(() => {
          document.getElementById('systemnot')!.textContent = '';
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
        }, 2000);
      } else {
        this.loginService
          .createUser({
            username: this.username,
            password: this.password,
          })
          .subscribe({
            next: (res) => console.log('success!', res),
            error: (err) => console.error('error', err),
          });
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.selectOption();
      }
    } else {
      this.loginService
        .getUsers({
          username: this.username,
          password: this.password,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.loginResult = res;
            console.log(this.loginResult.message);
            if (this.loginResult.status == true) {
              this.username = '';
              this.password = '';
              document.getElementById('submit')!.hidden = true;
              document.getElementById('loginselection')!.hidden = true;
              document.getElementById('user_input')!.hidden = true;
              document.getElementById('pw_input')!.hidden = true;
              document.getElementById('cardtitle')!.textContent =
                this.loginResult.message;
            } else {
              document.getElementById('systemnot')!.textContent =
                this.loginResult.message;
              setTimeout(() => {
                document.getElementById('systemnot')!.textContent = '';
                this.username = '';
                this.password = '';
              }, 2000);
            }
          },
          error: (err) => console.error('error', err),
        });
    }
  }
}
