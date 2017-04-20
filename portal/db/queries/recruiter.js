'use strict';
/*Start of the import block*/
var config = require('../../config/main');
/*End of the import block*/


var dbName = config.database.databaseName;
var recruiterQueries = {};


/**
*@function {createRecruiter} - Creates the Recruiter
*param {Object} - recruiter
*				- recruiter.name - Name of the recruiter
*				- recruiter.phone - phone number of the recruiter
*				- recruiter.email - Email id of the Recruiter
*				- recruiter.company - Recruiters Company
*				- recruiter.linkedin - Linkedin profile of the Recruiter
*return {Object} - Recruiter object
*/
recruiterQueries.createRecruiter = function (recruiter) {
    return "INSERT INTO `" + dbName + "`.`recruiter` " +
        "(`recruiter_name`, `recruiter_phone`,`recruiter_email`,`recruiter_company`,`recruiter_linkedin`) VALUES " +
        "('" + recruiter.name + "', '" + recruiter.phone + "', '" + recruiter.email + "', '" + recruiter.company + "','" + recruiter.linkedin + "')";
};

module.exports = recruiterQueries;