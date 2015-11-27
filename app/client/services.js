angular.module('services.module',[]).factory('Movie',function($resource){
  return $resource('http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id', { id: '@_id' },{
    update:{
      method:'PUT'
    }
  })
}).factory('myService',function($mdDialog){
  var property = '';
  return {
            showAlert:function(title,content,ev){
              var confirm =  $mdDialog.confirm()
                    .title(title)
                    .content(content).ariaLabel('Lucky day').targetEvent(ev)
                    .ok('Please do it!').cancel('No, I dont');
                return confirm;
                },
            consoleMe:function(data){
              console.log(data);
            },
              getValue:function(){
                return property;
              },
              setValue:function(value){
                property = value;
              }

          }
  })
