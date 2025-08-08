import { StatusCodes } from "http-status-codes";


// Response handler class
export class ResponseHandler {
  // Send a success response
    sendSuccess(res, data) {
    const isArray = Array.isArray(data);
    const response = {
      message: 'Request successful',
      success: true,
      data: data,
      ...(data ? { count: isArray ? data.length : 1 } : {})
    };
    res.status(StatusCodes.OK).json(response);
  }

  // Send an error response
  sendError(res, errorMessage) {
    const response = {
      message: 'Caught internal server error',  
      success: false,
      error: errorMessage
    };
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }

  sendDynamicError(res, errorMessage) {
    let response;
    if (typeof errorMessage === 'string') {
      response = {
        message: errorMessage,
        success: false,
        error: errorMessage
      };
    } else {
      response = {
        message: 'Caught internal server error',
        success: false,
        error: errorMessage.message
      };
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }

  // Send a resource created response
  sendCreated(res, data) {
    const response = {
      message: 'Resource created successfully',
      success: true,
      data: data
    };
    res.status(StatusCodes.CREATED).json(response);
  }

  sendOTP(res , data) {
    const response = {
      message: 'OTP send successfully',
      success: true,
      //  data:data
    };
    res.status(StatusCodes.CREATED).json(response);
  }

  VerifyOTP(res) {
    const response = {
      message: 'OTP verify successfully',
      success: true,
    };
    res.status(StatusCodes.CREATED).json(response);
  }

  sendConnected(res, data) {
    const response = {
      message: 'Connected successfully',
      success: true,
      data: data
    };
    res.status(StatusCodes.CREATED).json(response);
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
  sendUpdatede(res, data) {
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
}


