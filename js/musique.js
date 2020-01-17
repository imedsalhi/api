function affichertout() {

    fetch('http://jihane.fr/dwmg2/api/music/liste.php')
        .then(function(response) { return response.json() })
        .then(function(data) {
            var Parent = document.getElementById("tbody");
            data.forEach(element => {
                console.log(element);
                var tr = document.createElement("tr");
                var tdnom = document.createElement("td");
                var tdart = document.createElement("td");
                var tdbutton = document.createElement("td");
                var button = document.createElement("button");
                tdnom.innerText = element["Titres"];
                tdart.innerText = element["Artistes"];
                button.setAttribute("class", "btn btn-success");
                button.innerHTML = "afficher";
                button.addEventListener("click", function() {
                    music_detail(element);
                });

                tr.appendChild(tdnom);
                tr.appendChild(tdart);
                tr.appendChild(button);

                Parent.appendChild(tr);
            });
        })
        .catch(function(error) { alert("Erreur : " + error); })
}
affichertout();

function music_detail(element) {

    $("#exampleModalScrollable").modal("show");
    document.getElementById("id").value = element["id"];
    document.getElementById("titre").value = element["Titres"];
    document.getElementById("genre").value = element["Genres"];
    document.getElementById("artiste").value = element["Artistes"];
    document.getElementById("date").value = element["Dates"];
    document.getElementById("temps").value = element["Temps"]
}

function supprime() {


    fetch('http://jihane.fr/dwmg2/api/music/delete.php?id=' + document.getElementById("id").value)
        .then(function(response) { return response.json() })
        .then(function(data) {

        })
        // .catch(function(error) { alert("Erreur : " + error); })
}

function miseajour() {
    //update.php?id=3&Titres=Happy&Genres=Pop&Artistes=Bruno%20Mars&Dates=02/2019&Temps=3:50
    var url = 'http://jihane.fr/dwmg2/api/music/update.php?id=' + document.getElementById("id").value + '&Genres=' + document.getElementById("genre").value + '&Artistes=' + document.getElementById("artiste").value + '&Dates=' + document.getElementById("date").value + '&Temps=' + document.getElementById("temps").value;
    alert(url);
    fetch(url)
        .then(function(response) { return response.json() })
        .then(function(data) {
            alert(data);

        })

}

function a() {
    $("#exampleModalScrollable2").modal("show");
}

function ajouter() {
    alert(document.getElementById("titrea").value);
    // var FormData = require('form-data');
    // var fs = require('fs');
    var form = new FormData();
    form.append('Titres', document.getElementById("titrea").value);
    form.append('Genres', document.getElementById("genrea").value);
    form.append('Dates', document.getElementById("datea").value);
    form.append('Temps', document.getElementById("tempsa").value);
    form.append('Artistes', document.getElementById("artistea").value);
    console.log(form);
    fetch('http://jihane.fr/dwmg2/api/music/create.php?', {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },

            body: form
        })
        .then(function(response) { return response.json() })
        .then(function(data) {
            alert(data);

        })

}