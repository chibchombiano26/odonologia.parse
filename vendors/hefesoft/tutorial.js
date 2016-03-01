/*global hefesoft, introJs*/

var hefesoft = hefesoft;
hefesoft.tutorial = {};

hefesoft.tutorial.inicializar = function(state) {

    var lang = hefesoft.languaje();
    if (lang.startsWith("es")) {
        
        introJs()
            .setOptions({
                'nextLabel': 'Siguiente',
                'prevLabel': 'Anterior',
                'skipLabel': 'Saltar',
                'doneLabel': "Listo",
                'skipLabel': 'Salir'
            })
            .goToStep(state)
            .oncomplete(function(e) {

            }).onexit(function(e) {

            }).onchange(function(sender, e) {


            }).onbeforechange(function(sender, e) {

            }).start(); // Start!

    }
    else {

        introJs()
            .goToStep(state)
            .oncomplete(function(e) {

            }).onexit(function(e) {

            }).onchange(function(sender, e) {


            }).onbeforechange(function(sender, e) {

            }).start(); // Start!
    }



}
