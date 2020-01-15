function afficher(choix) {
    switch (choix) {
        case "all":
            welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=all");

            break;
        case "prix":
            welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=order&orderby=price");

            break;
        case "access":
            welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=order&orderby=access");
            break;
        case "nb_participant":
            welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=order&orderby=nb_par");
            break;

    }

}

function welcome(adresse) {


    $("tbody").empty();

    $.get({
        url: adresse,
        data: {

        },
        success: function(data) { charger(data); },
        dataType: "json"
    })
}
welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=all");

function charger(data) {


    data.forEach(element => {
            var l = $("<tr></tr>");
            var nom = $("<td></td>").text(element[5]);
            var type = $("<td></td>").text(element[1]);
            var bouton = $("<button></button>").text("afficher");
            bouton.addClass("btn btn-success");
            bouton.click(function() {

                $("#exampleModalScrollable").modal("show");
                modal_affiche(element);

            });
            l.append(nom);
            l.append(type);
            l.append(bouton);
            $("tbody").append(l);
        }

    );



}
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus')
})

function modal_affiche(donnee) {
    $("#id").val(donnee[0]);
    $("#nom").val(donnee[5]);
    $('#type').val(donnee[1]);
    $('#access').val(donnee[4]);
    $('#nbr').val(donnee[2]);
    $('#prix').val(donnee[3]);


}

$("#supprimer").on("click", function() {

    var rl = "http://jihane.fr/dwmg2/api/activite/index.php?action=delete&id=" + $("#id").val();

    $.ajax({
        url: rl,
        data: {

        },
        success: function(data) {
            var ms = $("<p></p>").text(data);
            $("#mf").append(ms);
        },
        dataType: "json"
    })

});
$("#modifier").on("click", function() {

    modifier();
});
$("#ajouter").on("click", function() {

    ajouter();
});

function modifier() {
    var rl = "http://jihane.fr/dwmg2/api/activite/index.php?action=update&type=" + $("#type").val() + "&nb_participants=" + $("#nbr").val() + "&prix=" + $("#prix").val() + "&accessibilite=" + $("#access").val() + "&nom=" + $("#nom").val() + "&id=" + $("#id").val();

    $.ajax({
            url: rl,
            data: {

            },
            success: function(data) {
                var ms = $("<p></p>").text(data);
                ms.css("color", "red");
                $("#exampleModalScrollableTitle").append(ms);
            },
            dataType: "json"
        })
        // document.location.reload(true);
}

function ajouter() {
    $("#modalaj").modal("show");
    $("#save").on("click", function() {

        var rl = "http://jihane.fr/dwmg2/api/activite/index.php?action=add";
        console.log($("#mtype").val());
        console.log($("#mnbr").val());
        console.log($("#mprix").val());
        console.log($("#maccess").val());
        console.log($("#mnom").val());
        $.ajax({
            url: rl,
            data: {
                type: $("#mtype").val(),
                nb_participants: $("#mnbr").val(),
                prix: $("#mprix").val(),
                accessibilite: $("#maccess").val(),
                nom: $("#mnom").val()

            },
            success: function(data) {
                alert(data);
            },
            method: 'POST',
            dataType: "json"
        })
    });


}
$(document).ready(function() {
    $("select").change(function() {
        var choix = $(this).children("option:selected").val();
        afficher(choix);

    });

});