/*Start of the Imports section*/
var express = require('express'); /*Routing and Server management*/
var path = require('path'); /*Utilities to work with directories and Paths*/
var logger = require('morgan'); /*Request Logger.All the requests to server can be logged*/
var cookieParser = require('cookie-parser');/*Cookie parsing*/
var bodyParser = require('body-parser');/*Parse bodies of the requests.*/
var cors = require('cors');/*Cross-Origin Resource Sharing for access control to ristricted resources*/
var config = require('./config/main');/*Application specific configurations*/
var nodemailer = require("nodemailer");/*Send emails*/
/*End of the imports Section*/

/*Instantiate express*/
app = express();


/*Configure the express*/
app.use(logger('dev'));
app.use(bodyParser.json());

/*Start treating requests on the port(set in config file)*/
app.listen(config.port,function(){
    console.log('Your server is running on port ' + config.port + '.');
});


//To accept data in URL Encoded format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

require('./routes/routesManager')(app);

/*Catch of the HTTP-404 : Not Found error*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    /*Pass on to the handler*/
    next(err);
});

/*Error handler*/
app.use(function(err, req, res, next) {
    //Set locals
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}; //TO-DO.Error message in Production.

    //Render the error page
    res.status(err.status || 500);
    
    /*Send the response.With error message*/
    res.send({
        "success": false,
        "error":{
            "message": err.message,
            "stack":err.stack
        }
    });
});

exports.app = app;
