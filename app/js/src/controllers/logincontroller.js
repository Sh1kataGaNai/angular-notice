var app = angular.module('noticeapp');
app.controller('LoginController', ['$scope', 'Auth', '$http', '$state','$mdToast', function($scope, Auth, $http, $state, $mdToast){
    var showAuthToast = function(AuthMessage) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(AuthMessage)
        .position('bottom center')
        .hideDelay(3000)
    );
  	};
  	var currentAuth = Auth.$getAuth();
  	if(currentAuth!= null){
  		Auth.$signOut();
  		showAuthToast('User ' + currentAuth.email + ' is logged out');
  		
  	}
  	else
  	{
  		showAuthToast('Please, login to continue...');
  	}
    console.log(currentAuth + 'is logged out');


      	

    
    $scope.login = function() {
      $scope.visible = false;
      Auth.$signInWithEmailAndPassword($scope.project.clientEmail, $scope.project.clientPwd)
      .then(function(authData) {
      	console.log(authData);
        $state.go('notices');
      })
      .catch(function(err) {
        console.log('error:',err);
        $scope.visible = false;
        //$scope.loginStatus = 'Wrong login or password';
        showAuthToast('Wrong login or password');
      });
    };

  }]);