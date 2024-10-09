import ResponseService from "#services/core/response";
import ReviewService from "#services/review/index";

class ReviewController {
  static create = async (req, res) => {
    const {movie_id, userName, review } = req.body;
    const result = await ReviewService.create({movie_id, userName, review});
    return ResponseService.handleResponse(res, result);
  };

  static getMany = async (req, res) => {
    const movie_id = req.params.movie_id;
    const { limit, skip } = req.query;
    const reviews = await ReviewService.getMany({movie_id, limit, skip});
    return ResponseService.handleResponse(res, reviews);
  };

}

export default ReviewController;
