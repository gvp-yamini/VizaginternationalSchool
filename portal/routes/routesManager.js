'use strict';

/*Start of the import block*/
var express = require('express');
var routeStudent = require('./routeStudents');
var routeMailer = require('./routeMailer');
/*End of the import block*/


module.exports = function (app) {
    app.use('/api/student',routeStudent);
    app.use('/api/',routeMailer);
};