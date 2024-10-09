import MongooseLoader from "#database/connection";

class Review {
  static get Review() {
    return MongooseLoader.models.Review;
  }

  static insertOne = async ({ movie, userName, review }) => {
    const result = await this.Review({
      movie,
      userName,
      review,
    }).save();
    return result;
  };

  static getManyByMovieId = async (movie_id, limit = 10, page = 1) => {
    const result = await this.Review.aggregate([
      { $match: { movie: movie_id} },
      { $skip: page ? (page - 1) * limit : 0 },
      { $limit: limit },
    ])
    return result;
  };
}

export default Review;
