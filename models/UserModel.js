/**
 * Created by Juan Carlos on 02/03/2018.
 */

var connection = require('../connection/connection');
var UsuarioModel = {};

UsuarioModel.getAll = function (callback) {
    if (connection){
        var sql = "SELECT * from usuario";
        connection.query(sql, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};

UsuarioModel.findById = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM usuario where idusuario = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};


UsuarioModel.findByEmail = function (id,callback) {
    if (connection){
        var sql = "SELECT * FROM usuario where correo = ?";
        connection.query(sql,id, function (error,data) {
            if (error)
                throw error;
            else{
                callback(null,data);
            }
        });
    }
};


UsuarioModel.login = function (params,callback) {
    if (connection){
        var sql = "SELECT * FROM usuario where correo = ? and contra = ?";
       // var a = sql.replace('?',params[0]).replace('?',params[1])
       // console.log(a)
        connection.query(sql,params, function (error,data) {
            if (error)
                callback(true,null,false);
            else{
                if(data.length > 0){
                    callback(null,data,true);
                }else{
                    callback(null,data,false);
                }
            }
        });
    }
};

UsuarioModel.save = function (user,callback) {
    if (connection){
        var sql = "INSERT INTO `usuario`  VALUES (NULL, ?, ?, ?, ?)";
        connection.query(sql,user, function (error,data) {
            if (error)
                callback(true,null);
            else{
                callback(null,data.insertId);
            }
        });
    }
};

UsuarioModel.save = function (id,user,callback) {
    if (connection){
        var sql = "UPDATE `usuario` SET `idusuario`=?,`correo`=?,`nombre`=?,`contra`=? WHERE idrol =" +id;
        connection.query(sql,user, function (error,data) {
            if (error)
                callback(true,null);
            else{
                callback(null,data.insertId);
            }
        });
    }
};


UsuarioModel.cambiarPassword = function (user,callback) {
    if (connection){
        var sql = "UPDATE `usuario` SET contra = ? WHERE `idusuario` = ?";
        connection.query(sql,user, function (error,data) {
            if (error)
                callback(true,null);
            else{
                callback(null,data);
            }
        });
    }
};


module.exports= UsuarioModel;