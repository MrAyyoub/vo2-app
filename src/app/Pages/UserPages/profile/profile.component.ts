import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  errorMessages: any[] = [];

  constructor(public userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  updateInfo() {
    this.userService.updateUserInfo().subscribe((data: any) => {
      console.log(data, "???")
      data.success ?
        this.toastr.success("User info updated successfully.") : this.toastr.error("An error occurred. Please try again later or contact us.")
    })
  }
  checkDisabled() {
    this.errorMessages = [];
    let validated = true;
    if (!this.userService.user.password) {
      this.errorMessages.push('Current password is required.');
      validated = false;
      return validated;
    }
    if (this.userService.user.password.length < 8) {
      this.errorMessages.push('Password too short. Minimum 8 characters are required.');
      validated = false;
    }
    if (this.userService.user.new_password && this.userService.user.new_password !== this.userService.user.confirmPassword) {
      this.errorMessages.push('Passwords do not match. Please double check.');
      validated = false;
    }
    return validated;
  }

  changePassword() {
    if (!this.checkDisabled()) return;
    this.userService.changePassword().subscribe((data: any) => {
      if (data.success){
        this.toastr.success(data.message);
        this.userService.user.password = '';
        this.userService.user.new_password = '';
        this.userService.user.confirmPassword = '';
      } else this.toastr.error(data.message);
    })
  }
}
