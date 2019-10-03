import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

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

  constructor(public userService: UserService, public toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
  }

  resetPassword() {
    if (!UserService.validateEmail(this.userService.user.email)) { this.errorMessage = 'This does not seem like a valid email address.'; return; }
    this.userService.resetPassword().subscribe((data: any) => {
      if (data.success) {
        this.toastr.success(data.message);
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(data.message);
      }
    })
  }

}
