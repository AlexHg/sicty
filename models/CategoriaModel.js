/**
 * Created by Juan Carlos on 12/03/2018.
 */
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
var Catoegoria = {};


Catoegoria.getAll = function (callback) {
    if (connection){
        var sql = "SELECT * FROM `categoria`";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

Catoegoria.findById = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM `categoria` WHERE `idcategoria` = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};


Catoegoria.save=function(archivo,callback){
    if (connection){
        connection.beginTransaction(function(err) {
            if (err) { callback(true,{"er":"connection","cod":error}); }

            connection.query("SELECT * FROM `categoria` ORDER BY `categoria`.`idcategoria` DESC",function (error, results) {
                if (error) {
                    return connection.rollback(function() {
                        callback(true,{"er":"usr","cod":error});
                    });
                }else{
                    archivo[0]=results[0].idcategoria+1;
                    connection.query("INSERT INTO `categoria` VALUES (?, ?, ?)",archivo, function (error, results, fields) {
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
                                callback(false,results.insertId);
                            });
                        }
                    });
                }

            });
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

module.exports= Catoegoria;