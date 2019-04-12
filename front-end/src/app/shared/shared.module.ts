import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {SearchFormComponent} from './search-form/search-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FooterComponent,
        NavigationComponent,
        SearchFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        FooterComponent,
        NavigationComponent,
        SearchFormComponent
    ]
})
export class SharedModule {
}
