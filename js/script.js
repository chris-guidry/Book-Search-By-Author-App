var app=angular.module("bookSearch",["bookController","bookService"]);angular.module("bookService",[]).factory("Books",["$http",function($http){return{get:function(searchTerm){return $http.get('https://www.googleapis.com/books/v1/volumes?maxResults=10&q=inauthor:"'+searchTerm+'"')}}}]),angular.module("bookController",[]).controller("bookController",["$scope","$location","$http","Books",function($scope,$location,$http,Books){$scope.formData={},$scope.loading=!1,$scope.loaded=!1,$scope.bookSearch=function(){$scope.books={},$scope.loading=!0,searchTerm=encodeURIComponent($scope.formData.searchTerm),searchTerms=[],Books.get(searchTerm).success(function(data){$scope.books=data,$scope.loaded=!0,$scope.loading=!1}),sessionStorage.searchTerms&&(searchTerms=sessionStorage.getItem("searchTerms").split(",")),searchTerms.push($scope.formData.searchTerm),sessionStorage.setItem("searchTerms",searchTerms)},$scope.authorClick=function(author){$scope.formData.searchTerm=author,$scope.bookSearch()}}]).directive("focus",function($timeout){return{scope:{trigger:"@focus"},link:function(scope,element){scope.$watch("trigger",function(value){"true"===value&&$timeout(function(){element[0].focus()})})}}});
//# sourceMappingURL=js/script.js.map