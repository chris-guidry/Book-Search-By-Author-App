app.controller("bookController", ["$scope", "$location", "$http", "$log", "Books", function($scope, $location, $http, $log, Books) {
    $scope.books = {};
    $scope.booksPage = [];
    $scope.formData = {};
    $scope.loading = false;                
    $scope.loaded = false;
    $scope.pagination = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10
    };

    $scope.pageChanged = function() {
        setPagingData($scope.pagination.currentPage);
    };
    function setPagingData(page) {
        var pagedData = $scope.books.items.slice((page - 1) * $scope.pagination.itemsPerPage, page * $scope.pagination.itemsPerPage);
        $scope.booksPage = pagedData;
    }
    $scope.bookSearch = function() {
        $scope.loading = true;
        searchTerm = '"' + encodeURIComponent($scope.formData.searchTerm) + '"';
        searchTerms = [];
        Books.get(searchTerm)
            .success(function(data) {
                $scope.books = data;
                $scope.pagination.totalItems = $scope.books.items.length;
                $scope.pagination.currentPage = 1;
                setPagingData($scope.pagination.currentPage);
                $scope.loaded = true;
                $scope.loading = false;                
            });
        if(sessionStorage.searchTerms) {
            searchTerms = sessionStorage.getItem("searchTerms").split(",");
        }
        searchTerms.push(searchTerm);
        sessionStorage.setItem("searchTerms", (searchTerms));
        //Browser history - not implemented for now, but adding this line plus a bit more code would allow the browser back button
        //to be used to go back to previous searches
        //$location.url("?term=" + searchTerm);
    };
    $scope.authorClick = function(author) {
        $scope.formData.searchTerm = author;
        $scope.bookSearch();
    };
}])
.directive("focus", ["$timeout", function($timeout) {
    return {
        scope : {
            trigger : "@focus"
        },
        link : function(scope, element) {
            //$scope.bookController = this;
            scope.$watch("trigger", function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
}]);
