  (function(){
  'use strict';
  angular.module('app')
    .controller('TimetablesCtrl', TimetablesCtrl);

  function TimetablesCtrl($scope, User, Personaltt, $ionicModal, $timeout){
    $scope.currentUser = User.getCurrent();
    $scope.personaltt = {};
    // modal for new tweet
    $ionicModal.fromTemplateUrl('newptt.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.NewPTTModal = function () {
            $scope.modal.show();
          /**  $timeout(function () {
                $scope.modal.hide();
            }, 20000); **/
        };
        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

     $scope.close = function() {
        $scope.modal.hide();
    };


      $scope.PostPTT = function() {
        Personaltt
          .create({
            unit : $scope.personaltt.unit,
            timestart: $scope.personaltt.timestart,
            timestop : $scope.personaltt.timestop,
            ownerId : $scope.currentUser.id

          })
          .$promise
          .then(function(err) {
          console.log(err)
          });
      };

      // GET the entered timetable
      $scope.personaltts = Personaltt.find({

      });


  }
})();
