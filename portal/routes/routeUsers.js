'use strict';

/*Start of the import block*/
var express = require('express');
var db = require('../db/users');
var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var crypt = require('../utilities/crypt');
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages');
var users = express.Router();
/*End of the import block*/

var requireAuth = passport.authenticate('jwt', {session: false});
// Initialize passport
app.use(passport.initialize());
// Bring in defined Passport Strategy
require('../utilities/passport')(passport);

/*Handle POST request on http://www.domainName.com/register*/
users.post('/register', function (request, response) {
    /*Read the request body*/
    var payload = request.body;

    /*Get the company data*/
    var userData = payload.user;

    /*If the Payload has the recruiter data.Proceed for the next steps*/
    if(userData){
        /*Check if one of the email or mobile number is entered. If none is entered throw an error*/
        if(!(userData.email || userData.phone)){
            responseManager.setResponse(response,400,false,messages.EMAIL_PHONE_MISSING);
        }else{
            /*Create a new entry for the user in the DB.*/
            db.createUser(userData,function(res){
                responseManager.setResponse(response,201,true,messages.USER_REG_SUCCESS);
            },function (err){
                return responseManager.setResponse(response,400,false,messages.USER_PROFILE_EXISTS);
            });
        }

    }
    /*If Payload doesn't have user data,then send the error response*/
    else{
        return responseManager.setResponse(response,400,false,messages.USER_DATA_MISSING);
    }
});

/*Handle POST request on http://www.domainName.com/authenticate*/
users.post('/authenticate', function (request, response) {

    var userData = request.body;

    /*If Payload doesn't have user data,then send the error response*/
    if(!userData){
        return responseManager.setResponse(response,400,false,messages.USER_DATA_MISSING);
    }
    else{

        //noinspection JSAnnotator
        /**
         *@function {successFindUser} - Called when the user authentication is successful.This is the handler for that
         *param {Object} - res - response of the authentication
         *return {void}
        */
        function successFindUser(res) {
            /*Create the User object with the data successfully returned by the findUser function*/
            var user = {
                user_id: res.user_id,
                user_email: res.user_email,
                is_active: res.is_active,
                user_type: res.user_type
            };

            /*If the User is found,check the password match. This is done by comaring the hash*/
            crypt.compareHash(userData.password, res.password, function (err, isMatch) {
                /*If the hash of the entered password and stored password are mathed and if there is no error send back the token*/
                if (isMatch && !err) {
                   /*Create the token*/
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    responseManager.setToken(response,200,token)
                } 
                /*In case passwords do not match*/
                else {
                    responseManager.setResponse(response,401,false,messages.USER_PWD_WRONG);
                }
            });
        }

        //noinspection JSAnnotator
        /**
         *@function {failureFindUser} - Called when the user authentication is failed.This is the handler for that
         *param {Object} - err - Error Object
         *return {void}
        */
        function failureFindUser(err) {
            responseManager.setResponse(response,401,false,messages.USER_AUTH_FAILED);
        }


        /*Invoke the findUser method with the success and failure callbacks,
         *which searches for the user and then reponds by calling the callback*/
        db.findUser(userData, successFindUser, failureFindUser);
    }

    
});

/*Handle GET request on http://www.domainName.com/dashboard*/
users.get('/dashboard', requireAuth,function (request, response) {
    response.send('It worked User id is: ' + request.user.user_id + ', Email id is: ' + request.user.user_email + '.');
});


module.exports = users;