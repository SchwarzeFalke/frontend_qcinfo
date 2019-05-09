var qsParm = new Array();
var parms = '';

function qs() {
    var query = window.location.search.substring(1);
    parms = query.split(',');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            qsParm[key] = val;
        }
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    qs();
    window.fn = {};
    window.fn.showTemplateDialog = function () {
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
    };

    window.fn.hideDialog = function (id) {
        document
            .getElementById(id)
            .hide();
        document.getElementById('subject').value = '';
        document.getElementById('about').value = '';
        document.getElementById("profileName").innerHTML = parms[2];
    };

    window.fn.sendReport = function () {
        var params = {
            "codigo": document.getElementById('codigo').value,
            "nip": document.getElementById('nip').value,
        };
        request = new XMLHttpRequest();
        request.open("POST", "https://dcc.000webhostapp.com/sendReport.php", true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == '0')
                    document.getElementById('error').innerHTML = "¡Código o NIP incorrecto!";
                else
                    window.location.href = "home.html"
            }
        }

        request.send(`codigo=${document.getElementById('codigo').value}&nip=${document.getElementById('nip').value}`);
    }

    document.addEventListener('prechange', function (event) {
        var label = event.tabItem.getAttribute('label');
        if (label == "Perfil") {
            document.querySelector('#myNavigator').pushPage('profile.html');
            document.querySelector('ons-toolbar .center')
                .innerHTML = label;
        }

    });

    document.addEventListener('postchange', function (event) {
        var label = event.tabItem.getAttribute('label');
        if (label == "Inicio") {
            document.querySelector('#myNavigator').pushPage('feed.html');
            document.querySelector('ons-toolbar .center')
                .innerHTML = label;
        }
    });
});