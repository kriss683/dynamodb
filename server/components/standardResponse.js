'use strict';

function standardResponse(err, data) {
    var response = {
        operationStatus: {
            'statusCode': err ? err.statusCode || '700' : '0',
            'statusMessage' : err ? err.name : 'Success'
        }
    };

    if (data) {
        response.data = data;
        console.log('Info: ' + JSON.stringify(data));
    }

    if (err) {
        if (err.errs) {
            response.errors = err.errs;
        }
        else {
            if (err.code) {
                response.errors = [];
                response.errors.push({
                    'code': err.code,
                    'message': err.message
                });
            }
        }
        console.error('Error: ' + JSON.stringify(err));
    }

    return response;
}

module.exports = standardResponse;
 