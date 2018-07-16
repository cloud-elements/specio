class SpecioError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class NotFound extends SpecioError {
  constructor(message) {
    super(message, 404);
  };  
}

class Forbidden extends SpecioError {
  constructor(message) {
    super(message, 403);
  };  
}
class Unauthorized extends SpecioError {
  constructor(message) {
    super(message, 401);
  };  
}

class MethodNotAllowed extends SpecioError {
  constructor(message) {
    super(message, 405);
  }
}

class InternalServerError extends SpecioError {
  constructor(message) {
    super(message, 500);
  }
}

class Conflict extends SpecioError {
  constructor(message) {
    super(message, 409);
  }
}

class BadRequest extends SpecioError {
  constructor(message) {
    super(message, 400);
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