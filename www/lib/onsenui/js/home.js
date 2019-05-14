ons.bootstrap();

var userData = {
    "name": null,
    "center": null,
    "career": null,
};

//Trae los datos del login mediante una URL y cuando home.html carga,
//almacena los datos en un JSON
document.addEventListener("DOMContentLoaded", function (event) {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    userData["name"] = queries[0].replace('name=', '');
    userData["center"] = queries[1].replace('center=', '');
    userData["career"] = queries[2].replace('career=', '');
    console.log(userData);
});

window.fn = {};

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

//Para poder modificar los datos de la página, se debe esperar a que esta y todos sus elementos carguen,
//ya que JavaScript es un lenguaje asíncrono, hay código que puede ejecutarse antes que otro
//por ello se usa la función then() para cuando se termine de ejecutar algo, prosiga con lo otro
window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    //Se carga la página, entonces posteriormente revisa si es el perfil o el inicio, para cargar información
    content.load(page)
        .then((() => {
            menu.close.bind(menu);
            if (page == "home.html") {
                loadNewsFeed();
            } else if (page == "profile.html") {
                loadProfileInfo();
            }
        }));

};

loadNewsFeed = function () {

};

loadProfileInfo = function () {
    document.getElementById("userName").innerHTML = userData.name;
    document.getElementById("userCenter").innerHTML = userData.center;
    document.getElementById("userCareer").innerHTML = userData.career;
};

//Esta funcion debe ser modificada para enviar reportes, este es el mismo código para hacer login
sendReport() = function () {
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
};