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
import {reducers} from './+store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './+store/auth/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        CoreModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            AuthEffects
        ]),
        StoreDevtoolsModule.instrument({}),
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
