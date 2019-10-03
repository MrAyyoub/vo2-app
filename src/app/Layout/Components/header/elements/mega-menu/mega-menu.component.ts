import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../Services/user.service";

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu.component.html',
})
export class MegamenuComponent implements OnInit {

    dashboards = this.userService.dashboards;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
    }

    navigate(){
        if (this.userService.navEnabled) {
            this.userService.activePanel = 'list';
        }
    }
}
