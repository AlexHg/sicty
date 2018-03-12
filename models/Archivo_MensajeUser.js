/**
 * Created by Juan Carlos on 08/03/2018.
 */
/**
 * Created by Juan Carlos on 06/03/2018.
 */
/**
 * Created by Juan Carlos on 02/03/2018.
 */

var connection = require('../connection/connection');
var ArchivoModelo = {};


ArchivoModelo.getAll = function (callback) {
    if (connection){
        var sql = "SELECT * FROM `archivo`";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

ArchivoModelo.findById = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `archivo` WHERE `idarchivo` = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};



ArchivoModelo.findByReporte = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `archivo` WHERE `idmensaje` = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};
ArchivoModelo.findByReporteU = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `archivo` WHERE `idmensaje` = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

//INSERT INTO `archivo` (`idarchivo`, `ruta`, `tipo`, `idmensaje`) VALUES (NULL, 'a.jpg', '1', '3');

ArchivoModelo.save=function(archivo,callback){
    if (connection){
        var sql = "INSERT INTO `archivo` VALUES (NULL, ? , '1', ?);";
        connection.query(sql,archivo, function (error,data) {
            if (error)
                callback(true,null);
            else{
                callback(null,data.insertId);
            }
        });
    }
};


/*ReporteLocalModel.delete = function (id,callback) {
 if (connection){
 var sql = "select * from reporte inner join reporte_local on reporte.idreporte = reporte_local.idreporte_local where idreporte = ?";
 connection.query(sql,id, function (error,data) {
 if (error)
 throw error;
 else{
 callback(null,data);
 }
 });
 }
 };*/


module.exports= ArchivoModelo;