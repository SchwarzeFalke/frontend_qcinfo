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
                var dialog = document.getElementById('my-dialog');

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
                console.log(this.responseText);
                //A, 216787671, CARLOS % 20 ADONIS % 20 VARA % 20 PEREZ, CUCEI, COM
                window.location.href = "home.html?somval=" + this.responseText;
            }

        }
    }

    request.send(`codigo=${document.getElementById('codigo').value}&nip=${document.getElementById('nip').value}`);
}