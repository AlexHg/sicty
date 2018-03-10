/**
 * Created by Juan Carlos on 10/03/2018.
 */
var express = require('express');
var router = express.Router();

var reporteLcal = require('../models/Reportes_LocalModel');
var comentarioModel = require('../models/Comentario');

router.get('/', function(req, res, next) {
    //console.log(req.body)
    reporteLcal.getAll(function (err, data) {
        if (!err){
            res.status(200).json(data);
        }
    });
});

router.get('/:id', function(req, res, next) {
    //console.log(req.body)
    var datos ={};
    var id = req.params.id;
    reporteLcal.findById(id,function (err, data) {
        if (!err){
            datos.info = data;
            comentarioModel.clientefindByReporte(id,function (errC,dataC) {
                if(!errC){
                    datos.comentariosC = dataC;
                    comentarioModel.usariofindByReporte(id,function (errU,dataU) {
                        if(!errU){
                            datos.comentariosU = dataU;
                            //res.status(200).json(datos);
                            res.render('report',{title: 'Sicty report system', data:datos, user:req.session.nombre});
                        }
                    });
                }
            });
        }
    });
});

router.post('/', function(req, res, next) {
    var reporte = [],a=req.body;
    reporte[0] = [a.fecha,a.fecha,1,a.cat,a.operador,0];
    reporte[1] = [0,a.correo,a.nombre,a.tel,a.tel2,a.props,a.fechaentrega];
    reporteLcal.save(reporte,function (err, data) {
        if (!err){
            console.log(data)
            //res.status(200).json(data);
            res.redirect('reporte_local/'+data)

        }
    });
});

module.exports = router;