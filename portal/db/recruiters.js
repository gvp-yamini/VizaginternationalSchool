'use strict';
/*Start of the import block*/
var queries = require('./queries/recruiter');
var connection = require('../db/connection');
/*End of the import block*/

var db = {};
/**
*@function {createRecruiter} - Creates the recruiter for the data sent
*param {Object} - recruiter
*param {function} - successCallback - Called on success
*param{function} - failureCallback - Called on failure
*return {void}
*/
db.createRecruiter = function (recruiter, successCallback, failureCallback) {
	/*Set up the Query to insert the recruiter data*/
    var sqlQuery = queries.createRecruiter(recruiter);
    /*Execute the query to insert recruiter data*/
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