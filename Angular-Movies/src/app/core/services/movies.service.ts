import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + "/public/api/v1";
  }

  getMovies(title: string, type: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies`, { params: { title, type, page}})
  }
  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies/${id}`)
  }

}
