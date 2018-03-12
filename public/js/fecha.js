/**
 * Created by Juan Carlos on 11/03/2018.
 */

corrigeFecha(document.getElementById("fec1"));
corrigeFecha(document.getElementById("fec2"));

function corrigeFecha(a) {
    var fecha = new Date(a.innerHTML);
    a.innerHTML = fecha.toLocaleString('en-GB', { timeZone: 'UTC' });
}

