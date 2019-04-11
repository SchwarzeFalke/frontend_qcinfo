var send = function () {
    var params = {
        "codigo": document.getElementById('codigo').value,
        "nip": document.getElementById('nip').value,
    };
    request = new XMLHttpRequest();
    request.open("POST", "https://dcc.000webhostapp.com/pruebaLogin.php", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == '0')
                document.getElementById('error').innerHTML = "¡Código o NIP incorrecto!";
            else
                window.location.href = "index.html"
        }
    }

    request.send(`codigo=${document.getElementById('codigo').value}&nip=${document.getElementById('nip').value}`);
}