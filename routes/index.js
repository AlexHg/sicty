/**
 * Created by Charly on 10/03/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
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
  console.log(req.body)
  if(req.body.username == "Juan Carlos" && req.body.pass == "123"){
    req.session.nombre = req.body.username;
    res.redirect('/app')
  }else{
    res.render('login',{user:req.body.username, pass : req.body.pass });
  }



});


router.post('/logout', function(req, res, next) {
  console.log(req.body.nombre)
  req.session.destroy(function (e) {
    res.redirect('/')
  });


});

module.exports = router;
