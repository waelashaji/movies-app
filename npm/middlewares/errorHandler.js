import ResponseService from "#services/core/response";
import config from "#config/index";
import ErrorModel from "#models/ErrorModel";

const errorHandler = (error, req, res, next) => {
  const isInstanceOfErrorModel = error instanceof ErrorModel;
  let parsedError = isInstanceOfErrorModel ? error.toJSON() : error;

  if (config.IS_DEV) console.log(parsedError);

  // return generic error in production rather than exposing specific error
  if (!config.IS_DEV && !isInstanceOfErrorModel) {
    parsedError.message = "Something went wrong";
    parsedError.code = "SOMETHING_WENT_WRONG";
  }

  return ResponseService.error(res, parsedError.message, parsedError.code, 500);
};

export default errorHandler;
