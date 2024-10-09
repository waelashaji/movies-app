import Review from "#database/dataSources/Review/index";

class ReviewService {

  static async create({movie_id, userName, review}) {
    return await Review.insertOne({movie: movie_id, userName, review});
  }

  static async getMany({ movie_id, limit, skip }) {
    return await Review.getManyByMovieId( movie_id, limit, skip );
  }
 
}

export default ReviewService;
