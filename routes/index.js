

/**
 * Created by Charly on 10/03/2017.
 */
var express = require('express');
var router = express.Router();
var usuario = require('../models/UserModel')
var reporteLcal = require('../models/Reportes_LocalModel');
var reporteEmpresa = require('../models/Reporte_EmpresaModel');7
var comentarioModel = require('../models/Comentario');
var Notas = require('../models/NotaModel');
var Archivos = require('../models/Archivo_Mensaje');
/* GET home page. */
router.get('/', function(req, res, next) {
 // console.log(req.session);
  res.render('login');
});

router.get('/app', function(req, res, next) {
  if(req.session.nombre != null){
    console.log(req.session);
    res.render('demo', { title: 'Sicty report system',user:req.session.nombre });
  }else{
    res.redirect('/')
  }

});

router.get('/new-report', function(req, res, next) {
    if(req.session.nombre != null){
        console.log(req.session);
        res.render('new_report', { title: 'Sicty report system',user:req.session.nombre });
    }else{
        res.redirect('/')
    }

});

router.get('/report', function(req, res, next) {
    if(req.session.nombre != null){
        console.log(req.session);
        res.render('report', { title: 'Sicty report system',user:req.session.nombre });
    }else{
        res.redirect('/')
    }

});


router.post('/login', function(req, res, next) {
  console.log(req.body)
  usuario.login([req.body.username, req.body.pass],function (err, data,login) {
    if (!err){
      if(login){
        req.session.nombre = data[0];
        res.redirect('/app')
      }
      else {
        res.render('login',{user:req.body.username, pass : req.body.pass });
      }
    }
  });
});


router.get('/logout', function(req, res, next) {
  console.log(req.body.nombre)
  req.session.destroy(function (e) {
    res.redirect('/')
  });

});




router.get('/user/:id', function(req, res, next) {
  //console.log(req.body)
  usuario.findById(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});


router.post('/user', function(req, res, next) {
  var UserArray = [req.body.correo,req.body.nombre,req.body.rol,req.body.contra]
  usuario.save(UserArray,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/user/', function(req, res, next) {
  //console.log(req.body)
  usuario.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.post('/user/:id', function(req, res, next) {
  var UserArray = [req.body.valor,req.params.id]
  console.log(UserArray)
  usuario.cambiarPassword(UserArray,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }else{
      res.status(400).json(data);
    }
  });
});



router.get('/reportes/', function(req, res, next) {
  console.log(req.session.nombre)
  reporteLcal.getAll(function (err, data) {
    if (!err){
      res.render('tablareportes',{datos:data,user:req.session.nombre});
    }
  });
});


router.get('/reporte_local/', function(req, res, next) {
  //console.log(req.body)
  reporteLcal.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/reporte_local/:id', function(req, res, next) {
  //console.log(req.body)
  reporteLcal.findById(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.post('/reporte_local', function(req, res, next) {
  var reporte = [],a=req.body;
  reporte[0] = [a.fecha,a.fecha,1,a.cat,a.operador,0];
  reporte[1] = [0,a.correo,a.nombre,a.tel,a.tel2,a.props];
  reporteLcal.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      //res.status(200).json(data);
      res.redirect('reporte_local/'+data)

    }
  });
});

router.post('/reporte_empresa', function(req, res, next) {
  console.log(req.body.fecha)
  var reporte = [],a=req.body;
  reporte[0] = [a.fecha,a.fecha,1,a.cat,a.operador,0];
  reporte[1] = [0,a.empresa];
  reporteEmpresa.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      res.status(200).json(data);
    }
  });
});

router.get('/reporte_empresa/', function(req, res, next) {
  //console.log(req.body)
  reporteEmpresa.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/reporte_empresa/:id', function(req, res, next) {
  //console.log(req.body)
  reporteEmpresa.findById(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});


router.post('/comentario', function(req, res, next) {
  var reporte = [],a=req.body;
  reporte[0] = [a.reporte,a.fecha,a.body];
  reporte[1] = [0,a.user];
  comentarioModel.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      res.status(200).json(data);
    }
  });
});

router.get('/comentario/', function(req, res, next) {
  //console.log(req.body)
  comentarioModel.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/comentario/:id', function(req, res, next) {
  //console.log(req.body)
  comentarioModel.findByReporte(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});



router.post('/notas', function(req, res, next) {
  var reporte = [],a=req.body;
  reporte[0] = [a.reporte,a.fecha,a.body];
  reporte[1] = [0,a.user];
  Notas.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      res.status(200).json(data);
    }
  });
});

router.get('/notas/', function(req, res, next) {
  //console.log(req.body)
  Notas.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/notas/:id', function(req, res, next) {
  //console.log(req.body)
  Notas.findByReporte(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.post('/archivo', function(req, res, next) {
  var a=req.body,reporte = [a.file,a.reporte];
  Archivos.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      res.status(200).json(data);
    }
  });
});

router.get('/archivo/', function(req, res, next) {
  //console.log(req.body)
  Archivos.getAll(function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});

router.get('/archivo/:id', function(req, res, next) {
  //console.log(req.body)
  Archivos.findByReporte(req.params.id,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }
  });
});






module.exports = router;