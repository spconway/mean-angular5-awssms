import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

	constructor(
	  private userService: UserService,
    private router: Router
  ) { }

	ngOnInit() {
	  // reset login status
	  this.userService.logout();
	  // set status subscription
    this.userService.getStatus()
      .subscribe((res) => console.log("Get status: ", res));

	  // init forms
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('', [
        Validators.required
      ])
    });
	}

	login() {
    if (this.loginForm.valid) {
      this.loading = true;
      let f = this.loginForm.value;
      this.userService.login(f.username, f.email, f.password)
        .subscribe(
          data => {
            console.log('User authentication returned the following information\n', data);
            this.router.navigate(['']);
          },
          error => {
            console.log('Error authenticating user.');
            this.loading = false;
          }
        );
    } else {
      console.log('Invalid login form.')
    }
  }

}
