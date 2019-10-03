import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {DashboardListComponent} from './Pages/Dashboards/list/dashboard-list.component';

// Pages

import {ForgotPasswordComponent} from './Pages/UserPages/forgot-password/forgot-password.component';
import {LoginComponent} from './Pages/UserPages/login/login.component';
import {RegisterComponent} from './Pages/UserPages/register/register.component';
import {DashboardComponent} from "./Pages/Dashboards/dashboard/dashboard.component";
import {ProfileComponent} from "./Pages/UserPages/profile/profile.component";
import {SubscriptionComponent} from "./Pages/UserPages/subscription/subscription.component";
import {ResetPasswordComponent} from "./Pages/UserPages/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads

      {path: '', component: DashboardListComponent, data: {extraParameter: ''}},
      {path: 'dashboard/:id', component: DashboardComponent, data: {extraParameter: ''}},
      {path: 'profile', component: ProfileComponent, data: {extraParameter: ''}},
      {path: 'subscription', component: SubscriptionComponent, data: {extraParameter: ''}},

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages

      {path: 'login', component: LoginComponent, data: {extraParameter: ''}},

      {path: 'register', component: RegisterComponent, data: {extraParameter: ''}},

      {path: 'forgot-password', component: ForgotPasswordComponent, data: {extraParameter: ''}},
      {path: 'reset-password', component: ResetPasswordComponent, data: {extraParameter: ''}},


    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
