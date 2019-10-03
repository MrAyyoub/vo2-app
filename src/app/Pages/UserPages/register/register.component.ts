import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: false,
  };

  tcFlag = false;
  errorMessages = [];

  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }
  checkDisabled() {
    this.errorMessages = [];
    let validated = true;
    if (!UserService.validateEmail(this.userService.user.email)) {
      this.errorMessages.push('Not a valid email address.');
      validated = false;
    }
    if (!this.tcFlag) {
      this.errorMessages.push('Please accept terms & conditions.');
      validated = false;
    }
    if (this.userService.user.password.length < 8) {
      this.errorMessages.push('Password too short. Minimum 8 characters are required.');
      validated = false;
    }
    if (this.userService.user.password !== this.userService.user.confirmPassword) {
      this.errorMessages.push('Passwords do not match. Please double check.');
      validated = false;
    }
    return validated;
  }
  register() {
    if (!this.checkDisabled()) return;
    this.userService.registerUser().subscribe((data: any) => {
      if (data.success) {
        this.userService.user = {};
        this.toastr.success("Registered successfully! Please login now.");
        this.router.navigate(['/login'])
      } else {
        this.errorMessages.push(data.message);
      }
    })
  }
}
