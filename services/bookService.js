angular.module("bookService", [])
    .factory("Books", ["$http",function($http) {
        return {
            get : function(searchTerm) {
                return $http.get("https://www.googleapis.com/books/v1/volumes?maxResults=10&q=inauthor:" + searchTerm);
            }
        };
    }]);
