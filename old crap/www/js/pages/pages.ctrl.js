(function(){
  'use strict';
  angular.module('app', ['PageSrv'])
    .controller('PagesCtrl', function($scope, Page){
      $scope.pages = Page.query();
    })
    .controller('PageCtrl', function ($scope, $stateParams, Page) {
        $scope.page = Page.get({
            pageId: $stateParams.pageId
        });
    })
})();
