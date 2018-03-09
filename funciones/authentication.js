/**
 * Created by Juan Carlos on 08/03/2018.
 */

var Authentication = {};


Authentication.mach = function (req,res,callback) {
    if(req.session.nombre != null){
        callback(req,res);
    }else{
        res.redirect('/');
    }
};


Authentication.loginMach = function (req,res,callback) {
    if(req.session.nombre != null){
        res.redirect('/app');
    }else{
        callback(req,res);
    }
};

module.exports =Authentication;