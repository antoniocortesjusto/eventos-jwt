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

.controller('AuthCtrl', function ($scope, $http, $window) {
  console.log('AuthCtrl');
  $scope.loginData = {username: 'username', password: 'password'};
  $scope.message = '';
  $scope.doLogin = function () {
    $http
      .post('http://127.0.0.1:3000/authenticate', $scope.loginData)
      .success(function (data, status, headers, config) {
        console.log('Success - token: ', data.token);
        $window.sessionStorage.token = data.token;
        $scope.modal.hide();
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
        console.log(data.error);
      });
  };
})

.controller('ScheduleCtrl', function($scope, ServicioEventosCalendario){

  function handleGetEventosSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.scheduledEvents = data.events;
  };

  function handleGetEventosError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
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
  };

  function handleGetConferenciasSuccess (data, status){
    console.log('Success ==> data: ', data, ' status: ', status);
    $scope.conferencias = data;
  };

  function handleGetConferenciasError (data, status){
    console.log('Error ==> data ', data, ' status ', status);
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
  };

  ServicioConfererencias.getConferencia(IdConferencia).success(handleGetConferenciaSuccess).error(handleGetConferenciaError);

});


