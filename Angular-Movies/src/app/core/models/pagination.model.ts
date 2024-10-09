import { MovieModel } from "app/core/interfaces/movie.interface";

export class PaginationModel {

  public dates?: Object;
  public page: number;
  public results: Array<MovieModel>;
  public total_pages: number;
  public total_results: number;

}