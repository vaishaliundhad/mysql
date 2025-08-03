import { StatusCodes } from 'http-status-codes'

export class CustomError extends Error {
    constructor(message, errors = []) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }

    serializeErrors() {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode,
            errors: this.errors || []
        };
    }

}

export class JoiRequestValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.status = 'error';
        this.isOperational = true;
    }
}

export class BadRequestError extends CustomError {
    constructor(message = "Bad Request", errors = []) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.status = 'error';
        this.errors = errors;
        this.isOperational = true;
    }
}

export class DuplicateEntityError extends CustomError {
    constructor(message = "Duplicate record") {
        super(message);
        this.name = "DuplicateEntityError";
        this.statusCode = StatusCodes.CONFLICT; // 409
        this.status = 'error';
        this.errors = [];
        this.isOperational = true;
    }
}

export class NotFoundError extends CustomError {
    constructor(message = "Not Found", details = []) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
        this.details = details;
    }
}

export class NotAuthorizedError extends CustomError {
    constructor(message = "Not authorized") {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.status = 'error';
        this.isOperational = true
    }
}


export class FileToolLargeError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.REQUEST_TOO_LONG
        this.status = 'error'
        this.isOperational = true
    }
}

export class ServerError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
        this.status = 'error'
        this.isOperational = true
    }
}