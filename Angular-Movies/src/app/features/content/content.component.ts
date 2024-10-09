import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../core/models/pagination.model';
import {Router} from "@angular/router";
import {MovieCardComponent} from "../../shared/components/poster-card-view/poster-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-movies',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    MovieCardComponent,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe
  ],
  standalone: true
})
export class ContentComponent implements OnInit {

  contentType = '';
  nowPlaying: Array<PaginationModel> = [];

  totalResults: any;

  constructor(
    private router: Router,
  ) {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit() {
  }

}
