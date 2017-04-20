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
    connection.query(queries.getStudent(id),function (err,rows,fields,res) {
        if(err){
            failureCallback(err);
            return;
        }
        if(rows.length > 0){
            student = rows;
        }else{
            failureCallback('Could not retrieve student data');
        }
    });
    connection.query(queries.getStudentProjects(id),function (err,rows,fields,res) {
        if(err){
            failureCallback(err);
            return;
        }
        student[0].projects = rows;
        successCallback(student);
    })
}

module.exports = db;