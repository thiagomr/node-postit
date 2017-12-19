const app = angular.module('postit', []);

app.controller('mainController', function($scope, $http, $timeout) {
    $scope.init = true;
    $scope.new = false;
    $scope.errorMessage = false;
    $scope.successMessage = false;
    $scope.color = "yellow";
    $scope.notes = [];

    $scope.load = function () {
        $http.get('/api/notes')
        .then(function (response) {
            $scope.notes = response.data;
            $scope.notes.reverse();
        })
        .catch(function (err) {
            console.log('error: ', err);
        })
    };

    $scope.setCollor = function (color) {
        $scope.color = color;
    }

    $scope.addNew = function () {
        $scope.new = true;
        $scope.init = false;
    }

    $scope.cancelNew = function () {
        $scope.new = false;
        $scope.init = true;
        $scope.successMessage = false;
        $scope.errorMessage = false;
    }

    $scope.deletePostIt = function (id) {
        $http.delete('api/note/' + id)
        .then(function (response) {
            $scope.deleteMessage = true;

            $timeout(function () {
                $scope.deleteMessage = false;
            }, 2000);
            
            $scope.load();
        })
        .catch(function (err) {
            console.log('error', err);
        })
    }

    $scope.confirmAdd = function() {
        $scope.successMessage = false;
        $scope.errorMessage = false;

        if (!$scope.postitBody || !$scope.postitBody.trim()) {
            $scope.postitBody = '';
            $scope.errorMessage = true;
            return false;
        }

        $http.post('/api/note', {'body': $scope.postitBody, color: $scope.color})
        .then(function (response) {
            $scope.successMessage = true;
            $scope.postitBody = '';
            $scope.load();
            
            $timeout(function () {
                $scope.successMessage = false;
            }, 2000);
        })
        .catch(function (err) {
            $scope.errorMessage = true;
            $scope.postitBody = '';
            console.log('error', err);
        });
    }

    $scope.load();
});
