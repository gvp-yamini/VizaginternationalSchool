(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run)
		.controller('HeaderCtrl', HeaderCtrl)
        .controller('footerCtrl', footerCtrl);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider,$httpProvider,$locationProvider) {
        $routeProvider
            .when('/projects', {
                controller: 'ProjectController',
                templateUrl: 'projects/project.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/projects' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/projects']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/projects');
            }
        });
    }
	
	HeaderCtrl.$inject = ['$scope','$rootScope', '$location', '$cookies', '$http'];
    function HeaderCtrl($scope,$rootScope, $location, $cookies, $http) {
          $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
		          var path = $location.path();
        //EDIT: cope with other path
		if(path==='/projects'){
            $scope.templateUrl = 'templates/afterSignInHeader.tmpl.html';
		}else{
            $scope.templateUrl = 'templates/beforeSignInHeader.tmpl.html';
		}
    });
    }

    footerCtrl.$inject = ['$scope','$rootScope', '$location', '$cookies', '$http'];
     function footerCtrl($scope,$rootScope, $location, $cookies, $http) {
          $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
                  var path = $location.path();
        //EDIT: cope with other path
        if(path==='/projects'){
            $scope.templateUrl = 'templates/afterSignInFooter.tmpl.html';
        }else{
            $scope.templateUrl = 'templates/beforeSignInFooter.tmpl.html';
        }
    });
    }
})();