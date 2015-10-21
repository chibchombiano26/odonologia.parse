

function dependenciasNews(){
    
    var dp = [
            /* Odontologos.com.co */
            'js/hefesoft/Noticias/Controllers/odontologos.com.co.js',
            'js/hefesoft/Noticias/Directivas/directive/odontologos.com.co.js',
            
            /* Fb page */
            'js/hefesoft/Noticias/Controllers/asociacionOdontologos.js',
            'js/hefesoft/Noticias/Directivas/directive/asociacionOdontologos.js',
            'vendors/hefesoft/fb/services/asociasionOdontologos.js',
            
            /* Import.io */
            'vendors/hefesoft/import.io/services/read.js',
            'vendors/hefesoft/Directivas/nhRef/nhref.js',
            
            /* lodash */
            'vendors/bower_components/lodash/lodash.min.js'
        ]
    return dp;
    
}


function dependenciasGalleryAppLevel(){
    var dp = [
            'vendors/bower_components/autosize/dist/autosize.min.js',
            'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
        ]
        
    return dp;
}

function dependenciasGalleryAppLevel(){
    var dp = [
            'vendors/bower_components/autosize/dist/autosize.min.js',
            'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
        ]
        
    return dp;
}

function dependenciasGallery(){
    var dp = [
                'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
            ]
        
    return dp;
}

function dependenciasPacientes(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        files: 
        [   
            "js/hefesoft/pacientes/services/inicializarListado.js",            
            "js/hefesoft/pacientes/controllers/listado.js",
            "js/hefesoft/pacientes/services/pacientes.js",
            "vendors/hefesoft/Fixes/fixes.js"     
        ]
    }

    return dependencias;
}

function dependenciasImagenes(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,        
        files: 
        [
            "vendors/hefesoft/services/convertToImage64.js"            
        ]
    }

    return dependencias;
}

function dependenciasPicker(){
    var dependencias = 
    {
        name : "hefesoft.google",
        cache: true,        
        files: 
        [   
            "vendors/hefesoft/google/services/drive.js",
            "vendors/hefesoft/google/directivas/picker/directiva/directiva.js",
            "vendors/hefesoft/google/directivas/picker/controller/picker.js",
            "vendors/hefesoft/google/services/picker.js"
        ]
    }

    return dependencias;
}

function dependenciasClinicas(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,        
        files: 
        [
            "js/hefesoft/Clinica/Controller/datosClinica.js"
        ]
    }

    return dependencias;
}

function dependenciasDiagnosticos(){
	var dependencias = 
	{
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "js/hefesoft/Diagnosticos/controllers/listado.js",
            "js/hefesoft/Diagnosticos/controllers/addDiagnostico.js",
            "js/hefesoft/Diagnosticos/directivas/directivas/list.js",
            "js/hefesoft/Diagnosticos/directivas/directivas/listNoHeader.js",
            "js/hefesoft/odontograma/directivas/superficies/filter/simbolo.js",
            "js/hefesoft/odontograma/directivas/superficies/filter/colorSuperficie.js",
            "vendors/farbtastic/farbtastic.css",
            "vendors/farbtastic/farbtastic.min.js",
            'vendors/bower_components/angular-farbtastic/angular-farbtastic.js',
            "js/hefesoft/tratamientos/directivas/wizardSimbolo/services/pasoVariables.js",
            'js/hefesoft/Diagnosticos/services/diagnosticos.js'
        ]
 	}

 	return dependencias;
}

function dependenciasWizard(){
	var wizard = 
	{
        name : "mgo-angular-wizard",
        cache: true,
        files: 
        [
            "vendors/bower_components/angular-wizard/dist/angular-wizard.min.js", 
            "vendors/bower_components/angular-wizard/dist/angular-wizard.min.css",
            "js/hefesoft/tratamientos/directivas/wizardSimbolo/controller/simbolo.js",
            "js/hefesoft/tratamientos/directivas/wizardSimbolo/controller/wizardSimbolo.js",
            "js/hefesoft/tratamientos/directivas/wizardSimbolo/directiva/simbolo.js",
            "js/hefesoft/tratamientos/directivas/wizardSimbolo/directiva/wizardSimbolo.js"
        ]
 	}

 	return wizard;
}

function dependenciasTratamientos(){
	var dependencias = 
	{
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "js/hefesoft/tratamientos/controllers/listadoTratamientos.js", 
            "js/hefesoft/tratamientos/controllers/addTratamiento.js",
            "js/hefesoft/tratamientos/directivas/listado.js",
            "js/hefesoft/tratamientos/services/extraerTratamientos.js"
        ]
 	}

 	return dependencias;
}

function dependenciasProcedimientos(){
	var dependencias = 
	{
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "js/hefesoft/procedimientos/controllers/addProcedimiento.js", 
            "js/hefesoft/procedimientos/controllers/listado.js",
            "js/hefesoft/procedimientos/directivas/listadoProcedimientos.js",
            "js/hefesoft/tratamientos/controllers/listadoTratamientosProcedimientos.js"
        ]
 	}

 	return dependencias;
}

function dependenciasUtil(){
	var dependencias = 
	{
        name : "Util",
        cache: true,
        files: 
        [
            "vendors/hefesoft/util/modal.js"
        ]
 	}

 	return dependencias;
}


function dependenciasFileInput(){
	var dependencias = 
	{
        name : "Util",
        cache: true,
        serie : true,
        files: 
        [
            "vendors/bower_components/bootstrap-fileinput/css/fileinput.min.css",
            "vendors/bower_components/bootstrap-fileinput/js/fileinput.min.js",
            "vendors/bower_components/bootstrap-fileinput/js/fileinput_locale_es.js",
            "vendors/hefesoft/Directivas/fileUpload/directivas/imageWidget.js",
            "vendors/hefesoft/Directivas/fileUpload/directivas/imageMultipleWidget.js",
            "vendors/hefesoft/upload/services/upload.js"
        ]
 	}

 	return dependencias;
}

function dependenciasOdontograma(){
	var dependencias = 
	{
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "js/hefesoft/odontograma/directivas/piezasDentales/filters/pezaDentalImage.js",
            "js/hefesoft/odontograma/services/diagnosticos/diagnosticos.js",
            "js/hefesoft/odontograma/directivas/piezaDental/directiva/directiva.js",
            "js/hefesoft/odontograma/directivas/piezasDentales/directiva/directiva.js",
            "js/hefesoft/odontograma/directivas/piezasDentales/services/piezasDentales.js",
            "js/hefesoft/odontograma/services/json/odontogramaBase.js",
            "js/hefesoft/odontograma/controllers/piezasDentales.js",
            "js/hefesoft/odontograma/controllers/odontograma.js",
            "js/hefesoft/odontograma/filter/textoDientePermanenteTemporal.js",
            "js/hefesoft/odontograma/directivas/superficies/directiva/superficie.js",
            "js/hefesoft/odontograma/directivas/superficies/controller/superficie.js",
            "js/hefesoft/odontograma/directivas/odontograma/directiva/odontograma.js",
            "js/hefesoft/odontograma/controllers/piezaDentalSeleccionada.js",
            "js/hefesoft/Diagnosticos/directivas/directivas/buscadorDiagnosticos.js",
            "js/hefesoft/odontograma/services/odontograma.js"
        ]
 	}

 	return dependencias;
}

function dependenciasAzure(){
    var dependencias = 
    {
        name : "azure",
        cache: true,
        files: 
        [
            "vendors/hefesoft/Azure/tableStorage.js",
            "vendors/hefesoft/Azure/imagesStorage.js",
            "vendors/hefesoft/Azure/push.js",
            "vendors/hefesoft/Azure/email.js",
            "vendors/hefesoft/Azure/blobStorage.js",
            "vendors/hefesoft/shared_keys/services/httpHelpers.js",
            "vendors/hefesoft/Azure/tableStorage.js",
            "vendors/hefesoft/Globales/urlServicio.js"
        ]
    }

    return dependencias;
}

function dependenciasCieCups(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        files: 
        [            
            "js/hefesoft/Diagnosticos/services/CieCups.js"         
        ]
    }

    return dependencias;
}


function dependenciasDiagnosticosPacientes(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        serie: true,
        files: 
        [            
            "js/hefesoft/historia/Odontologia/diagnosticosPaciente/controler/diagnosticosPaciente.js",
            "js/hefesoft/historia/Odontologia/diagnosticosPaciente/services/diagnosticosPacientes.js"
        ]
    }

    return dependencias;
}

function dependenciasHistoria(){
    var dependencias = 
    {
        name : "Historia",
        cache: true,        
        files: 
        [
            "js/hefesoft/historia/Odontologia/realizarOdontograma/controllers/realizarOdontograma.js"            
        ]
    }

    return dependencias;
}


function dependenciasFont(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "fonts/font.css"
        ]
    }

    return dependencias;
}


function dependenciasDrillDown(){
    var dependencias = 
    {
        name : "directivas",
        cache: true,        
        files: 
        [
            "vendors/hefesoft/Directivas/drillDown/controller/drillDownCtrl.js",
            "vendors/hefesoft/Directivas/drillDown/directive/directive.js"            
        ]
    }

    return dependencias;
}

function dependenciasStringFormat(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        serie: true,
        files: 
        [            
            "vendors/bower_components/ng-currency/dist/ng-currency.min.js"
        ]
    }

    return dependencias;
}

function dependenciasPlanTratamiento(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        files: 
        [
            "js/hefesoft/historia/Odontologia/planTratamiento/controller/planTratamiento.js",
            "js/hefesoft/historia/Odontologia/planTratamiento/directivas/directiva.js",
            "js/hefesoft/odontograma/directivas/piezasDentales/services/piezasDentales.js"
        ]
    }

    return dependencias;
}

function dependenciasPdf(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        serie: true,
        files: 
        [
            "vendors/bower_components/jspdf/dist/jspdf.debug.js",
            "vendors/bower_components/jspdf-autotable/dist/jspdf.plugin.autotable.js"
        ]
    }

    return dependencias;
}

function dependenciasPeriodontograma(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,        
        files: 
        [
            "js/hefesoft/historia/Odontologia/realizarPeriodontograma/controller/realizarPeriodontograma.js",
            "js/hefesoft/periodontograma/piezaDental/controller/periodontogramaPiezaDentalCtrl.js",
            "js/hefesoft/odontograma/directivas/piezasDentales/services/piezasDentales.js",
            "js/hefesoft/periodontograma/piezaDental/directive/piezaDental.js",
            "js/hefesoft/periodontograma/piezasDentales/controller/piezasDentales.js",
            "js/hefesoft/periodontograma/piezasDentales/directive/piezas_dentales.js",
            "js/hefesoft/periodontograma/piezasDentales/filters/implante.js",
            "js/hefesoft/periodontograma/piezaDental/directive/ngpoint.js",
            "js/hefesoft/periodontograma/piezasDentales/services/piezaDentalService.js",
            "js/hefesoft/periodontograma/services/periodontogramaParse.js"
        ]
    }

    return dependencias;
}


function dependenciasNoUiSlider(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        serie: true,        
        files: 
        [   
            'vendors/bower_components/nouislider/jquery.nouislider.css',
            'vendors/bower_components/chosen/chosen.min.css',
            'vendors/bower_components/nouislider/jquery.nouislider.min.js',
            'vendors/bower_components/chosen/chosen.jquery.js',
            'vendors/bower_components/angular-chosen-localytics/chosen.js'
        ]
    }

    return dependencias;
}

function dependenciasDate(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,
        serie: true,
        files: 
        [            
            "vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
            "vendors/hefesoft/Directivas/Date-Picker/Directiva/datePicker.js",
            "vendors/hefesoft/Directivas/Time-Picker/directiva/timePicker.js",
            'vendors/input-mask/input-mask.min.js',
            "js/modules/form.js"
        ]
    }

    return dependencias;
   }
   
   function dependenciasCalendar(){
    var dependencias = 
    {
        name : "hefesoft.google",
        cache: true,
        serie: true,
        files: 
        [   
            "vendors/bower_components/fullcalendar/dist/fullcalendar.min.css",
            "vendors/bower_components/fullcalendar/dist/fullcalendar.min.js",
            "vendors/bower_components/fullcalendar/dist/lang-all.js",
            "vendors/bower_components/fullcalendar/dist/gcal.js",
            "vendors/hefesoft/google/services/calendar.js",
            "vendors/hefesoft/Directivas/fullCalendar/directiva/calendar.js",
            "vendors/hefesoft/Directivas/nhRef/nhref.js"
        ]
    }

    return dependencias;
   }
   
   function dependenciasAgenda(){
    var dependencias = 
    {
        name : "odontologiaApp",
        cache: true,        
        files: 
        [            
            "js/hefesoft/Agenda/controller/agenda.js",
            "js/hefesoft/Agenda/services/agenta.helpers.js"
        ]
    }

    return dependencias;
   }
   
   function dependenciasCita(){
       var dependencias =
       {
          name: 'odontologiaApp',
          cache: true,
          files:
          [
              "js/hefesoft/citas/Controller/citas.js",
              //"js/hefesoft/citas/services/citas.js" //Esta puesta en el index
          ]
       }
       
       return dependencias;
   }
   
   function dependenciasEmail(){
       var dependencias =
       {
          name: 'odontologiaApp',
          cache: true,
          files:
          [
              "js/hefesoft/email/controller.js",
              "vendors/hefesoft/google/appscripts/services/email.js"
          ]
       }
       
       return dependencias;
   }




function cargarPacientes($ocLazyLoad){
      return $ocLazyLoad.load
      ([
        dependenciasPacientes(),
        /*dateDependencies(),
        azureDependencies(),
        authDependencies(),
        imageDependencies(),
        clinicaDependencies(),*/
      ]);
   }
   
   function pickerDependencias($ocLazyLoad){
      return $ocLazyLoad.load
      ([
          dependenciasImagenes(),
          dependenciasPicker(),
          
          /*
          clinicaDependencies(),
          azureDependencies(),
          authDependencies()
          */
      ]);
   }
   
   function cargarDiagnosticos($ocLazyLoad){
      return $ocLazyLoad.load
      ([
        dependenciasImagenes(),
        dependenciasClinicas(),
        dependenciasDiagnosticos(), 
        dependenciasWizard(), 
        dependenciasTratamientos(),
        dependenciasProcedimientos(),
        dependenciasUtil(),
        dependenciasFileInput(),
        dependenciasAzure(),
        dependenciasCieCups(),
        dependenciasFont(),
        dependenciasOdontograma(),
         /* Para pruebas
         authDependencies()
        */
      ]);
   }
   
   function cargarDiagnosticosPacientes($ocLazyLoad){
      return $ocLazyLoad.load
      ([
          dependenciasImagenes(),
          dependenciasClinicas(),
          dependenciasDiagnosticos(),
          dependenciasOdontograma(),
          dependenciasAzure(),
          dependenciasDrillDown(),
          dependenciasProcedimientos(),
          dependenciasHistoria(),
          dependenciasTratamientos(),
          dependenciasCieCups(),
          dependenciasDiagnosticosPacientes(),
      ]);
   }
   
   function cargarOdontograma($ocLazyLoad){
      return $ocLazyLoad.load
      ([
          dependenciasImagenes(),
          dependenciasClinicas(),
          dependenciasDiagnosticos(),
          dependenciasOdontograma(),
          dependenciasAzure(),
          dependenciasDrillDown(),
          dependenciasProcedimientos(),
          dependenciasHistoria(),
          dependenciasTratamientos(),
          dependenciasCieCups(),
          dependenciasFont()
      ]);
   }
   
   function cargarPlanTratamiento($ocLazyLoad){
      return $ocLazyLoad.load
      ([
          dependenciasImagenes(),
          dependenciasClinicas(),
          dependenciasDiagnosticos(),
          dependenciasOdontograma(),
          dependenciasAzure(),
          dependenciasProcedimientos(),
          dependenciasHistoria(),
          dependenciasTratamientos(),
          dependenciasCieCups(),
          dependenciasStringFormat(),
          dependenciasPlanTratamiento(),
          dependenciasPdf(),
      ]);
   }
   
   function cargarPeriodontograma($ocLazyLoad){
      return $ocLazyLoad.load
      ([ 
          dependenciasNoUiSlider(),
          dependenciasImagenes(),
          dependenciasClinicas(),         
          dependenciasAzure(),
          dependenciasPeriodontograma(),
      ]);
   }
   
   function cargarAgenda($ocLazyLoad){
      return $ocLazyLoad.load
      ([        
        dependenciasDate(),
        dependenciasAzure(),
        dependenciasClinicas(),
        dependenciasImagenes(),
        dependenciasCalendar(),
        dependenciasAgenda(),
      ]);
   }
   
   function cargarCitas($ocLazyLoad){
      return $ocLazyLoad.load
      ([
        dependenciasCita(),
        dependenciasDate(),
        dependenciasAzure(),
        dependenciasClinicas(),
        dependenciasImagenes(),
        dependenciasCalendar(),
        dependenciasAgenda(),
        dependenciasEmail()
      ]);
   }
   
   function cargarEmail($ocLazyLoad){
      return $ocLazyLoad.load
      ([
        dependenciasEmail()
      ]);
   }
   
   
   
 