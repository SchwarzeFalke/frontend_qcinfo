ons.bootstrap();
window.fn = {};

var userData = {
    "code": null,
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
    userData["code"] = queries[0].replace('code=', '');
    userData["name"] = queries[1].replace('name=', '');
    userData["center"] = queries[2].replace('center=', '');
    userData["career"] = queries[3].replace('career=', '');

    loadNewsFeed();
});


window.fn.hideDialog = function (id) {
    document
        .getElementById(id)
        .hide();
};

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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var reportArray = JSON.parse(this.responseText);
            for (let i = 0; i < reportArray.length; i++) {
                var subject = document.createTextNode(reportArray[i].asunto);
                var about = document.createTextNode(reportArray[i].contenido);
                var type = reportArray[i].urgencia;
                var date = reportArray[i].fecha;

                var card = document.createElement("ons-card");

                var cardTitle = document.createElement("h2");
                cardTitle.appendChild(subject);

                var cardContent = document.createElement("p");
                cardContent.appendChild(about);

                card.appendChild(cardTitle);
                card.appendChild(cardContent);

                var element = document.getElementById("reportData");
                element.appendChild(card);
            }
        }
    };
    xhttp.open("GET", "https://qcinfo.000webhostapp.com/retrieveAvisos.php", true);
    xhttp.send();
};

loadProfileInfo = function () {
    document.getElementById("userName").innerHTML = userData.name;
    document.getElementById("userCenter").innerHTML = userData.center;
    document.getElementById("userCareer").innerHTML = userData.career;
};

//Esta funcion debe ser modificada para enviar reportes, este es el mismo código para hacer login
sendAnuncio = function () {
    if (document.getElementById("reportType").value == "" || document.getElementById("reportSubject").value == "" ||
        document.getElementById("reportDescription").value == "") {

        var dialog = document.getElementById('report-dialog');
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
        var data = {
            "userCode": userData.code,
            "subject": document.getElementById("reportSubject").value,
            "content": document.getElementById("reportDescription").value,
            "type": document.getElementById("reportType").value,
        };
        var query = "?userCode=" + data.userCode + "&subject=" + data.subject + "&content=" + data.content + "&type=" + data.type;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ons.notification.alert(this.responseText);
            }
        };
        xhttp.open("GET", "https://qcinfo.000webhostapp.com/sendAviso.php" + query, true);
        xhttp.send();
    }
    // var code = document.getElementById("code").value;
    // 
};