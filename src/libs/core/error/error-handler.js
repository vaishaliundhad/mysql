import { CustomError } from './custom-error.js';
import { StatusCodes } from 'http-status-codes';

class ErrorHandler {
    handleError(error, req, res) {
        console.error('Centralized Error Handler:', error.message);

       
        if (!res) {
            console.error("Unhandled error without response object:", error);
            return;
        }

    
        if (error.name === "ValidationError") {
            return this.handleMongooseValidationError(error, res);
        }

        if (error.code && error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue || {});
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: `Duplicate value for: ${duplicateField.join(', ')}`,
                statusCode: StatusCodes.CONFLICT,
                errors: [error.keyValue],
            });
        }

      
        if (error instanceof CustomError) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
                errors: error.errors || [],
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errors: [{ error: error.message || "Unknown Error" }]
        });
    }

    isTrustedError(error) {
        return error instanceof CustomError && error.isOperational;
    }

    handleMongooseValidationError(error, res) {
        const formattedErrors = Object.values(error.errors).map(err => ({
            path: err.path,
            message: err.message,
            type: err.kind,
        }));

        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Validation Error",
            statusCode: StatusCodes.BAD_REQUEST,
            errors: formattedErrors,
        });
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
