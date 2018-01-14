var app = angular.module('noticeapp');

app.controller('IndexController', ['$scope', '$state', 'Auth', '$mdToast', function($scope, $state, Auth, $mdToast) {
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
  		showAuthToast('Welcome');
  	}
    console.log(currentAuth + 'is logged out');
}]);