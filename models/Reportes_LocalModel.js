/**
 * Created by Juan Carlos on 02/03/2018.
 */

var connection = require('../connection/connection');
var ReporteLocalModel = {};

ReporteLocalModel.getAll = function (callback) {
    if (connection){
        var sql = "select * from reporte inner join reporte_local on reporte.idreporte = reporte_local.idreporte_local;";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

ReporteLocalModel.findById = function (id,callback) {
    if (connection){
        var sql = "select reporte.*,reporte_local.*,usuario.nombre,usuario.idrol from reporte inner join reporte_local on reporte.idreporte = reporte_local.idreporte_local INNER JOIN usuario on reporte.idoperador = usuario.idusuario where reporte.idreporte = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};





ReporteLocalModel.save=function(reporte,callback){

    connection.beginTransaction(function(err) {
        if (err) { callback(true,{"er":"connection","cod":error}); }

        connection.query("INSERT INTO `reporte`  VALUES (NULL, ?, ?, ?, ?, ?, ?)",reporte[0],function (error, results) {
            if (error) {
                return connection.rollback(function() {
                    callback(true,{"er":"usr","cod":error});
                });
            }else{
                reporte[1][0] = results.insertId;
                connection.query("INSERT INTO `reporte_local` VALUES (?, ?, ?, ?, ?, ?,?)",reporte[1], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            callback(true,{"er":"log","cod":error});
                        });
                    }else{
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    callback(true,{"er":"comit","cod":error});
                                });
                            }
                            console.log('success!');
                            callback(false, reporte[1][0]);
                        });
                    }
                });
            }

        });
    });
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


module.exports= ReporteLocalModel;