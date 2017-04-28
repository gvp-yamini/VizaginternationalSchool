'use strict';
/*Start of the import block*/
var crypt = require('../utilities/crypt');
var queries = require('./queries/student');
var connection = require('../db/connection');
/*End of the import block*/

var db = {};

db.getAllStudents = function(successCallback, failureCallback){
    connection.query(queries.getAllStudents(),function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows)
        } else {
            failureCallback('Could not retrieve student data');
        }
    });
}

db.getStudent = function (id,successCallback, failureCallback) {
    var student={};
    id = parseInt(id, 10);
     console.log("inside db"+id);
     if(id){
        connection.query(queries.getStudent(id),function (err,rows,fields,res) {
        if(err){
            console.log("error callback");
            failureCallback(err);
            return;
        }
        if(rows.length > 0){
            console.log("row.length-->"+rows.length);
            successCallback(rows);
        }else{
            console.log("Could not retrieve student data");
            failureCallback('Could not retrieve student data');
        }
    },function(err){
            console.log("inside db error callback");
            failureCallback('Could not retrieve student data');
    });
     }else{
          failureCallback('id is null,NaN or Undefined ');
     }
    
}

module.exports = db;