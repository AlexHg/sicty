var express = require('express');
var router = express.Router();

var categoria = require('../models/CategoriaModel');
var auth = require('../funciones/authentication');


router.get('/new', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        res.render('new_category',{title: 'Sicty report system',user:req.session.nombre});
    });
});

router.get('/', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        categoria.getAll(function (er,da) {
            if (!er) {
                //Recibe datos del wizard
                res.render('category_list', {title: 'Sicty report system', datos: da, user: req.session.nombre});
            }
        });
    });
});

router.post('/', function(req, res, next) {
    categoria.save([0,req.body.nombre,req.body.prioridad],function (er,da) {
        if(!er){
            res.redirect('/categoria');
        }
    })
});


module.exports = router;
