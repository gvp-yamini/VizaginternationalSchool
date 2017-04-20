'use strict';
/*Start of the import block*/
var config = require('../../config/main');
/*End of the import block*/

var dbName = config.database.databaseName;

var companyQueries = {};


/**
*@function {createCompany} - Creates the Company
*param {Object} - company
*				- company.name - Name of the company
*				- company.location - Location of the company
*				- company.description - Description about the company
*				- company.website - Company website
*return {Object} - Company object
*/
companyQueries.createCompany = function (company) {
    return "INSERT INTO `" + dbName + "`.`company` " +
        "(`company_name`, `company_location`,`company_description`,`company_website`) VALUES " +
        "('" + company.name + "', '" + company.location + "', '" + company.description + "', '" + company.website + "');";
};

module.exports = companyQueries;