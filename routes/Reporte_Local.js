/**
 * Created by Juan Carlos on 10/03/2018.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const util = require('util');
var dateFormat = require('dateformat');
var now = new Date();


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


//`idreporte`, `nombreReporte`, `descripcion`, `fechaini`, `fechamod`, `idestado`, `idcategoria`, `idoperador`, `prioridad`

router.post('/', urlencodedParser, function(req, res, next) {
    var reporte  = [],
        a        = req.body,
        now      = dateFormat(now, "yyyy-mm-dd"),
        operador = req.session.nombre.idusuario;

    console.log(now);
    console.log(util.inspect(a, false, null));
    reporte[0] = [a.nombrereporte, a.descripcion,now,now,"Abierto",a.categoria,operador,0];
    reporte[1] = [0, a.correo, a.nombre, a.telefono, a.telefono2, "{}", a.fechaentrega];
    console.log(util.inspect(reporte, false, null));
    reporteLcal.save(reporte,function (err, data) {
        if (!err){
            console.log(data)
            //res.status(200).json(data);
            res.redirect('reporte_local/'+data)

        }
    });
});




module.exports = router;