import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + "/internal/api/v1";
  }

  getReviews(movie_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/review/${movie_id}`);
  }

  submitreview(body: Review): Observable<any> {
    return this.http.post(`${this.baseUrl}/review`, body)
  }

}
