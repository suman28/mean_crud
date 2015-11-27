angular.module('routes.module',['ngRoute']).config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/',{
    templateUrl:'partials/api/home.html'
  })
  .when('/addEntry',{
    templateUrl:'partials/api/addEntry.html',
    controller:'addEntryCtrl'
  })
  .when('/viewEntries',{
    templateUrl:'partials/api/viewEntries.html',
    controller:'viewEntriesCtrl'
  })
  .when('/updateEntry',{
    templateUrl:'partials/api/updateEntry.html',
    controller:'updateEntryCtrl'
  })
  .when('/setPassword',{
    templateUrl:'partials/api/profile.html',
    controller:'setPasswordCtrl'
  })
  .otherwise('/',{
    templateUrl:'partials/api/home.html'
  })

  // use the HTML5 History API
      //  $locationProvider.html5Mode(true);

        // if you don't wish to set base URL then use this
        // $locationProvider.html5Mode({
        //         enabled: true,
        //         requireBase: false
        //  });
})
