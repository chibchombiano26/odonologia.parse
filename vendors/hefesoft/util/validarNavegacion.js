angular.module('Util')
.service('validarNavegacionService', ['users', '$state', 'varsFactoryService', function (users, $state, varsFactoryService) {
	
 	this.validarPacienteSeleccionado = function (){       
        var usuario = users.getCurrentUser();
        var paciente = varsFactoryService.pacienteSeleccionado();

        if(!usuario){
            $state.go("sigin");
        }
        else if(!paciente){
            $state.go("app.pacientes");
        }
    }

    this.validarUsuarioSeleccionado = function (){         
        var usuario = users.getCurrentUser();        
        var valido = true;

        if(!usuario){
            valido = false;
            $state.go("sigin");
        }       

        return valido;

    }

    this.validarCaptcha = function (){         
        var valido = varsFactoryService.captchaFijado();

        if(!valido){
            $state.go("captcha");
        }

    }


}])