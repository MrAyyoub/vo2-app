import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {
  enabled = true;

  constructor(public userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  refreshBalance() {
    this.enabled = false;
    this.userService.checkIfSubscriber(1,() => {
      this.enabled = true;
      this.toastr.success("Subscription status refreshed.");
    })
  }

}
