

/**
 * Created by Charly on 10/03/2017.
 */
var express = require('express');
var router = express.Router();
var usuario = require('../models/UserModel')
var reporteLcal = require('../models/Reportes_LocalModel')
/* GET home page. */
router.get('/', function(req, res, next) {
 // console.log(req.session);
  res.render('login');
});

router.get('/app', function(req, res, next) {
  if(req.session.nombre != null){
    console.log(req.session);
    res.render('app', { title: 'Express',user:req.session.nombre });
  }else{
    res.redirect('/')
  }

});


router.post('/login', function(req, res, next) {
  //console.log(req.body)
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


router.post('/logout', function(req, res, next) {
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
  usuario.update(UserArray,function (err, data) {
    if (!err){
      res.status(200).json(data);
    }else{
      res.status(400).json(data);
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
  reporte[0] = [a.fechini,a.fechmod,1,a.cat,a.operador,0];
  reporte[1] = [0,a.correo,a.nombre,a.tel,a.tel2,a.props];
  reporteLcal.save(reporte,function (err, data) {
    if (!err){
      console.log(data)
      res.status(200).json(data);
    }
  });
});













module.exports = router;