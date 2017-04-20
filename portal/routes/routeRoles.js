'use strict';

/*Start of the import block*/
var express = require('express');
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages').messages;
var roles = express.Router();
/*End of the import block*/


/*Handle POST request on http://www.domainName.com/roles/create*/
roles.post('/create', function (req,res) {

});


module.exports = roles;