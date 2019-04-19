import {NgModule, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {SearchFormComponent} from './search-form/search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import {QueryListComponent} from './query-list/query-list.component';
import {QueryCardComponent} from './query-card/query-card.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {CeilPipe} from '../../core/pipes/ceil.pipe';

@NgModule({
    declarations: [
        FooterComponent,
        NavigationComponent,
        SearchFormComponent,
        PaginatorComponent,
        QueryListComponent,
        QueryCardComponent,
        CeilPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        FooterComponent,
        NavigationComponent,
        SearchFormComponent,
        PaginatorComponent,
        QueryListComponent,
        QueryCardComponent,
        CeilPipe
    ]
})
export class SharedModule {
}
