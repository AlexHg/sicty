router.get('/report-submit', function(req, res, next) {
    auth.mach(req,res,function (req,res) {
        reporteLcal.getAll(function (err, data) {
            if (!err){
                //Recibe datos del wizard
                //res.render('report_history',{title: 'Sicty report system',datos:data,user:req.session.nombre});
            }
        });
    });
});