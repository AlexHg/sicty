var connection = require('../connection/connection');
var Empresa = {};


Empresa.getAll = function (callback) {
    if (connection){
        var sql = "SELECT * FROM `empresa`";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

Empresa.findById = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `empresa` WHERE `idempresa` = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};
