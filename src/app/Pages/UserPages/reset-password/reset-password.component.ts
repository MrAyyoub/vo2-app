import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage: string;
  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: false,
  };
  constructor(public userService: UserService, public route: ActivatedRoute, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (!this.route.snapshot.queryParams['t']) {
      this.errorMessage = 'This is invalid or expired link.'
    }
  }

  changePassword() {
    if (!this.userService.user.password || this.userService.user.password.length < 8) { this.errorMessage = 'Password must be at least 8 characters'; return }
    this.errorMessage = '';
    this.userService.resetPasswordConfirm(this.route.snapshot.queryParams['t']).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success(data.message);
        this.router.navigate(['/login'])
      } else this.toastr.error(data.message);
    })
  }

}
