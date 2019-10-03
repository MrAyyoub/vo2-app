import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: false,
  };
  errorMessage: string;

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }
  login() {
    if (!this.checkDisabled()) return;
    this.userService.login().subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('jwt', data.user.jwt);
        this.userService.jwtToken = data.user.jwt;
        this.userService.logged = true;
        this.userService.user.password = '';
        this.userService.init();
      }  else {
        this.errorMessage = data.reason || 'An error occurred.'
      }

    })
  }

  checkDisabled() {
    let validated = true;
    if (!UserService.validateEmail(this.userService.user.email)) {
      this.errorMessage = 'Not a valid email address.';
      validated = false;
    }
    return validated;
  }

}
