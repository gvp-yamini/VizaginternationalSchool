'use strict';
/*Start of the import block*/
var queries = require('./queries/company');
var connection = require('../db/connection');
/*End of the import block*/

var db = {};

/**
*@function {createCompany} - Creates the company for the data sent
*param {Object} - company
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
db.createCompany = function (company, successCallback, failureCallback) {
	/*Set up the Query to insert the company data*/
    var sqlQuery = queries.createCompany(company);
    /*Execute the query to insert company data*/
    connection.query(sqlQuery,
        function (err, rows, fields, res) {
            if (err) {
                failureCallback(err);
                return;
            }
            successCallback();
        });
}

module.exports = db;