var express = require('express');
var router = express.Router();

var categoria = require('../models/CategoriaModel');
var auth = require('../funciones/authentication');


router.get('/new', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        res.render('new_category',{title: 'Sicty report system',user:req.session.nombre});
    });
});

router.get('/:id/editar', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        var id = req.params.id;
        categoria.findById(id, function(err, data){
            //res.status(200).json(data);
            res.render('edit_category',{title: 'Sicty report system',user:req.session.nombre, datos: data[0]});
        });
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
