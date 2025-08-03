import { StatusCodes } from 'http-status-codes';


// Response handler class
export class Responsehandler {
    // Send a success response
    sendSuccess(res, data) {
        const isArray = Array.isArray(data);
        const response = {
            message: "Request successful",
            success: true,
            data: data,
            ...(data ? { count: isArray ? data.length : 1 } : {})

        };
        res.status(StatusCodes.OK).json(response);
    }

    // Send an error response
    sendError(res, errorMessage) {
        const response = {
            message: "Caught internal server error",
            success: false,
            error: errorMessage
        };
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    // sendDynamicError(res, errorMessage) {

    //     const response = {
    //         message: 'Caught internal server error',
    //         success: false,
    //         error: typeof errorMessage === 'string' ? errorMessage : 'Unknown error'
    //     }
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
    // }

    sendError(res, errorMessage) {
        const response = {
            message: "Caught internal server error",
            success: false,
            error: errorMessage
        };
        // If you forget to call res.status(...).json(...)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }


    // Send a resource created response
    sendCreated(res, data) {
        const response = {
            message: "Resourse created successfully",
            success: true,
            data: data
        };
        res.status(StatusCodes.CREATED).json(response)
    }
    sendOTP(res) {
        const response = {
            message: "OTP send Successfully",
            success: true
        };
        res.status(StatusCodes.CREATED).json(response)
    }

    verifyOTP(res) {
        const response = {
            message: 'OTP verify successfully',
            success: true
        };
        res.status(StatusCodes.CREATED).json(response)
    }

    sendConnected(res, data) {
        const response = {
            message: 'Connected successfully',
            success: true,
            data: data
        }

        res.status(StatusCodes.CREATED).json(response)
    }

    sendTransfer(res, data) {
        const response = {
            message: 'Payment Transfer successfully',
            success: true,
            data: data
        };
        res.status(StatusCodes.CREATED).json(response);
    }
    // Send a resource updated response
    sendUpdated(res, data) {
        const response = {
            message: 'Resource updated successfully',
            success: true,
            data: data
        };
        res.status(StatusCodes.OK).json(response);
    }

    // Send a resource deleted response
    sendDeleted(res) {
        const response = {
            message: 'Resource deleted successfully',
            success: true
        };
        res.status(StatusCodes.OK).json(response);
    }

    sendValidationError(res, errorMessage) {
        const response = {
            message: "Validation error",
            success: false,
            error: errorMessage
        };
        res.status(StatusCodes.BAD_REQUEST).json(response);
    }



}