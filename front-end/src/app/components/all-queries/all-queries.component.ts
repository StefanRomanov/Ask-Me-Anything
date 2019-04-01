import { Component, OnInit } from '@angular/core';
import {QueryService} from '../../services/query.service';

@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit {

  constructor(private queryService: QueryService) { }

  getAll() {
    this.queryService.getAllQueries();
  }

  ngOnInit() {
  }

}
