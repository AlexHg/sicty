/**
 * Created by Charly on 10/03/2017.
 */
console.log("Hlla");
var socket = io('//'+document.location.hostname+':'+document.location.port);
socket.on('savs', function (data) {
    console.log("AddUser");
    //console.log(data);
});

socket.on('getAll', function (data) {
    console.log("GetALL");
    //console.log(data);
});


socket.on('byID', function (data) {
    console.log("byID");
    //console.log(data);
});

socket.on('delete', function (data) {
    console.log("delete");
    //console.log(data);
});