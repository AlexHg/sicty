/**
 * Created by Juan Carlos on 10/03/2018.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var reporteLcal = require('../models/Reportes_LocalModel');
var comentarioModel = require('../models/Comentario');
var auth = require('../funciones/authentication');
var file = require('../models/Archivo_Mensaje');
var fileUser = require('../models/Archivo_MensajeUser');

router.get('/', function(req, res, next) {
    //console.log(req.body)
    reporteLcal.getAll(function (err, data) {
        if (!err){
            res.status(200).json(data);
        }
    });
});

router.get('/:id', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        var datos ={};
        var id = req.params.id;
        reporteLcal.findById(id,function (err, data) {
            if (!err){
                datos.info = data[0];
                datos.propiedades = datos.info.propiedades.split(',');
                comentarioModel.clientefindByReporteAux(id,function (errC,dataC) {
                    if(!errC){
                        datos.comentariosC = dataC;

                        comentarioModel.usariofindByReporteAux(id,function (errU,dataU) {
                            if(!errU){
                                datos.comentariosU = dataU;
                                //
                                // res.status(200).json(datos);
                                res.render('report',{title: 'Sicty report system', data:datos, user:req.session.nombre});
                            }
                        });
                    }
                });
            }
        });
    });
});

router.post('/', urlencodedParser, function(req, res, next) {
    res.render('report',{title: 'Sicty report system', data:req.body, user:req.session.nombre});
    //if (!req.body) return res.sendStatus(400)
    //res.send('welcome, ' + req.body.nombre)
});




module.exports = router;