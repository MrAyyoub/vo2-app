import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import {UserService} from "../../../../../Services/user.service";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions, public userService: UserService) {
  }

  ngOnInit() {
  }

}
