(function () {
    'use strict';

    angular
        .module('app')
        .factory('MailService', MailService);

    MailService.$inject = ['$http','$rootScope'];
    function MailService($http,$rootScope) {
        var service = {};


        service.sendInvite = sendInvite;

        return service;

        function sendInvite(msgBody,emailId,callback) {
           //var AuthorizationToken = $http.defaults.headers.common.Authorization;
           $http.defaults.headers.common.Authorization = 'Basic';
           return $http.post('/api/sendJobInvite', {msgBody: msgBody,emailId : emailId}).then(function successCallback(response) {
                    //$http.defaults.headers.common.Authorization = AuthorizationToken;
                    callback(response);
  } , function errorCallback(response) {
     console.log("Mail sending failed with an error"+JSON.stringify(response));
  });
        }

    }

})();