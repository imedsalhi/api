//depends on choice we send a get request to db to order activities 
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
// get data to show from db 
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
welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=all"); // first call when open index
//to show list of activities on home page
function charger(data) {


    data.forEach(element => {
            console.log(element);
            var l = $("<tr></tr>");
            var nom = $("<td></td>").text(element["nom"]);
            var type = $("<td></td>").text(element["type"]);
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
    // show activity details in modal each time it is called
function modal_affiche(donnee) {

    $("#id").val(donnee["id"]);
    $("#nom").val(donnee["nom"]);
    $('#type').val(donnee["type"]);
    $('#access').val(donnee["accessibilite"]);
    $('#nbr').val(donnee["nb_participants"]);
    $('#prix').val(donnee["prix"]);


}
// event on delete button
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
//events on buttons
$("#modifier").on("click", function() {

    modifier();
});
$("#ajouter").on("click", function() {

    ajouter();
});
// modify an activity
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

}
// add activity to the db
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

                $("#modalaj").modal("hide");
                welcome("http://jihane.fr/dwmg2/api/activite/index.php?action=display&type=all");
            },
            method: 'POST',
            dataType: "json"
        })
    });


}
// select the value of scroll list to order
$(document).ready(function() {
    $("select").change(function() {
        var choix = $(this).children("option:selected").val();
        afficher(choix);


    });

});