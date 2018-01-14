var app = angular.module('noticeapp');


app.factory('Auth', ['$firebaseAuth',
  function ($firebaseAuth) {
    return $firebaseAuth();
  }
]);
