/* global hefesoft, materialAdmin, Parse, angular, gapi */

materialAdmin.controller('preloadCtrl', function($scope, $ocLazyLoad, cfpLoadingBar, $state, $timeout, $q, $http, hefesoft_util_service, $translate){
    
    hefesoft.util["loadingBar"] = cfpLoadingBar;
    
    var intro = [
        "vendors/bower_components/intro.js/intro.js",
        "vendors/hefesoft/tutorial.js"
    ]
    
    var temp = [
        "js/hefesoft/imagenes/imagenesFb.js",
        "vendors/hefesoft/fb/services/fbHefesoft.js",
        "vendors/bower_components/html2canvas/build/html2canvas.min.js",
        "vendors/hefesoft/google/services/drive.upload.js",
        "vendors/hefesoft/google/services/youtube.js",
        "js/hefesoft/videos/videos.js",
        "js/hefesoft/citas/services/citas.js",
        "js/hefesoft/pacientes/controllers/listado.js",
        "js/hefesoft/pacientes/services/pacientes.js",
        "js/hefesoft/Diagnosticos/services/diagnosticos.js",
        "vendors/hefesoft/Globales/Variables.js"
        /*"vendors/bower_components/angular-sanitize/angular-sanitize.min.js"*/
    ]
    
    var odontologiaApp = [
        "js/hefesoft/procedimientos/servicios/procedimientos.js",
        "js/hefesoft/Prestador/sevice/prestador.js",
        "js/hefesoft/help/helperModalController.js",
        "vendors/hefesoft/google/directivas/signUp/directive/directive.js",
        "js/hefesoft/modal/services.js",
        "js/hefesoft/Noticias/Directivas/directive/fbPageNews.js"
    ]
    
    var templates = [
        "js/modules/template.js",
        "js/modules/ui.js",
        "js/modules/charts/flot.js",
        "js/modules/charts/other-charts.js",
        "js/modules/form.js",
        "js/modules/media.js",
        "js/modules/components.js",
        "js/modules/calendar.js",
        "js/modules/demo.js",
        "js/templates.js",
        "js/controllers/ui-bootstrap.js",
        "js/controllers/table.js",
        "js/controllers/common.js",
        "js/controllers/profile.js"
    ]
    
    var vendorHefesoft = [
        "vendors/hefesoft/util/array.js",
        "vendors/hefesoft/util/dependencies.js",
        "vendors/hefesoft/util/angular.extend.js",
        "vendors/hefesoft/parse/services/parse.js",
    ]
    
    var lazyArrayVendors = [
        
        "vendors/bower_components/flot/jquery.flot.js",
        "vendors/bower_components/flot.curvedlines/curvedLines.js",
        "vendors/bower_components/flot/jquery.flot.resize.js",
        "vendors/bower_components/flot-orderBars/js/jquery.flot.orderBars.js",
        "vendors/bower_components/flot/jquery.flot.pie.js",
        "vendors/bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js",
        "vendors/bootstrap-growl/bootstrap-growl.min.js",
        "vendors/bower_components/lodash/dist/lodash.min.js",
        "vendors/bower_components/ng-imgur/dist/ng-imgur.js",
        "vendors/bower_components/chance/dist/chance.min.js",
        "vendors/bower_components/Waves/dist/waves.min.js",
        "vendors/bower_components/jquery.nicescroll/jquery.nicescroll.min.js",
        "vendors/bower_components/Read-More/js/directives/readmore.js",
        "vendors/bower_components/angular-nouislider/src/nouislider.min.js",
        "vendors/bower_components/simple-angular-file-input/dist/angular-file-input.js",
        "vendors/bower_components/ng-table/dist/ng-table.min.js",
        "vendors/bower_components/simple-angular-file-input/dist/angular-file-input.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.6/jstz.min.js",
        "vendors/bower_components/fullcalendar/dist/fullcalendar.min.js",
        "vendors/bower_components/twix/dist/twix.min.js",
        "vendors/input-mask/input-mask.min.js",
        "vendors/bower_components/angular-directive.g-signin/google-plus-signin.js",
        "vendors/hefesoft/google/services/auth.js",
        "//cdn.pubnub.com/pubnub.min.js",
        "//pubnub.github.io/angular-js/scripts/pubnub-angular.js",
        "vendors/hefesoft/pubnub/services/pubnub.js",
        "//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/annyang/2.0.0/annyang.min.js",
        "vendors/hefesoft/speech/speech.js",
        "vendors/hefesoft/google/appscripts/services/template.js",
        "vendors/hefesoft/google/services/calendar.js"
        
    ]
    
    var modulos = [
    'ngTable',
    'hefesoft.google',
    'directive.g+signin',
    "pubnub.angular.service",
    'hefesoft.pubnub',
    'odontologiaApp',
    'esanum',
    'directivas',
    'Global',
    'fixes',
    'azure',
    'Util',
    'providers',
    'Historia',
    'Hefesoft',
    'hefesoft.services',
    'Shared',
    ]
    
    function lazyDentilineVendors(){
        return $ocLazyLoad.load(
            [
            "vendors/hefesoft/util/utilVars.js", 
            "vendors/bower_components/bootstrap-sweetalert/lib/sweet-alert.css",
            "css/hefesoft.css",
            "css/demo.css",
            "vendors/bower_components/intro.js/minified/introjs.min.css",
            "vendors/bower_components/intro.js/minified/introjs-rtl.min.css",
            "vendors/bower_components/bootstrap-sweetalert/lib/sweet-alert.min.js"
            ]);
    }
    
    function lazyLoadLibraries() {
        return $ocLazyLoad.load([{
            files: intro,
            cache: true
        }, {
            files: temp,
            cache: true
        },{
            files: vendorHefesoft,
            cache: true
        },
        {
            name: "materialAdmin",
            files: templates,
            cache: true
        }, {
            name: "odontologiaApp",
            files: odontologiaApp,
            cache: true
        }]);
    }
    
    function lazyLoadVendors(){
        
        return $ocLazyLoad.load([{
            serie : true,
            files: lazyArrayVendors,
            cache: true
        }]);
         
    }
    
    function navegar() {
        $timeout(function() {
            $ocLazyLoad.getModules();
            $state.go("login");
        }, 1000);
    }
    
    function injectDependencies(){
        $ocLazyLoad.inject(modulos);
    }
    
    (function datosCuriosos(){
        var lang = hefesoft_util_service.languaje();
        var urlToload = "";
        
        if(lang.startsWith("es")){
            urlToload = "js/hefesoft/json/datosCuriosos.json";
        }
        else{
            urlToload = "js/hefesoft/json/datosCuriosos_en.json";
        }
        
        $http.get(urlToload).then(function(data){
            var items = data.data;
            var item = items[Math.floor(Math.random()*items.length)];
            
            $('#datoCurioso').text($translate.instant("DID_YOU_KNOW") + item.valor);
        })
    }());
    
    (function inicializarElementos(){
        $q.all([lazyLoadLibraries(), lazyDentilineVendors(), lazyLoadVendors()]).then(function(data){
            injectDependencies();
            navegar();
        });
    }());
    
});
      