'use strict';
/*Start of the import block*/
var express = require('express');
var recruiter = express.Router();
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages').messages;
var db = require('../db/recruiters');
/*End of the import block*/


/*Handle POST request on http://www.domainName.com/recruiter/register*/
recruiter.post('/register', function (request, response) {
    /*Read the request body*/
    var payload = request.body;
    /*Get the company data*/
    var recruiterData =  payload.recruiter;
    /*If the Payload has the recruiter data.Proceed for the next steps*/
    if(recruiterData){
        /*Check if one of the email or mobile number is entered. If none is entered throw an error*/
        if(!recruiterData.email || recruiterData.phone){
            responseManager.setResponse(response,400,false,messages.EMAIL_PHONE_MISSING);
        }else{
            /*Create a new entry for the recruiter in the DB.*/
            db.createRecruiter(recruiterData, function (res) {
                responseManager.setResponse(response,201,true,messages.RECRUITER_REG_SUCCESS);
            }, function (err) {
                return responseManager.setResponse(response,400,false,messages.RECRUITER_PROFILE_EXISTS);
            });
        }

    }
    /*If Payload doesn't have recruiter data,then send the error response*/
    else{
        return responseManager.setResponse(response,400,false,messages.RECRUITER_DATA_MISSING);
    }

});

module.exports = recruiter;