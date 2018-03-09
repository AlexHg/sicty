/**
 * Created by Juan Carlos on 06/03/2018.
 */
/**
 * Created by Juan Carlos on 02/03/2018.
 */

var connection = require('../connection/connection');
var NotasModel = {};


NotasModel.getAll = function (callback) {
    if (connection){
        var sql = "SELECT * FROM `mensaje` INNER JOIN msjusuario on mensaje.idmensaje = msjusuario.idmensaje where mensaje.isnota =1";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

NotasModel.findById = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `mensaje` INNER JOIN msjusuario on mensaje.idmensaje = msjusuario.idmensaje WHERE mensaje.idmensaje = ? and mensaje.isnota =1";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};



NotasModel.findByReporte = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `mensaje` INNER JOIN msjusuario on mensaje.idmensaje = msjusuario.idmensaje WHERE mensaje.idreporte = ? and mensaje.isnota =1";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};



NotasModel.save=function(reporte,callback){

    connection.beginTransaction(function(err) {
        if (err) { callback(true,{"er":"connection","cod":error}); }

        connection.query("INSERT INTO `mensaje`  VALUES (NULL, ?, ?, ?,1)",reporte[0],function (error, results) {
            if (error) {
                return connection.rollback(function() {
                    callback(true,{"er":"usr","cod":error});
                });
            }else{
                reporte[1][0] = results.insertId;
                connection.query("INSERT INTO `msjusuario`  VALUES (?, ?);",reporte[1], function (error, results, fields) {
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


module.exports= NotasModel;