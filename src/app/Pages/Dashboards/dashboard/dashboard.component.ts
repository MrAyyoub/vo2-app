import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../Services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  @Input()id;
  dashboard;
  heading = '';
  subheading = '';
  icon = 'pe-7s-graph2 icon-gradient bg-tempting-azure';
  url;
  constructor(private userService: UserService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private location: Location) {

    //this.userService.dashboardActivator.emit(this.dashboard)


  }

  dashLoaded() {
    console.log("Loaded..");
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'] || this.id;
    if (id) {
      this.dashboard = this.userService.dashboardsFlat.find(x => x.id == id);
      this.heading = this.dashboard.name;
      this.subheading = this.dashboard.description;
      this.dashboard.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboard.iframeUrl);
      // if (this.id) this.location.go('/dashboard/' + id);
    }

    if (!this.userService.logged) this.router.navigate(['/login']);
    else if (!this.dashboard || (this.dashboard.paid && !this.userService.user.subscriber)) {
      this.router.navigate(['/'])
    }




  }
}
declare let location, iFrameResize;