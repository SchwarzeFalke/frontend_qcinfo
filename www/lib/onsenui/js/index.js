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
                // A, 216787671, CARLOS % 20 ADONIS % 20 VARA % 20 PEREZ, CUCEI, COM
                var userType = data[0];
                var name = data[2];
                var center = data[3];
                var career = data[4];
                var queryString = "?name=" + name + "&center=" + center + "&career=" + career;
                if (userType == 'A') {
                    window.location = "userView.html" + queryString;
                } else if (userType == 'T') {

                    //A, 216787671, CARLOS % 20 ADONIS % 20 VARA % 20 PEREZ, CUCEI, COM
                    //window.location.href = "home.html?somval=" + this.responseText;

                }
            }

        }
    }

    request.send(`codigo=${document.getElementById('codigo').value}&nip=${document.getElementById('nip').value}`);
}