export default class ErrorModel extends Error {
    constructor(message = "", code = null) {
      super(message);
      this.code = code;
    }
  
    toJSON() {
      return {
        message: this.message,
        code: this.code,
        stack: this.stack,
      };
    }
  }
  