// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('events', ['ionic', 'events.controllers', 'events.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
    })

    .state('app.calendar', {
      url: "/calendar",
      views: {
        'menuContent' :{
          templateUrl: "templates/calendar.html",
          controller: 'CalendarCtrl'
        }
      }
    })

    .state('app.schedule', {
      url: "/schedule",
      views: {
        'menuContent' :{
          templateUrl: "templates/schedule.html",
          controller: 'ScheduleCtrl'
        }
      }
    })
    .state('app.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'EventsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/events/:IdEvento",
      views: {
        'menuContent' :{
          templateUrl: "templates/event.html",
          controller: 'EventCtrl'
        }
      }
    })

    .state('app.conference', {
      url: "/conference/:IdConferencia",
      views: {
        'menuContent' :{
          templateUrl: "templates/conference.html",
          controller: 'ConferenceCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
  $httpProvider.interceptors.push('authInterceptor');
});

