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
var Archivos = require('../models/Archivo_Mensaje');
var path = require('path');


var reporteLcal = require('../models/Reportes_LocalModel');
var comentarioModel = require('../models/Comentario');
var auth = require('../funciones/authentication');
var file = require('../models/Archivo_Mensaje');
var fileUser = require('../models/Archivo_MensajeUser');



router.get('/', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        reporteLcal.getAll(function (err, data) {
            if (!err){
                res.render('report_history',{title: 'Sicty report system',datos:data,user:req.session.nombre});
            }
        });
    });
});



router.get('/:id', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        var datos ={};
        var id = req.params.id;
        reporteLcal.findById(id,function (err, data) {
            if (!err){

                datos.info = data[0];
                console.log("esto->>>"+  datos.info.propiedades);
                if(datos.info.propiedades != null) {
                    datos.propiedades = datos.info.propiedades.split(',');
                    console.log(datos.info.propiedades)
                }else{
                        datos.propiedades = [];
                }


                comentarioModel.clientefindByReporteAux(id,function (errC,dataC) {
                    if(!errC){
                        datos.comentariosC = dataC;

                        comentarioModel.usariofindByReporteAux(id,function (errU,dataU) {
                            if(!errU){
                                datos.comentariosU = dataU;
                                //
                                // res.status(200).json(datos);
                                Archivos.findByReporteU(id,function (e,d) {
                                    datos.fiAdd = d;
                                    console.log(datos);
                                    res.render('report',{title: 'Sicty report system', data:datos, user:req.session.nombre});
                                });

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

    //console.log(now);
    //console.log(util.inspect(a, false, null));
    //console.log(req.body)
    console.log(req)
    reporte[0] = ["Reporte Local", a.descripcion,now,now,"Abierto",a.categoria,operador,0];
    reporte[1] = [0, a.correo, a.nombre, a.telefono, a.telefono2, a.prop, a.fechaentrega];
    //console.log(util.inspect(reporte, false, null));
    reporteLcal.save(reporte,function (err, data) {
        if (!err){
            //console.log(data)
            //res.status(200).json(data);
            res.redirect('reporte_local/'+data)

        }
    });
});

/*router.post('/files/:id', urlencodedParser, function(req, res, next) {

    var archivo = req.files.file;
    console.log(archivo);
    var aux = archivo.mimetype.split('/');
    var reporte = [aux[1],req.params.id];
    console.log(reporte)
    var pth =  path.join(__dirname,'../files/perfil/');

    //res.send('File uploaded!');

    Archivos.save(reporte,function (err, data) {
        if (!err){
            console.log(data);
            var name = data+'.'+aux[1];
            var aux = '../files/perfil/'+ name;
            archivo.mv(aux , function(err) {
                if (err)
                     res.status(500).send(err);
                res.redirect('reporte_local/'+data)
            });
        }else{
            res.status(500).send("no");
        }
    });
});*/

router.post('/files/:id', function(req, res, next) {
    console.log("HOla")
    var archivo = req.files.file;
    var auxq = archivo.name.split('.');
    var reporte = [auxq[1],req.params.id,archivo.name];

    Archivos.saveReport(reporte,function (err, data) {
        if (!err){
            console.log(data);
            var name = data+'.'+auxq[1];
            var aux = 'files/'+ name;
            console.log(aux);
            archivo.mv(aux , function(err) {
                if (err)
                    res.status(500).send(err);
                res.send(''+data+'');
            });
        }
    });
});

router.post('/filescomentario/:id/:rep', function(req, res, next) {
    console.log(req.files);
    var archivo = req.files.file;
    var auxq = archivo.name.split('.');
    var reporte = [auxq[1],req.params.id,archivo.name];


    Archivos.saveComen(reporte,function (err, data) {
        if (!err){
            var name = data+'.'+auxq[1];
            var aux = 'files_c/'+ name;

            archivo.mv(aux , function(err) {
                if (err)
                    res.status(500).send(err);
                res.redirect('/reporte_local/'+req.params.rep+'#inputImage'+req.params.id)
            });

        }
        else{
            console.log("Error Aqui")
        }
    });
});


module.exports = router;