export class NotFoundError extends Error {
  constructor(entity: string) {
    super();
    this.message = `The ${entity} with the given ID was not found`;
  }
}

export class InvalidParameterError extends Error {
  constructor(public parameterName: string) {
    super();
    this.message = `Incorrect value for the ${parameterName} parameter`;
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ExistingUserError extends Error {
  constructor() {
    super();
    this.message = "Username already exists";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = "You aRe not authorized to access this site";
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = "You lack the required credentials to access this site.";
  }
}
