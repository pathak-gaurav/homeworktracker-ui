import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  mobile: string = '';
  department: string = '';
  responseFlag: boolean = false;

  ngOnInit(): void {
  }

  signup() {
    let user: User = new User();
    user.username = this.username;
    user.token = this.password;
    user.email = this.email;
    user.mobile = this.mobile;
    user.department = this.department;
    user.address = this.address;
    user.firstName = this.firstName;
    user.lastName = this.email;
    this.loginService.signupService(user).subscribe(() => {
    }, (err: any) => {
    });
    this.responseFlag = true;
    this.username = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.email= '';
    this.address = '';
    this.mobile = '';
    this.department = '';
  }
}
