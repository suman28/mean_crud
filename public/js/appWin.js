var app = angular.module('winApp',['ngRoute','ui.bootstrap']);
console.log("HI");
app.controller('winCtrl',function($scope,$modal,$http){
  console.log("Hiiii");
  //$scope.params = {};
  // $http({
  //   params:{
  //     params:'$scope.params'
  //   }
  // })
  $scope.openModal = function(item){
  //  $scope.item = item;

    $scope.modalInstance = $modal.open({
        template:"modal window"
       //templateUrl:"details.html"
     });
    console.log("Hello22");
  }

});
// app.directive('ngSpark',function(){
//   return{
//     restrict:'A',
//     template:'<div class="spark" style="color:red">Hello</div>'
//     //templateUrl:'templates/spark.html'
//   }
// });
