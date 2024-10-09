import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MoviesService} from '../../../../core/services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {IContent} from "../../../../core/interfaces/content.interface";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {MovieCardComponent} from "../../../../shared/components/poster-card-view/poster-card.component";
import {ImgMissingDirective} from "../../../../shared/directives/img-missing.directive";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { ReviewsService } from '../../../../core/services/reviews.service';
import { Review } from '../../../../core/interfaces/review.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieModel } from '../../../../core/interfaces/movie.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [
    DatePipe,
    CdkDrag,
    CdkDragHandle,
    MovieCardComponent,
    ImgMissingDirective,
    MatProgressBar,
    MatIcon,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  standalone: true
})
export class DetailComponent implements OnInit {

  movie_id: string;
  content!: Partial<MovieModel>;
  reviews!: Partial<Review | any>;
  video: IContent;
  isLoading = true;
  isReviewsLoading = true;

  @ViewChild('matTrailerDialog') matTrailerDialog: TemplateRef<any>;

  reviewForm: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.movie_id = params['url'];
        this.getMovie(this.movie_id);
        this.getReviews(this.movie_id);
      }
    );
    this.initFormGroup();
  }

  getMovie(id: string) {
    this.isLoading = true;

    this.moviesService.getMovie(id).pipe(take(1)).subscribe(
      movie => {
        this.content = movie;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }

  getReviews(id: string) {
    this.reviewsService.getReviews(id).pipe(take(1)).subscribe(
      reviews => {
        this.reviews = reviews;
        this.isReviewsLoading = false;
        this.cdr.detectChanges();
      }
    );
  }

  initFormGroup() {
    this.reviewForm = new FormGroup({
      movie_id: new FormControl(this.movie_id, Validators.required),
      review: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.required),
    });
  }

  onFormSubmit() {
    if (this.reviewForm.invalid) {
      return this.reviewForm.markAllAsTouched();
    };
    this.reviewsService.submitreview(this.reviewForm.value).subscribe({
      next: () => {
        this.reviews.push(this.reviewForm.value)
      },
      complete: () => { 
        this.reviewForm.reset();
      },
      error: () => {},
    });
  }

}
