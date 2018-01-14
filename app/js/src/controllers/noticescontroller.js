var app = angular.module('noticeapp');

app.directive('ngFileSelect', [function(){

  return {
    link: function(scope,elem, attrs){
      attrs.$observe('note', function(value){

      elem.bind('change', function(e){
         
          scope.file = (e.srcElement || e.target).files[0];
          console.log(attrs.note, scope.file);
          scope.setImage(attrs.note, scope.file);
         });
         
        
        
      });

    }

  }


}]);

app.controller('NoticesController', ['$scope', 'Auth',  '$http', '$state','$mdToast', '$mdDialog', '$firebaseArray' ,  function($scope, Auth, $http, $state, $mdToast, $mdDialog, $firebaseArray){


  $scope.showSearchDialog = function(ev){
    $mdDialog.show({
      contentElement: '#search-dialog-container',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };
  

  $scope.openMainMenu = function($mdMenu, ev){
  
    $mdMenu.open(ev);
  };
  $scope.showLogoutDialog = function(ev) {
    
    var confirm = $mdDialog.confirm()
          .title('Would you like to exit?')
          .textContent('We will miss you')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Logout')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $state.go('index');
    }, function() {
      //do nothing
    });
  };

Auth.$onAuthStateChanged(function(authData) {
      $scope.authData = authData;
      
    });

  var showToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom center')
        .hideDelay(3000)
    );
    };
  
  var userUid = Auth.$getAuth().uid;
  
  var ref = firebase.database().ref().child('notices/' + userUid.toString());
  $scope.notices = $firebaseArray(ref);




      function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    
    $scope.deleteNote = function(noteId){
      for (var i = 0; i < $scope.notices.length; i++)
        if ($scope.notices[i].id === noteId) {
        $scope.notices.$remove(i);
        break;
   }
    };

    $scope.addNewNote = function(){
      var createdUUID = guid();
      $scope.notices.$add({
        id: createdUUID,
        title: 'Title for new note!',
        noticeBody: 'Body for new note!',
        image: 'http://via.placeholder.com/350x150'
      });
      console.log($scope.notices);

    };

    
$scope.showEditor = function(ev, noteId) {
    $mdDialog.show({
      contentElement: '#obj-' + noteId,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    }).then(dialogReady, dialogReady).finally(dialogReady);

    function dialogReady() {
     for (var i = 0; i < $scope.notices.length; i++)
        if ($scope.notices[i].id === noteId) {
          $scope.notices.$save(i)
          .then(function(){
            console.log('Note #' + noteId + ' was updated');
          })
          .catch(function(error){
            console.log(error);
          });
            
          
          
        break;
   }
      console.log('notices are ready');

    }
  

  };
  

  $scope.welcomeMessage = true;
  $scope.closeWelcomeMessage = function(){
    $scope.welcomeMessage = false;
  }


function isImage(file){
   return file['type'].split('/')[0]=='image';//returns true or false
}

$scope.setImage = function(noteId, file) {

  var reader = new FileReader();


  reader.onloadend = function () {

    if(isImage(file)){
      for (var i = 0; i < $scope.notices.length; i++)
          {
            if ($scope.notices[i].id === noteId) {
              $scope.notices[i].image = reader.result;
              $scope.notices.$save(i);

              break;
              }
          }  
          $scope.$apply();  
          console.log(reader.result);

    }
    else{
      showToast('File is not an image');

    }

    
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    console.log('Error upload file');
  }            
      
    
  
  };
  
  


   
   
  }]);  
