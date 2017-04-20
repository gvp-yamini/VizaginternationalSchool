'use strict';

/*Start of the import block*/
var express = require('express');
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages').messages;
var company = express.Router();
var db = require('../db/companies');
/*End of the import block*/

/*Handle POST request on http://www.domainName.com/company/register*/
company.post('/register', function (request, response) {
    /*Read the request body*/
    var payload = request.body;
    /*Get the company data*/
    var companyData = payload.company;
    /*If the Payload has the company data.Proceed for the next steps*/
    if(companyData){
        /*Check if the name of the company is entered and is not a empty string*/
        if(companyData.name){
            /*Create a new entry for the company in the DB.*/
            db.createCompany(companyData, function (res) {
                responseManager.setResponse(response,201,true,messages.COMPANY_REG_SUCCESS);
            }, function (err) {
                return responseManager.setResponse(response,400,false,messages.COMPANY_REG_FAILURE);
            });
        }
        /*If the company name is not valid,then return the error reponse*/
        else{
            return responseManager.setResponse(response,400,false,messages.COMPANY_NAME_MISSING);
        }
    }
    /*If Payload doesn't have company data,then send the error response*/
    else{
        return responseManager.setResponse(response,400,false,messages.COMPANY_DATA_MISSING);
    }
    
});

module.exports = company;