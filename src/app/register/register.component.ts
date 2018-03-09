import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

	ngOnInit() {
    // init forms
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordConf: new FormControl('', [
        Validators.required
      ])
    });
	}

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      let f = this.registerForm.value;
      this.userService.register(f.username, f.email, f.password, f.passwordConf)
        .subscribe(
          data => {
            console.log('User registration returned the following information\n', data);
            this.router.navigate(['']);
          },
          error => {
            console.log('Error registering user.', error);
            this.loading = false;
          }
        );
    } else {
      console.log('Invalid registration form.')
    }
  }
}
