var express = require('express');
var router = express.Router();

var usuario = require('../models/UserModel');
var auth = require('../funciones/authentication');


router.get('/new', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        res.render('new_user',{title: 'Sicty report system',user:req.session.nombre});
    });
});

router.get('/', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        usuario.getAll(function (er,da){
            if (!er) {
                //Recibe datos del wizard
                res.render('user_admin',{title: 'Sicty report system',datos:da,user:req.session.nombre});
            }
        });
    });
});

router.post('/', function(req, res, next) {
    var UserArray = [req.body.correo,req.body.nombre,req.body.rol,req.body.contra]
    usuario.save(UserArray,function (err, data) {
        if (!err){
            res.redirect('/usuario');
        }
    });
});


module.exports = router;
