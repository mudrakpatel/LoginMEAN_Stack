import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  login(){
    if(!this.loginForm.valid){
      console.log("Either wrong username or password.");
      return;
    }
    //console.log(JSON.stringify(this.loginForm.value));
    this._userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data => {
               console.log(data);
               this._router.navigate(["/user"]);
             },
      error => console.log(error)
    )
  }

  moveToRegister(){
    this._router.navigate(["/register"]);
  }

}
