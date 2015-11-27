angular.module('directives.module',[])
.directive('contentPage',function($timeout){
  console.log('message');
  return{
    link:function(scope,element,attrs){
      console.log(element);
      if(window.innerWidth>=786 || document.innerWidth>=786)
        element.addClass('content-page');
      else if( window.innerWidth<786 || document.innerWidth<786){
        element.removeClass('content-page');
      }
      // $timeout(function() {
      //     element.removeClass('content-page');
      //  });
      
    }
  }
})
.directive('breadCrumbs',function(){
  return{
    link:function(scope,element,attrs){

      var item,subitem;
      item = angular.element(element.children()[0]);
      subitem = document.querySelectorAll(".links");
      var wrapSubitem = angular.element(subitem);
      console.log("subitem"+wrapSubitem);
      wrapSubitem.click(function(){

        var vm = this;
        var str = $('<div class ="item"></div>');
        var li = vm.parentNode;
        angular.forEach(angular.element(li),function(value,key){
          var links = angular.element(value).children().clone();
             str.prepend(' / ', links);
        })
        var breadcrumb = document.getElementsByClassName('breadcrumb');
           var wrapBreadcrumb = angular.element(breadcrumb);
           wrapBreadcrumb.html( str.prepend('<a href="">Home</a>'));
             return false;

      })
      // $(subitem).click(function(){
      //   var $this = $(this);
      //   var bc = $('<div class="item"></div>');
      //   $this.parents('li').each(function(n, li) {
      //        var links = $(li).children('a').clone();
      //        bc.prepend(' / ', links);
          //});
      //    var breadcrumb = document.getElementsByClassName('breadcrumb');
      //    var wrapBreadcrumb = angular.element(breadcrumb);
      //    wrapBreadcrumb.html( bc.prepend('<a href="">Home</a>') );
      //      return false;
      // })
    }
  }
})
