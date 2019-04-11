import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        FooterComponent,
        NavigationComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        FooterComponent,
        NavigationComponent
    ]
})
export class SharedModule {
}
