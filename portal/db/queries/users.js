'use strict';
/*Start of the import block*/
var config = require('../../config/main');
/*End of the import block*/

var dbName = config.database.databaseName;
var userQueries = {};

/**
*@function {findUserByEmail} - Finds the User by email
*param {String} - email
*return {Object} - User object
*/
userQueries.findUserByEmail = function(email){
    return "SELECT * FROM `" + dbName + "`.users WHERE `user_email` = '" + email + "';"
};

/**
*@function {createUser} - Creates the User
*param {Object} - user
*				- user.email - Email id of the user
				- user.password - hash code for the user password
*return {Object} - User object
*/
userQueries.createUser = function(user){
    return "INSERT INTO `" + dbName + "`.`users` (`user_email`, `password`) VALUES ('" + user.email + "', '" + user.password + "');";
};

module.exports = userQueries;