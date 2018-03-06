/**
 * Created by Charly on 10/03/2017.
 */
var mysql = require('mysql'),
    connection = mysql.createConnection(
        {
            host : 'localhost',
            port : '3306',
            user : 'root',
            password: '',
            database: 'sicty'
        }
    );

module.exports = connection;
