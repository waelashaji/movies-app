export default class ResponseService {
  // List of common HTTP request code
  static defaultErrorCode = "SOMETHING_WENT_WRONG";
  static defaultSuccessCode = "SUCCESS";
  static defaultErrorMessage = "Something went wrong";
  static defaultSuccessMessage = "Success";

  static error(
    res,
    message = this.defaultErrorMessage,
    code = this.defaultErrorCode,
    status = 500,
  ) {
    res.status(status).json({ message, code });
  }

  static handleResponse(res, data) {
    res.status(200).json(data);
  }
}
