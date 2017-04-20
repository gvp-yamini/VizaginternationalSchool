'use strict';
/*Start of the import block*/
var bcrypt = require('bcrypt-nodejs');
/*End of the import block*/

var crypt = {};


/**
*@function {createHash} - Creates the hashcode for the data sent
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
crypt.createHash = function (data, successCallback, failureCallback) {
    /*Generate a salt to be added to the data before hashing*/
    bcrypt.genSalt(10, function (err, salt) {
        /*Error in salt generation*/
        if (err) {
            failureCallback(err);
            return;
        }
        /*Create the hash with data and salt*/
        bcrypt.hash(data, salt, null, function (err, hash) {
            /*error in hash generation*/
            if (err) {
                failureCallback(err);
                return;
            }
            /*hash generation successful*/
            successCallback(hash);
        });
    });
};


/**
*@function {compareHash} - Compares the passwords
*param {String} - data - Entered password
*param{String} - encrypted - Retrieved password.From DB
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
crypt.compareHash = function (data, encrypted, successCallback, failureCallback) {
    bcrypt.compare(data, encrypted, function (err, isMatch) {
         /*Mismatch*/
        if (err) {
            failureCallback(err);
            return;
        }
        /*Comparision successful*/
        successCallback(err, isMatch);
    });
};


module.exports = crypt;