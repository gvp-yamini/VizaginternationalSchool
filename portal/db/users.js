'use strict';
/*Start of the import block*/
var crypt = require('../utilities/crypt');
var queries = require('./queries/users');
var connection = require('../db/connection');
/*End of the import block*/

var db = {};

/**
*@function {createUser} - Creates the user for the data sent and sets up the hashcode for the password
*param {Object} - user
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
db.createUser = function (user, successCallback, failureCallback) {
    /*Call the createHash,to create a hashcode for the user password*/
    crypt.createHash(user.password, function (hash) {
        /*After successful generation of the hashcode,insert the data into the uset table.*/
        user.password = hash;

        /*Run the query to insert user information into the DB.*/
        connection.query(queries.createUser(user),
            function (err, rows, fields, res) {
                if (err) {
                    failureCallback(err);
                    return;
                }
                successCallback();
            });
    }, function (err) {
        failureCallback();
    });
};

/**
*@function {createHash} - Creates the hashcode for the data sent
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
db.findUser = function (user, successCallback, failureCallback) {
    var userIdentifier = null || (user.username || user.email);
    if(userIdentifier != null) {
        var sqlQuery = queries.findUserByEmail(userIdentifier);
        connection.query(sqlQuery, function (err, rows, fields, res) {
            if (err) {
                failureCallback(err);
                return;
            }
            if (rows.length > 0) {
                successCallback(rows[0])
            } else {
                failureCallback('User not found.');
            }
        });
    }else{
        failureCallback("Username or email missing");
    }
};

module.exports = db;