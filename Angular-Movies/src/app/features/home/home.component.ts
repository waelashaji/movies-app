import { ChangeDetectorRef, Component, EventEmitter, OnInit } from "@angular/core";
import { MoviesService } from "../../core/services/movies.service";
import { SeoService } from "../../core/services/seo.service";
import { debounceTime, take } from "rxjs/operators";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { MovieCardComponent } from "../../shared/components/poster-card-view/poster-card.component";
import { RouterLink } from "@angular/router";
import { SlicePipe } from "@angular/common";
import { SwiperOptions } from "swiper/types";
import { SwiperDirective } from "../../shared/directives/swiper.directive";
import { MatIcon } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MovieModel } from "../../core/interfaces/movie.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    FormsModule,
    MovieCardComponent,
    RouterLink,
    SwiperDirective,
    SlicePipe,
    MatTabGroup,
    MatTab,
    MatIcon,
  ],
  standalone: true,
})
export class HomeComponent implements OnInit {
  config: SwiperOptions = {
    watchSlidesProgress: true,
    breakpoints: {
      992: {
        slidesPerView: 6.3,
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      768: {
        slidesPerView: 4.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      576: {
        slidesPerView: 3.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      320: {
        slidesPerView: 2.3,
        spaceBetween: 10,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
      },
    },
  };

  moviesList: Array<MovieModel> = [];

  inputChange = new EventEmitter();
  searchTerm = "";
  isError = false;
  isLoading = false;

  constructor(private moviesService: MoviesService, private seo: SeoService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.seo.generateTags({
      title: "Angular Movies and Series",
      description: "Movie and Series Home Page",
    });
    this.inputChange.pipe(debounceTime(500)).subscribe(() => {
      this.getMovies(this.searchTerm, "movie", 1);
    });
  }

  getMovies(title: string, type: string, page: number): void {
    this.moviesService
      .getMovies(title, type, page)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.moviesList = res.Search;
          this.isError = false;
          this.isLoading= false;
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.cd.detectChanges();

        },
        complete: () => {
          this.cd.detectChanges();
        },
      });
  }

  onInputChange() {
    this.isLoading = true;
    this.inputChange.next(0);
  }
}
