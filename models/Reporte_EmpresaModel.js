/**
 * Created by Juan Carlos on 05/03/2018.
 */


/**
 * Created by Juan Carlos on 02/03/2018.
 */

var connection = require('../connection/connection');
var ReporteEmpresaModel = {};

ReporteEmpresaModel.getAll = function (callback) {
    if (connection){
        var sql = "select * from reporte inner join reporte_empresa on reporte.idreporte = reporte_empresa.idreporte_empresa;";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

ReporteEmpresaModel.findById = function (id,callback) {
    if (connection){
        var sql = "select * from reporte inner join reporte_empresa on reporte.idreporte = reporte_empresa.idreporte_empresa where idreporte = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};


ReporteEmpresaModel.save=function(reporte,callback){

    connection.beginTransaction(function(err) {
        if (err) { callback(true,{"er":"connection","cod":error}); }

        connection.query("INSERT INTO `reporte`  VALUES (NULL, ?, ?, ?, ?, ?, ?)",reporte[0],function (error, results) {
            if (error) {
                return connection.rollback(function() {
                    callback(true,{"er":"usr","cod":error});
                });
            }else{
                reporte[1][0] = results.insertId;
                connection.query("INSERT INTO `reporte_empresa` VALUES (?, ?)",reporte[1], function (error, results, fields) {
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
                            callback(false,results);
                        });
                    }
                });
            }

        });
    });
};


/*ReporteEmpresaModel.delete = function (id,callback) {
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


module.exports= ReporteEmpresaModel;