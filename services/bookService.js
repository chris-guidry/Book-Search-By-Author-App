app.factory("Books", ["$http",function($http) {
        return {
            get : function(searchTerm) {
                return $http.get("https://www.googleapis.com/books/v1/volumes?maxResults=10&fields=items(volumeInfo(title,authors,publishedDate,description,imageLinks,previewLink))&q=inauthor:" + searchTerm);
            }
        };
    }]);
