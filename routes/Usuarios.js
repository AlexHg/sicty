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

router.get('/:id/editar', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        var id = req.params.id;
        usuario.findById(id,function (er,da){
            if (!er) {
                //Recibe datos del wizard
                //res.status(200).json(da);
                res.render('edit_user',{title: 'Sicty report system',datos:da[0],user:req.session.nombre});
            }
        });
    });
});

router.post('/:id/editar', function(req, res, next){
    auth.mach(req, res, function(req, res){
        var UserArray = [req.body.correo,req.body.nombre,req.body.rol,req.body.contra];
        usuario.update(id, UserArray, function (err, data){
            if (!err){
                res.redirect('/usuario');
            }
        });
    });
});

router.post('/', function(req, res, next) {
    var UserArray = [req.body.correo,req.body.nombre,req.body.rol,req.body.contra];
    usuario.save(UserArray,function (err, data) {
        if (!err){
            res.redirect('/usuario');
        }
    });
});


module.exports = router;
