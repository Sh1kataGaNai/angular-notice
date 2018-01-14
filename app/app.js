var config = {
        apiKey: "AIzaSyC-NT-4fmSW70brT7wcxM1_WvoBij-nCxA",
        authDomain: "angular-notice-js.firebaseapp.com",
        databaseURL: "https://angular-notice-js.firebaseio.com",
        projectId: "angular-notice-js",
        storageBucket: "",
        messagingSenderId: "591216695512"
      };
firebase.initializeApp(config);

var app = angular.module('noticeapp', ['ngMaterial', 'ngMessages', 'ui.router', 'ngAnimate', 'firebase']);





app.controller('AppCtrl', ['$scope', function($scope){
     
}]);
   


app.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$interpolateProvider',
 function($httpProvider, $urlRouterProvider, $stateProvider, $interpolateProvider){

$stateProvider
            .state('notices' ,{
                templateUrl:'templates/notices.html',
                controller:'NoticesController',
                url: '/notices',
                resolve:{
                   'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
                }
            })
            .state('login', {
                templateUrl: 'templates/login.html',
                controller:'LoginController',
                url: '/login'
            })
            .state('logout', {
                templateUrl: 'templates/logout.html',
                controller:'LogoutController',
                url: '/logout',
                resolve:{
                   'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
                }
            })
            .state('signup', {
                templateUrl: 'templates/signup.html',
                controller:'SignupController',
                url: '/signup'
                
                  
                
                
            })
            .state('index', {
                templateUrl: 'templates/index.html',
                controller: 'IndexController',
                url: '/'
            })

            
        $urlRouterProvider.otherwise('/');

 }]);

    

        




