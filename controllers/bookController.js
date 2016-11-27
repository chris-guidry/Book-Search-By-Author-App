angular.module("bookController", [])
    .controller("bookController", ["$scope", "$location", "$http","Books", function($scope, $location, $http, Books) {
        $scope.formData = {};
        $scope.loading = false;                
        $scope.loaded = false;

        $scope.bookSearch = function() {
            $scope.books = {};
            $scope.loading = true;
            searchTerm = '"' + encodeURIComponent($scope.formData.searchTerm) + '"';
            searchTerms = [];
            Books.get(searchTerm)
                .success(function(data) {
                    $scope.books = data;
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
    .directive("focus", function($timeout) {
        return {
            scope : {
                trigger : "@focus"
            },
            link : function(scope, element) {
                scope.$watch("trigger", function(value) {
                    if (value === "true") {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });
