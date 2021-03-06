/* global hefesoft, materialAdmin, Parse, angular, moment*/


materialAdmin
    .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $translateProvider){
        $urlRouterProvider.otherwise("/preload");
        
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/i18n/locale-',
            suffix: '.json'
        });
        
        
        $translateProvider
        .useSanitizeValueStrategy('sanitize');
        
        $translateProvider.preferredLanguage(hefesoft.languaje());
        
        
        /*
        $translateProvider.determinepreferredlanguage();
        $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
            'en_*': 'en',
            'es_*': 'es'
        })*/

        Parse.initialize("kWv0SwtEaz20E7gm5jUNRtzdbLoJktNYvpVWTYpc", "xhg8VzMlpguoJt3TffH62LntLUJj2DFYtYXwJ0Lg");
        //Parse.initialize("hefesoft", "h123456");
        //Parse.serverURL = '//162.243.50.36:82/parse'
        
        moment.locale(hefesoft.languaje());

        window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId      : '1482696718726490', // Facebook App ID
            status     : false,  // check Facebook Login status
            cookie     : true,  // enable cookies to allow Parse to access the session
            xfbml      : true,  // initialize Facebook social plugins on the page
            version    : 'v2.5' // point to the latest Facebook Graph API version
          });
              // Run code after the Facebook SDK is loaded.
         };

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          //js.src = "//connect.facebook.net/en_US/sdk/debug.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        
        $ocLazyLoadProvider.config({
            //debug : true
        });

        $stateProvider

            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: dependenciasNews()
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: dependenciasGalleryAppLevel()
                            },
                            {
                                name: 'vendors',
                                files: dependenciasGallery()
                            }
                        ])
                    }
                }
            })


            //------------------------------
            // TYPOGRAPHY
            //------------------------------

            .state ('typography', {
                url: '/typography',
                templateUrl: 'views/typography.html'
            })


            //------------------------------
            // WIDGETS
            //------------------------------

            .state ('widgets', {
                url: '/widgets',
                templateUrl: 'views/common.html'
            })

            .state ('widgets.widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('widgets.widget-templates', {
                url: '/widget-templates',
                templateUrl: 'views/widget-templates.html',
            })


            //------------------------------
            // TABLES
            //------------------------------

            .state ('tables', {
                url: '/tables',
                templateUrl: 'views/common.html'
            })

            .state ('tables.tables', {
                url: '/tables',
                templateUrl: 'views/tables.html'
            })

            .state ('tables.data-table', {
                url: '/data-table',
                templateUrl: 'views/data-table.html'
            })


            //------------------------------
            // FORMS
            //------------------------------
            .state ('form', {
                url: '/form',
                templateUrl: 'views/common.html'
            })

            .state ('form.basic-form-elements', {
                url: '/basic-form-elements',
                templateUrl: 'views/form-elements.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-components', {
                url: '/form-components',
                templateUrl: 'views/form-components.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    'vendors/farbtastic/farbtastic.css',
                                    'vendors/bower_components/angular-farbtastic/angular-farbtastic.js',
                                    'vendors/bower_components/summernote/dist/summernote.css',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/input-mask/input-mask.min.js',
                                    'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/bower_components/summernote/dist/summernote.min.js',
                                    'vendors/fileinput/fileinput.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-examples', {
                url: '/form-examples',
                templateUrl: 'views/form-examples.html'
            })

            .state ('form.form-validations', {
                url: '/form-validations',
                templateUrl: 'views/form-validations.html'
            })


            //------------------------------
            // USER INTERFACE
            //------------------------------

            .state ('user-interface', {
                url: '/user-interface',
                templateUrl: 'views/common.html'
            })

            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: 'views/ui-bootstrap.html'
            })

            .state ('user-interface.colors', {
                url: '/colors',
                templateUrl: 'views/colors.html'
            })

            .state ('user-interface.animations', {
                url: '/animations',
                templateUrl: 'views/animations.html'
            })

            .state ('user-interface.box-shadow', {
                url: '/box-shadow',
                templateUrl: 'views/box-shadow.html'
            })

            .state ('user-interface.buttons', {
                url: '/buttons',
                templateUrl: 'views/buttons.html'
            })

            .state ('user-interface.icons', {
                url: '/icons',
                templateUrl: 'views/icons.html'
            })

            .state ('user-interface.alerts', {
                url: '/alerts',
                templateUrl: 'views/alerts.html'
            })

            .state ('user-interface.notifications-dialogs', {
                url: '/notifications-dialogs',
                templateUrl: 'views/notification-dialog.html'
            })

            .state ('user-interface.media', {
                url: '/media',
                templateUrl: 'views/media.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('user-interface.other-components', {
                url: '/other-components',
                templateUrl: 'views/other-components.html'
            })


            //------------------------------
            // CHARTS
            //------------------------------

            .state ('charts', {
                url: '/charts',
                templateUrl: 'views/common.html'
            })

            .state ('charts.flot-charts', {
                url: '/flot-charts',
                templateUrl: 'views/flot-charts.html',
            })

            .state ('charts.other-charts', {
                url: '/other-charts',
                templateUrl: 'views/other-charts.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                ]
                            }
                        ])
                    }
                }
            })


            //------------------------------
            // CALENDAR
            //------------------------------

            .state ('calendar', {
                url: '/calendar',
                templateUrl: 'views/calendar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.js'
                                ]
                            }
                        ])
                    }
                }
            })


            //------------------------------
            // PHOTO GALLERY
            //------------------------------

             .state ('photo-gallery', {
                url: '/photo-gallery',
                templateUrl: 'views/common.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            //Default

            .state ('photo-gallery.photos', {
                url: '/photos',
                templateUrl: 'views/photos.html'
            })
            
            .state ('photo-gallery.videos', {
                url: '/videos',
                templateUrl: 'js/hefesoft/videos/videos.html',
                controller: 'videosCtrl',
                 data: {
                  requireLogin: true
                }
            })
            
            .state ('photo-gallery.model', {
                url: '/model',
                templateUrl: 'views/model.html'
            })
            
            .state ('photo-gallery.imagenesDentales', {
                url: '/imagenesDentales',
                templateUrl: 'views/imagenesDentales.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: dependenciasGalleryAppLevel()
                            },
                            {
                                name: 'vendors',
                                files: dependenciasGallery()
                            },
                            {
                                name: 'vendors',
                                files: dependenciasNews()
                            }
                        ])
                    }
                }
            })

            //Timeline

            .state ('photo-gallery.timeline', {
                url: '/timeline',
                templateUrl: 'views/photo-timeline.html'
            })


            //------------------------------
            // GENERIC CLASSES
            //------------------------------

            .state ('generic-classes', {
                url: '/generic-classes',
                templateUrl: 'views/generic-classes.html'
            })


            //------------------------------
            // PAGES
            //------------------------------

            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common.html',
                controller : "commonCtrl"
            })


            //Profile
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                data: {
                  requireLogin: true
                }
            })

            .state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: 'views/profile-about.html',
                data: {
                  requireLogin: true
                }
            })

            .state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/profile-timeline.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('pages.profile.profile-photos', {
                url: '/profile-photos',
                templateUrl: 'views/profile-photos.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('pages.profile.profile-connections', {
                url: '/profile-connections',
                templateUrl: 'views/profile-connections.html'
            })


            //-------------------------------

            .state ('pages.listview', {
                url: '/listview',
                templateUrl: 'views/list-view.html'
            })

            .state ('pages.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html'
            })

            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: 'views/pricing-table.html'
            })

            .state ('pages.contacts', {
                url: '/contacts',
                templateUrl: 'views/contacts.html'
            })

            .state ('pages.invoice', {
                url: '/invoice',
                templateUrl: 'views/invoice.html'
            })
            
            .state ('preload', {
                url: '/preload',
                controller: 'preloadCtrl',
                templateUrl: 'views/preload.html',
             })
            
            .state ('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: dependenciasNews()
                            }
                        ])
                    }
                }
             })

            .state ('pages.wall', {
                url: '/wall',
                templateUrl: 'views/feed.html',
                data: {
                  requireLogin: true
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: dependenciasGalleryAppLevel()
                            },
                            {
                                name: 'vendors',
                                files: dependenciasGallery()
                            },
                            {
                                name: 'vendors',
                                files: dependenciasNews()
                            }
                        ])
                    }
                }
            })
            
          .state('pages.listadopacientes', {
            url: "/listadopacientes",
            cache: false,
            templateUrl: 'js/hefesoft/pacientes/views/listado.html',
            controller : 'listadoPacientesCtrl',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarPacientes($ocLazyLoad)
               }
            }
          })
          
         .state('pages.paciente', {
            url: "/paciente/:pacienteId",
            cache: false,
            templateUrl: 'js/hefesoft/pacientes/views/paciente.html',
            controller : 'pacientesController',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarPacientes($ocLazyLoad)
               }
            }
          })
          
          .state('pages.picker', {
            url: "/picker/:pacienteId",
            cache: false,
            templateUrl: 'vendors/hefesoft/google/directivas/picker/views/picker.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return pickerDependencias($ocLazyLoad)
               }
            }
          })
          
          .state('pages.listadoDiagnosticos', {
            url: "/listadoDiagnosticos",
            controller: "DxListadoCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/Diagnosticos/views/Diagnosticos.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarDiagnosticos($ocLazyLoad)
               }
            }
          })
          
          .state('pages.cotizador', {
            url: "/cotizador",
            //controller: "DxListadoCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/cotizador/vistas/cotizador.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarDiagnosticos($ocLazyLoad)
               }
            }
          })
          
          .state('pages.tree', {
            url: "/tree",
            controller : "treeCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/tree/views/tree.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarTree($ocLazyLoad)
               }
            }
          })
          
          .state('pages.listadoPrestadores', {
            url: "/listadoPrestadores",
            cache: true,
            templateUrl: 'js/hefesoft/Prestador/listado.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarPrestadores($ocLazyLoad)
               }
            }
          })
          
          .state('pages.diagnosticoPaciente', {
            url: "/diagnosticosPacientes/:pacienteId",
            controller: "diagnosticoPacienteCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/historia/Odontologia/diagnosticosPaciente/views/diagnosticosPaciente.html',
            data: {
              requireLogin: true,
              requirePacient : true,
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarDiagnosticosPacientes($ocLazyLoad)
               }
            }
          })
          
          .state('pages.odontograma', {
            url: "/odontograma/:diagnosticoPacienteId",
            controller: "realizarOdontogramaCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/historia/Odontologia/realizarOdontograma/views/realizarOdontograma.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarOdontograma($ocLazyLoad)
               }
            }
          })
          
          .state('pages.planTratamiento', {
            url: "/planTratamiento/:diagnosticoPacienteId",
            cache: false,
            templateUrl: 'js/hefesoft/historia/Odontologia/planTratamiento/views/planTratamiento.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarPlanTratamiento($ocLazyLoad)
               }
            }
          })
          
          .state('pages.periodontograma', {
            url: "/periodontograma/:diagnosticoPacienteId",
            cache: false,
            templateUrl: 'js/hefesoft/historia/Odontologia/realizarPeriodontograma/Views/realizarPeriodontograma.html',
            data: {
              requireLogin: true,
              requirePacient : true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarPeriodontograma($ocLazyLoad)
               }
            }
          })
          
          .state('pages.agenda', {
            url: "/agenda",
            controller: "AgendaCtrl",
            cache: true,
            templateUrl: 'js/hefesoft/Agenda/views/agenda.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarAgenda($ocLazyLoad)
               }
            }
          })
          
          .state('pages.citas', {
            url: "/citas",
            controller: "citasCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/citas/views/citas.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarCitas($ocLazyLoad)
               }
            }
          })
          
          .state('pages.citashorarios', {
            url: "/citashorarios",
            controller: "citasCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/citas/views/horarios.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarCitas($ocLazyLoad)
               }
            }
          })
          
          .state('pages.email', {
            url: "/email/:recipient",
            controller: "appScriptEmailCtrl",
            cache: false,
            templateUrl: 'js/hefesoft/email/view.html',
            data: {
              requireLogin: true
            },
            resolve :{
               controller : function($ocLazyLoad){
                 return cargarEmail($ocLazyLoad)
               }
            }
          })
          
          
          
          /*
          
          .state('app.agenda', {
        url: "/agenda",
        cache: false,
        data: {
          requireLogin: true
        },
        views: {
            'menuContent': {
                templateUrl: "app/scripts/controllers/Agenda/Views/agenda.html",
                controller: "AgendaCtrl",
                resolve :{
                   controller : function($ocLazyLoad){
                     return cargarAgenda($ocLazyLoad)
                   }
                }                               
            }       
          }
      });
          
          
          */

            //------------------------------
            // BREADCRUMB DEMO
            //------------------------------
            .state ('breadcrumb-demo', {
                url: '/breadcrumb-demo',
                templateUrl: 'views/breadcrumb-demo.html'
            })
    })
    
    
  //Valida que la pagina a la que se le va a hacer render tenga los parametros que necesita para funcionar
  .run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, from) {
     
     hefesoft.global['currentState'] = toState;
     
     if(angular.isDefined(toState.data) && angular.isUndefined(window.window.hefesoftGoogleToken)){
        var item = toState.data;
        var requireLogin = item.requireLogin;
     
        //Ciertas paginas requieren primero seleccionar un paciente
        if(item.hasOwnProperty("requirePacient") && item.requirePacient)
        {
            var element = toState;
            element["name"] = "pages.listadopacientes";
            hefesoft.saveStorageObject("ultimaPagina", element);
        }
        else
        {
          hefesoft.saveStorageObject("ultimaPagina", toState);
        }
        
        event.preventDefault();
        $state.go('preload');
        
        
        try {
            hefesoft.util.loadingBar.start();
        }
        catch (ex) {}
        
     }
    
  })
  
  $rootScope.$on('$stateChangeSuccess', function(event, viewConfig) {
      try {
            hefesoft.util.loadingBar.complete();
        }
        catch (ex) {}
  });
  
});
