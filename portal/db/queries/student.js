'use strict';
/*Start of the import block*/
var config = require('../../config/main');
/*End of the import block*/

var dbName = config.database.databaseName;

var studentQueries = {};

/**
 *
 * @returns {string}
 */
studentQueries.getAllStudents = function(){
    return "SELECT * from students;"
};

studentQueries.getStudent = function (id) {
    return "SELECT * from students where id=" + id + ";"
}

module.exports = studentQueries;