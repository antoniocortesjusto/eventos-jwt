var services = angular.module('events.services', []);

// services.factory('authInterceptor', function ($rootScope, $q, $window) {
//   return {

//     request: function (config) {
//       baseUrl = 'http://127.0.0.1:3000/';
//       var deferred = $q.defer();
//       config.headers = config.headers || {};
//       console.log('URL: ', config.url);
//       console.log(config.url.indexOf(baseUrl));
//       if(config.url.indexOf(baseUrl)>=0){
//         if ($window.sessionStorage.token ) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//         deferred.resolve(config);
//         }
//         else{
          
//           if (config.url.match(/\.*authenticate/)){
//             deferred.resolve(config);
//           }
//           else{
//             console.log('ServicioAutenticacion.login()');
//             $rootScope.$broadcast('AuthenticationNeeded', { 'AuthenticationNeeded' : true });
//             $rootScope.$on('Authenticated', function(event,message) {
//               console.log('En el on');
//               if(message.Authenticated === true) {
//                 console.log('LOGGED IN! sending request!');
//                 //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//                  deferred.resolve(config);
//               } 
//             });
            
//           }
//         }
//       }

//       return deferred.promise;
      
//     },
//     response: function (response) {
//       if (response.status === 401) {
//         // handle the case where the user is not authenticated
//       }
//       return response || $q.when(response);
//     }
//   };
// });



services.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (response) {
      console.log('Status: ', response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        console.log('Response interceptor');
        $rootScope.$broadcast('AuthenticationNeeded', { 'AuthenticationNeeded' : true });
      }
      return response; //|| $q.when(response);
    }
  };
});

services.factory('ServicioAutenticacion', function($http){

  var baseUrl ='http://127.0.0.1:3000/authenticate';
  // Create the login modal that we will use later
  
  var service = {

    doLogin : function (loginData) {
      return $http.post(baseUrl,loginData);
    }

  };
  
  return service;
});

services.factory('ServicioLoginModal', function($http){

  var baseUrl ='http://127.0.0.1:3000/authenticate';
  // Create the login modal that we will use later
  
  var service = {

    doLogin : function (loginData) {
      return $http.post(baseUrl,loginData);
    }

  };
  
  return service;
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