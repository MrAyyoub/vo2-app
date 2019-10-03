import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-analytics',
  templateUrl: './dashboard-list.component.html',
})
export class DashboardListComponent {

  heading = 'Dashboards';
  subheading = 'This is where your dashboards live';
  icon = 'pe-7s-graph2 icon-gradient bg-tempting-azure';


  constructor(public userService: UserService, private modalService: NgbModal, private router :Router) {}

  ngOnInit() {
    if (!this.userService.logged) this.router.navigate(['/login']);
  }

  activateDashboard(content, dashboard) {
    if(!this.premiumWarn(content, dashboard)) return;
    let db = this.userService.activeDashboards.find(x => x.id === dashboard.id);
    if (!db) {
     this.userService.navEnabled = false;
     this.userService.activeDashboards.push(dashboard);
     this.reenableEventually();
    }
    this.userService.activePanel = "dashboard";
    this.userService.activeDashboardId = dashboard.id;

  }
  premiumWarn(content, dashboard) {
    if (dashboard.paid && !this.userService.user.subscriber) {
      this.modalService.open(content);
      return false;
    }
    return true;
  }

  reenableEventually() {
    setTimeout(() => {
      this.userService.navEnabled = true;
    }, 5 * 1000)
  }

}
declare let iFrameResize;
