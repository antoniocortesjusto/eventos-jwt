var services = angular.module('events.services', []);

services.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

services.factory('ServicioEventos', function($http){

  var baseUrl ='http://127.0.0.1:3000/api/events/';
  var service = {

    //Obtener todos los eventos visibles para el usuario
    getEventos : function(){
      return $http.get(baseUrl);
    },

    //Obtener un evento con su IdEvento
    getEvento : function(IdEvento) {
      return $http.get(baseUrl + IdEvento);
    }

  };
  
  return service;
});


services.factory('ServicioConfererencias', function($http){

  var baseUrl ='http://127.0.0.1:3000/api/';
  var service = {

    //Obtener todas las conferencias de un evento con su IdEvento
    getConferencias : function(IdEvento) {
      var method = 'conferencias/';
      return $http.get(baseUrl + method + IdEvento);
    },

    //Obtener una conferencia con su IdConferencia
    getConferencia : function(IdConferencia){
      var method = 'conferencia/';
      return $http.get(baseUrl + method + IdConferencia);
    }

  };

  
  return service;

});

services.factory('ServicioEventosCalendario', function($http){

  var baseUrl ='http://127.0.0.1:3000/api/scheduledevents/';
  var events = [
    { IdEvento: 1, NombreEvento: 'Evento 1', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'},
    { IdEvento: 2, NombreEvento: 'Evento 2', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'},
    { IdEvento: 3, NombreEvento: 'Evento 3', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'},
    { IdEvento: 4, NombreEvento: 'Evento 4', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'},
    { IdEvento: 5, NombreEvento: 'Evento 5', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'},
    { IdEvento: 6, NombreEvento: 'Evento 6', FxInicio: 'Fecha' , FxFin: 'Fecha', FxCaduca: 'Fecha', Imagen: 'URL'}
  ];


  var service ={

    //Obtener todos los eventos visibles para el usuario
    getEventos : function(){
      return $http.get(baseUrl);
    },

    //Obtener un evento con su IdEvento
    getEvento : function(IdEvento){
      return $http.get(baseUrl + IdEvento);
    }

  };


  return service;
});