import axios from "axios";
import config from "#config/index";
import { somethingWentWrongError } from "#errors/index";

class OMDBService {
  static async getMoviesByTitle({ title, type, page }) {
    // TODO: handle errors
    const response = await axios.get(`${config.OMDB_API_URL}`, {
      params: { s: title, type, page },
    });
    if (response.data.Error) throw somethingWentWrongError();
    return response.data;
  }

  static async getMovieById(id) {
    // TODO: handle errors
    const response = await axios.get(`${config.OMDB_API_URL}`, {
      params: { i: id },
    });
    return response.data;
  }
}

export default OMDBService;
