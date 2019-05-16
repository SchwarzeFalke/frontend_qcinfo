ons.bootstrap();

window.fn = {};
window.fn.hideDialog = function (id) {
    document
        .getElementById(id)
        .hide();
};

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
            if (this.responseText == '0') {
                var dialog = document.getElementById('error-dialog');

                if (dialog) {
                    dialog.show();
                } else {
                    ons.createElement('dialog.html', {
                            append: true
                        })
                        .then(function (dialog) {
                            dialog.show();
                        });
                }
            } else {
                var data = this.responseText.split(',');
                var userType = data[0];
                var code = data[1];
                var name = data[2];
                var center = data[3];
                var career = data[4];
                var queryString = "?code=" + code + "&name=" + name + "&center=" + center + "&career=" + career;

                if (userType == 'A') {
                    var userQuery = "?userCode=" + code + "&name=" + name + "&career=" +
                        career + "&privileges=" + "0";

                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log(this.responseText);
                            window.location = "userView.html" + queryString;
                        }
                    };
                    xhttp.open("GET", "https://qcinfo.000webhostapp.com/createUser.php" + userQuery, true);
                    xhttp.send();
                } else if (userType == 'T') {
                    var userQuery = "?userCode=" + code + "&name=" + name + "&career=" +
                        career + "&privileges=" + "1";

                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            window.location = "userView.html" + queryString;
                        }
                    };
                    xhttp.open("GET", "https://qcinfo.000webhostapp.com/createUser.php" + userQuery, true);
                    xhttp.send();
                    //A, 216787671, CARLOS % 20 ADONIS % 20 VARA % 20 PEREZ, CUCEI, COM
                    //window.location.href = "home.html?somval=" + this.responseText;

                }
            }

        }
    }

    request.send(`codigo=${params.codigo}&nip=${params.nip}`);
}