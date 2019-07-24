class SpecioError extends Error {
  constructor(message, status, exception) {
    super(message);
    this.status = status;
    this.exception = exception;
  }
}

class BadRequest extends SpecioError {
  constructor(message, ex) {
    super(message, 400, ex);
  }
}

class Unauthorized extends SpecioError {
  constructor(message, ex) {
    super(message, 401, ex);
  };  
}

class Forbidden extends SpecioError {
  constructor(message, ex) {
    super(message, 403, ex);
  };  
}

class NotFound extends SpecioError {
  constructor(message, ex) {
    super(message, 404, ex);
  };  
}

class MethodNotAllowed extends SpecioError {
  constructor(message, ex) {
    super(message, 405, ex);
  }
}

class Conflict extends SpecioError {
  constructor(message, ex) {
    super(message, 409, ex);
  }
}

class InternalServerError extends SpecioError {
  constructor(message, ex) {
    super(message, 500, ex);
  }
}

module.exports = { 
  NotFound, 
  Forbidden, 
  Unauthorized, 
  MethodNotAllowed, 
  InternalServerError, 
  Conflict,
  BadRequest 
}