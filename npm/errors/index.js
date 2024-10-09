import ErrorModel from "#models/ErrorModel";

export const somethingWentWrongError = () =>
  new ErrorModel("Something went wrong", "SOMETHING_WENT_WRONG");