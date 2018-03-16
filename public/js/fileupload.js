/**
 * Created by Juan Carlos on 16/03/2018.
 */


var myDropzone = new Dropzone("#formARchivos", { url: "/reporte_local/files/#{data.info.idreporte}"});
var myDropzoneComentario = new Dropzone("#formARchivosComentario", { url: "/reporte_local/files/#{data.info.idreporte}"});
myDropzone.on("success", function (file) {
    console.log(file);
    myDropzone.removeFile(file);
    //alert("asd");
    new PNotify({
        title: 'Archivo Subido Correctamente',
        text: 'Tu archivo '+file.name+ ' se subio correctamente',
        type: 'success',
        styling: 'bootstrap3'
    });
});
