import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import dashboards from '../dashboards.json';
import moment from 'moment';


@Injectable()
export class UserService {
  endpointUrl = environment.apiEndpoint;
  user: any = {};
  logged: boolean;
  jwtToken: string;
  dashboards = dashboards;
  dashboardsFlat = [];

  activeDashboards = [];
  activeDashboardId: string;
  activePanel: 'list' | 'dashboard' = 'list';

  viewRequired = 30000;
  navEnabled: boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

    this.jwtToken = localStorage.getItem('jwt');
    console.log(this.jwtToken);
    if (this.jwtToken) {
      this.logged = true;
      this.init();
    }

    this.dashboards.forEach(x => {
      this.dashboardsFlat.push(...x.children);
    })
  }
  login() {
    let endpoint = `${this.endpointUrl}/api/user/login`;
    return this.http.post(endpoint, this.user);
  }


  // postAuthCode(code: string, is_content_creator = false) {
  //   this.http.post(`${this.endpointUrl}/api/login`, {code, is_content_creator}).subscribe((data: any) => {
  //     this.user = data.user;
  //     this.jwtToken = data.token;
  //     localStorage.setItem('jwt', this.jwtToken);
  //     this.logged = true;
  //     //chrome.runtime.sendMessage(this.extensionId, {action: 'auth', token: this.jwtToken});
  //     this.init();
  //     if (!data.registered) {
  //       this.router.navigate(['/getting-started']);
  //     } else {
  //       this.router.navigate(['/wallet']);
  //     }
  //   });
  // }

  getUserProfile() {
    return this.http.get(`${this.endpointUrl}/api/user/info`, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  registerUser() {

    return this.http.post(`${this.endpointUrl}/api/user/register`, this.user);
  }
  updateUserInfo() {
    return this.http.put(`${this.endpointUrl}/api/user/info`, this.user, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  logout() {
    this.user = {};
    this.logged = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getSubscriptionStatus(reload = 0) {
    return this.http.get(`${this.endpointUrl}/api/user/balance?reload=${reload}`, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  resetPassword() {
    return this.http.post(`${this.endpointUrl}/api/user/reset-password-request`, {email: this.user.email});
  }

  resetPasswordConfirm(password_reset_token) {
    return this.http.post(`${this.endpointUrl}/api/user/reset-password`, {password_reset_token, password: this.user.password});
  }

  changePassword() {
    return this.http.put(`${this.endpointUrl}/api/user/change-password`, {current_password: this.user.password, new_password: this.user.new_password}, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  checkIfSubscriber(reload?, cb?) {
    this.getSubscriptionStatus(reload).subscribe((data: any) => {
      if (data.success) {

        this.user.subscription_expiration = data.subscription_expiration;
        this.validateSubscription();
      } else {
        console.error("Error fetching VIEW balance.")
      }
      if (cb) cb();
    });
  }
  init() {
    this.activePanel = 'list';
    //this.checkIfSubscriber();
    this.getUserProfile().subscribe((data) => {
      Object.assign(this.user, data);
      this.validateSubscription();
      this.router.navigate(['/']);
    });
  }

  validateSubscription() {
    if (this.user.subscription_expiration !== 'inactive' && moment(this.user.subscription_expiration) >= moment()) {
      this.user.subscriber = true;
      this.user.subscription_expiration_days = moment(this.user.subscription_expiration).diff(moment(), 'days');
    }
  }
  static validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
