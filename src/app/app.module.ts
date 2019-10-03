import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ngx-toastr';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';



// ANGULAR MATERIAL COMPONENTS

import {MatCheckboxModule, MatRippleModule} from '@angular/material';

// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {ThemeOptions} from './theme-options';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {MegamenuComponent} from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import {MegapopoverComponent} from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';


// SIDEBAR

//import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';


// Pages

import {ForgotPasswordComponent} from './Pages/UserPages/forgot-password/forgot-password.component';
import {LoginComponent} from './Pages/UserPages/login/login.component';
import {RegisterComponent} from './Pages/UserPages/register/register.component';

// Angular Material

import {DashboardListComponent} from "./Pages/Dashboards/list/dashboard-list.component";
import {DashboardComponent} from './Pages/Dashboards/dashboard/dashboard.component';
import {UserService} from "./Services/user.service";
import { ProfileComponent } from './Pages/UserPages/profile/profile.component';
import { SubscriptionComponent } from './Pages/UserPages/subscription/subscription.component';
import { ResetPasswordComponent } from './Pages/UserPages/reset-password/reset-password.component';
import { IFrameResizerDirective } from './Pages/Dashboards/dashboard/iframe-auto-height-directive.directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [

        // LAYOUT

        AppComponent,
        BaseLayoutComponent,
        // AppsLayoutComponent,
        PagesLayoutComponent,
        PageTitleComponent,

        // HEADER

        HeaderComponent,
        MegamenuComponent,
        MegapopoverComponent,
        UserBoxComponent,

        // FOOTER

        FooterComponent,
        // Dashboards

        DashboardListComponent,

        // User Pages

        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        ProfileComponent,
        SubscriptionComponent,
        ResetPasswordComponent,
        IFrameResizerDirective,
        //WysiwygEditorComponent


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgReduxModule,
        CommonModule,
        LoadingBarRouterModule,

        // Angular Bootstrap Components

        PerfectScrollbarModule,
        NgbModule,
        AngularFontAwesomeModule,
        //LaddaModule,
        FormsModule,
        ReactiveFormsModule,
        NgBootstrapFormValidationModule.forRoot(),
        ToastrModule.forRoot(),
        SlickCarouselModule,
        JwBootstrapSwitchNg2Module,
        HttpClientModule,

        // Charts


        // Angular Material Components

//        MatCheckboxModule,

    ],
    providers: [
        {
            provide:
            PERFECT_SCROLLBAR_CONFIG,
            useValue:
            DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        ConfigActions,
        ThemeOptions,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private ngRedux: NgRedux<ArchitectUIState>,
                private devTool: DevToolsExtension) {

        this.ngRedux.configureStore(
            rootReducer,
            {} as ArchitectUIState,
            [],
            [devTool.isEnabled() ? devTool.enhancer() : f => f]
        );

    }
}
