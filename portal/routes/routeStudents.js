'use strict';

/*Start of the import block*/
var express = require('express');
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages');
var student = express.Router();
var db = require('../db/students');
//var passport = require('passport');
/*End of the import block*/

//var requireAuth = passport.authenticate('jwt', {session: false});
// Initialize passport
//app.use(passport.initialize());
// Bring in defined Passport Strategy
//require('../utilities/passport')(passport);

/*Handle POST request on http://www.domainName.com/student/register*/
student.post('/', function (req, res) {
    var data = req.body;
    var studentData = data.student;
    db.createStudent(function(res) {
        responseManager.setResponse(res, 201, true, messages.CREATE_STUDENT_SUCCESS);
    }, function (err) {
        responseManager.setResponse(res, 400, false, messages.CREATE_STUDENT_FAILED);
    });
});

student.get('/', function (request, response) {
    var id = request.query.id;
    if(id===undefined || id===null)
    {
        db.getAllStudents(function (res) {
            response.send(res);
        }, function (err) {
            responseManager.setResponse(res, 400, false, messages.GET_STUDENTS_FAILED);
        });
    }else{
        db.getStudent(id,function(res){
            response.send(res);
        },function(err){
            responseManager.setResponse(res,400,false,messages.GET_STUDENTS_FAILED);
        });
    }
});

student.get('/', function (request, response) {
    db.getAllStudents(function (res) {
        response.send(res);
    }, function (err) {
        responseManager.setResponse(res, 400, false, messages.GET_STUDENTS_FAILED);
    });
});


module.exports = student;