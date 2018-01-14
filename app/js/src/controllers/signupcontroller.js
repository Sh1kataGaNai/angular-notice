var app = angular.module('noticeapp');

app.controller('SignupController', ['$scope', '$state', 'Auth', '$mdToast',  function($scope, $state, Auth, $mdToast) {
	var showToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom center')
        .hideDelay(3000)
    );
  	};
  	var currentAuth = Auth.$getAuth();
  	if(currentAuth!= null){
  		Auth.$signOut();
  		showToast('User ' + currentAuth.email + ' is logged out');
  		
  	}
  	$scope.signUp = function(){
      Auth.$createUserWithEmailAndPassword($scope.project.clientEmail, $scope.clientPwd)
      .then(function(result){
        $state.go('notices');

      })
      .catch(function(error){
        showToast(error.message);
      })
    }
  	
    
}]);