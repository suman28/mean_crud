//var app = angular.module('StarterApp', ['ngMaterial','infinite-scroll']);
var app= angular
.module('starterApp', ['ngMaterial', 'ngMessages', 'elements','infinite-scroll'])
.config(function ($mdThemingProvider, $mdIconProvider) {

    $mdIconProvider
        .icon("menu", "../resources/svg/menu.svg", 24);

    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('deep-orange');

});

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);


/* Table */

app.controller('TableControl', ['$scope', function($scope){
  $scope.toggleSearch = false;
  $scope.headers = [
    {
      name: 'Lease Number',
      field: 'leaseNumber'
    },{
      name:'Customer Name',
      field: 'custName'
    },{
      name: 'Contract Comm. Date',
      field: 'contractCommDate'
    },{
    	name: 'Contract Maturity Date',
        field: 'contractMaturityDate'
    },{
    	name: 'Theatre',
        field: 'theatre'
    },{
    	name: 'Country',
        field: 'country'
    },{
    	name: 'Lease Process Status',
        field: 'leaseProcessStatus'
    },{
    	name: 'Action',
        field: 'action'
    }
  ];

  $scope.content = [
    {
    	leaseNumber: '1001',
    	custName: 'Google',
    	contractCommDate: '02/13/2015',
    	contractMaturityDate : '02/13/2015',
    	theatre : 'APJC',
    	country : 'India',
    	leaseProcessStatus : 'succeded',
    	action : ''

    }

  ];

  $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
  $scope.sortable = ['name', 'description', 'last_modified'];
  //$scope.thumbs = 'thumb';
 // $scope.count = 3;
}]);

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: {
      headers: '=',
      content: '=',
      sortable: '=',
      filters: '=',
      customClass: '=customClass',
      thumbs:'=',
      count: '='
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      	$scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; }
          else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
      			    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  }
});

app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true

        });},100);
      });
    }
  }
});

app.constant('chunkSize', 50);
app.controller('TableController',
    function($scope, chunkSize) {
        $scope.content = [];
        $scope.loadMoreRecords = function() {

            var stock;
            var i = 0;
            while (i < chunkSize) {

                if (1) {
                    stock = {
                    		contractCommDate: '12/12/2015',
                    		contractMaturityDate:'12/12/2015',
                    		custName:'Apple',
                    		theatre:'APJC',
                    		country:'India',
                    		leaseProcessStatus:'succeded',
                    		leaseNumber:1000 + i
                    };
                    $scope.content.push(stock);
                    i++;
                }
            }
        };

        $scope.loadMoreRecords();
    });

    app.directive('whenscrollends', ['$timeout',function(timeout) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var visibleHeight = element.height();
                var threshold = 100;
				var promise = null;
				var lengthThreshold = attrs.scrollThreshold || 50;
				var timeThreshold = attrs.timeThreshold || 400;
				 lengthThreshold = parseInt(lengthThreshold, 10);
				 timeThreshold = parseInt(timeThreshold, 100);

                element.scroll(function() {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        // Scroll is almost at the bottom. Loading more rows
                    	 if (promise !== null) {
                             timeout.cancel(promise);
                         }
                         promise = timeout(function () {
                             handler();
                             promise = null;
                         }, timeThreshold);

                        scope.$apply(attrs.whenscrollends);
                    }
                });
            }
        };
    }]);
