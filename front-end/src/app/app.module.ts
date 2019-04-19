import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './components/shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        CoreModule,
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
