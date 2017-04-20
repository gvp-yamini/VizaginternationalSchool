/*Start of the import block*/
var config = require('../config/main');
var mysql = require('mysql');
/*End of the import block*/


/*Create the connection with the configurations set in the config file*/
var connection = mysql.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
    database: config.database.databaseName
});

/*Check the connection established*/
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;