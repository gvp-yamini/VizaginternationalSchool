(function () {
    'use strict';

    angular
        .module('app')
        .factory('StudentService', StudentService);

    StudentService.$inject = ['$http','$rootScope'];
    function StudentService($http,$rootScope) {
        var service = {};


        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll(callback) {
           return $http.get('/api/student').then(handleSuccess ,handleError('Error getting all students'));
        }

        function GetById(id) {
            return $http.get('/api/student/?id=' + id).then(handleSuccess, handleError('Error getting student by id'));
        }

        function Create(user) {
            return $http.post('/api/student', user).then(handleSuccess, handleError('Error creating student'));
        }

        function Update(user) {
            return $http.put('/api/student/' + user.id, user).then(handleSuccess, handleError('Error updating student'));
        }

        function Delete(id) {
            return $http.delete('/api/student/' + id).then(handleSuccess, handleError('Error deleting student'));
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

    }

})();