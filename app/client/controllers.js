angular.module('controller.module',[])
.controller('viewEntriesCtrl',function(Movie,$scope,$http,$location,$mdDialog,myService,$route){
  $scope.visible = false;
  //to display all the users
  $http.get('api/user')
            .then(function(response){
              $scope.movies = response.data;
              $scope.user = "";
              myService.consoleMe($scope.movies);
            })
            .catch(function(message){
                console.log(message);
            });
    //to get the single user details
    $scope.getOneList = function(MongoID){
      myService.setValue(MongoID);
      myService.consoleMe("I wanna get details of the user with id:"+MongoID);
      $location.path("/updateEntry");
    }

    //To delete the user
    $scope.deleteContact = function(MongoID,ev){
      console.log("clicked"+MongoID);
   // Appending dialog to document.body to cover sidenav in docs app
    var confirm=myService.showAlert('Would you like to delete your entry?','You can not undone this event.',ev);
     $mdDialog.show(confirm).then(function() {
       $http.delete('api/user/'+MongoID).then(function(response){
         myService.consoleMe("record deleted");
          $route.reload();
       })
       .catch(function(message){
           myService.consoleMe(message);
       })
     }, function() {
       $scope.status = 'You decided to keep your debt.';
     });
  }
})
.controller('addEntryCtrl',function($scope,$location,$http,Movie,myService){
  $scope.message = "Add a New Contact here!";
  $scope.user = {};

  $scope.addContact = function(user){
    $http.post('api/user',user)
                       .then(function(response){
                           //$scope.movies.push(response.data);
                           $scope.movies = response.data;
                           console.log($scope.movies);
                           $location.path('/viewEntries');
                        //  myService.visible=false;
                       })
                       .catch(function(message){
                           console.log(message);
                       });
  }
  $scope.clear = function(){
    $scope.user = "";
  }
})
.controller('updateEntryCtrl',function(Movie,$scope,$http,$location,$mdDialog,myService,$route){
  $scope.MongoID = myService.getValue();
  $http.get('api/user/'+$scope.MongoID).then(function(response){
    $scope.visible = true;
    $scope.myData = response.data;
    myService.consoleMe("I got the data of individual user:"+$scope.myData);
  }) .catch(function(message){
       myService.consoleMe(message);
   })
   $scope.myData = {};
   $scope.updateContact = function(){
     myService.consoleMe("I want to update the user with id:"+ $scope.myData._id+"user:"+$scope.myData);
     $http.put('api/user/'+$scope.myData._id,$scope.myData).then(function(response){
      $scope.updatedData = response.data;
      $location.path("/viewEntries");
     console.log(response.data);

     }).catch(function(message){
          myService.consoleMe(message);
      })
   }
$scope.myDate = new Date();
   $scope.getDialog = function(ev){
     $mdDialog.show({

     templateUrl: 'partials/api/dialog1.tmpl.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   }).then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
   }
   $scope.bcs = [
     obj1={
       "name":"suman",
       "prof":"sw"
     },
     obj2={
       "name":"ramana",
        "prof":"sw"
     }
   ]

   //code for breadcrumbs
  // $scope.item = angular.element(document.getElementById("item"));
  // var item = $scope.item.children[0];
  // $('.items a').on('click', function() {
  // var $this = $(this),
  //     $bc = $('<div class="item"></div>');
  //
  // $this.parents('li').each(function(n, li) {
  //     var $a = $(li).children('a').clone();
  //     $bc.prepend(' / ', $a);
  // });
  //   $('.breadcrumb').html( $bc.prepend('<a href="#home">Home</a>') );
  //   return false;
//})
})
.controller('contentCtrl',function($scope){
$scope.init = function(){
    angular.element(document.getElementById("content-page"));
  //  $("#content-page").style("margin-left":"10px");
  }
}).controller('ResourceController',function($scope,$mdDialog,$mdUtil,$mdSidenav,$log){

  var vm=this;
  var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .content('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };

  this.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .content('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );
      originatorEv = null;
    };

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }

  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  }).controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
})
.controller('menuController',function($scope){})
.controller('setProfileCtrl',function($scope){
  $scope.project = {
    description: 'Nuclear Missile Defense System',
    rate: 500
  };
})
.controller('setPasswordCtrl',function($scope){

})
.controller('TabsCtrl',function($scope){

})
.controller('widgetsCtrl',function($scope){
 $scope.imagePath = '../public/images/bg2.png';
 $scope.imagePath1 = '../public/images/bg4.png';
 $scope.imagePath2 = '../public/images/bg1.png';
})
