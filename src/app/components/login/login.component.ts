import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  validLogin = false;
  loginError: string='';

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.validLogin = this.loginService.authenticate(this.username, this.password);
    if(this.validLogin){
      this.router.navigateByUrl('/home');
    }
  }
}
