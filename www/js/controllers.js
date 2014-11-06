angular.module('events.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

})

.controller('AuthCtrl', function ($rootScope, $scope, $state, $window, ServicioAutenticacion) {
  console.log('AuthCtrl');
  $scope.loginData = {username: 'username', password: 'password'};
  $scope.message = '';
  var loginData = $scope.loginData;

  $rootScope.$on('Authenticated', function(event,message) {
    
    if(message.Authenticated === true) {
      console.log('LOGGED IN!');
      $scope.closeLogin();
      $state.go($state.current, {}, {reload: true});
    } else{
      console.log('NOT LOGGED IN!');
      $scope.login();
    }
  });

    $rootScope.$on('AuthenticationNeeded', function(event,message) {
    
      if(message.AuthenticationNeeded === true) {
        console.log('Authentication Needed!');
        $scope.login();
        
      } else{
        console.log('NOT Authentication Needed!');
        $scope.closeLogin();
      }
    });


  function handleDoLoginSuccess (data, status, headers, config) {
    console.log('Success - token: ', data.token);
    $window.sessionStorage.token = data.token;
    $rootScope.$broadcast('Authenticated', { 'Authenticated' : true });
    //$scope.closeLogin();

  }
  function handleDoLoginError (data, status, headers, config) {
    // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $rootScope.$broadcast('Authenticated', { 'Authenticated' : false });
        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
        console.log(data.error);
  }
  $scope.doLogin = function () {
    ServicioAutenticacion.doLogin(loginData).success(handleDoLoginSuccess).error(handleDoLoginError);
  };

})

.controller('ScheduleCtrl', function($scope, ServicioEventosCalendario){

  function handleGetEventosSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.scheduledEvents = data.events;
  };

  function handleGetEventosError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
    if(status == 401){
      console.log('Mostrar login');
    }
  };

  ServicioEventosCalendario.getEventos().success(handleGetEventosSuccess).error(handleGetEventosError);

})

.controller('EventsCtrl', function($scope, ServicioEventos) {

  function handleGetEventosSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.events = data.events;
  };

  function handleGetEventosError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
    if(status == 401){
      console.log('Mostrar login');
    }
  };

  ServicioEventos.getEventos().success(handleGetEventosSuccess).error(handleGetEventosError);

})

.controller('EventCtrl', function($scope, $stateParams, ServicioEventos, ServicioConfererencias) {
  var IdEvento = $stateParams.IdEvento;
  function handleGetEventoSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.evento = data;
  };

  function handleGetEventoError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
    if(status == 401){
      console.log('Mostrar login');
    }
  };

  function handleGetConferenciasSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.conferencias = data;
  };

  function handleGetConferenciasError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
    if(status == 401){
      console.log('Mostrar login');
    }
  };

  ServicioEventos.getEvento(IdEvento).success(handleGetEventoSuccess).error(handleGetEventoError);
  ServicioConfererencias.getConferencias(IdEvento).success(handleGetConferenciasSuccess).error(handleGetConferenciasError);
})

.controller('ConferenceCtrl', function($scope, $stateParams, ServicioConfererencias) {
  var IdConferencia = $stateParams.IdConferencia;
  function handleGetConferenciaSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.conferencia = data;
  };

  function handleGetConferenciaError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
    if(status == 401){
      console.log('Mostrar login');
    }
  };

  ServicioConfererencias.getConferencia(IdConferencia).success(handleGetConferenciaSuccess).error(handleGetConferenciaError);

});


