import OMDBService from "#services/omdb/index";
import ResponseService from "#services/core/response";

class PublicController {
  static getMovies = async (req, res) => {
    const { title, type, page } = req.query;
    const movies = await OMDBService.getMoviesByTitle({title, type, page});
    return ResponseService.handleResponse(res, movies);
  };

  static getMovieById = async (req, res) => {
    const movie = await OMDBService.getMovieById(req.params.id);
    return ResponseService.handleResponse(res, movie);
  };

}

export default PublicController;
