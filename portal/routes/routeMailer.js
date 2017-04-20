'use strict';

/*Start of the import block*/
var express = require('express');
var responseManager = require('../utilities/responseHandler');
var messages = require('../utilities/appMessages');
var nodemailer = require('nodemailer');
/*End of the import block*/

var mailRouter = express.Router();
mailRouter.post('/sendJobInvite',function(req, res) {

    var mailingData = req.body;

   var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'missionrnd123@gmail.com', // Your email id
            pass: 'missionrnd' // Your password
        },
        tls: {
            rejectUnauthorized: false
       }
    });

    var mailOptions = {
    from: 'missionrnd123@gmail.com', // sender address
    to: mailingData.mailingList, // list of receivers
    subject: mailingData.subject, // Subject line
    text: mailingData.msgBody //, // plaintext body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({message: error});
        //responseManager.setResponse(error, 400, false, messages.MAIL_SENT_FAILED);
    }else{
        //responseManager.setResponse(info.response, 201, true, messages.MAIL_SENT_SUCCESS);
        console.log('Message sent: ' + info.response);
        transporter.close();
        res.json({message: info.response});
    };
});
  transporter.close();
});

module.exports = mailRouter;