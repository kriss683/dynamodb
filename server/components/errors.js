'use strict';

const errors = {
    ErrorEntry : function (code, message, param, type) {
        this.code = code;
        this.message = message;
        if (param) {
            this.param = param;
        }
        if (type) {
            this.type = type;
        }
    },
    
    CommonError: function (statusMessage, errmessage, statusCode, errorCode) {
        Error.captureStackTrace(this, this.constructor);
        this.name = statusMessage || 'Data Error';
        this.code = errorCode || 782;
        this.statusMessage = errmessage || 'Data error';
        this.statusCode = statusCode || 700;
    },
    
    DataNotFound: function (message, statusCode) {
        Error.captureStackTrace(this, this.constructor);
        this.name = 'Data Not Found';
        this.message = message || 'The requested resource couldn\'t be found';
        this.statusCode = statusCode || 604;
        this.status = 404;
        this.caught = true;
    },
    
    BadRequest: function (message, statusCode, errors) {
        Error.captureStackTrace(this, this.constructor);
        this.name = 'Invalid Request';
        this.code = 704;
        this.statusCode = statusCode || 601;
        this.status = 400;
        this.message = message || 'Invalid Request';
        this.caught = true;
        if (errors) {
            this.errs = errors;
        }
    },
    
    TechnicalError: function (message, statusCode) {
        Error.captureStackTrace(this, this.constructor);
        this.code = 795;
        this.statusCode = statusCode || 700;
        this.status = 500;
        this.name = 'TechnicalError';
        this.message = message;
    }        
};

module.exports = errors;