'use strict';

/*Start of the import block*/
var express = require('express');
var routeUsers = require('./routeUsers');
var routeRecruiters = require('./routeRecruiter');
var routeCompany = require('./routeCompany');
var routeStudent = require('./routeStudents');
var routeMailer = require('./routeMailer');
/*End of the import block*/


module.exports = function (app) {
    app.use('/api/', routeUsers);
    app.use('/api/company', routeCompany);
    app.use('/api/recruiter', routeRecruiters);
    app.use('/api/student',routeStudent);
    app.use('/api/',routeMailer);
};