(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','angularUtils.directives.dirPagination'])
        .config(config)
        .run(run)
		.controller('HeaderCtrl', HeaderCtrl)
        .controller('footerCtrl', footerCtrl);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider,$httpProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/EmployeeDetails',{
                controller: 'StudentDetailsController',
                templateUrl: 'studentDetails/studentdetails.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
	
	HeaderCtrl.$inject = ['$scope','$rootScope', '$location', '$cookies', '$http'];
    function HeaderCtrl($scope,$rootScope, $location, $cookies, $http) {
          $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
		          var path = $location.path();
        //EDIT: cope with other path
		if(path==='/login' || path==='/register'){
			$scope.templateUrl = 'templates/beforeSignInHeader.tmpl.html';
		}else{
			$scope.templateUrl = 'templates/afterSignInHeader.tmpl.html';
		}
    });
    }

    footerCtrl.$inject = ['$scope','$rootScope', '$location', '$cookies', '$http'];
     function footerCtrl($scope,$rootScope, $location, $cookies, $http) {
          $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
                  var path = $location.path();
        //EDIT: cope with other path
        if(path==='/login' || path==='/register'){
            $scope.templateUrl = 'templates/beforeSignInFooter.tmpl.html';
        }else{
            $scope.templateUrl = 'templates/afterSignInFooter.tmpl.html';
        }
    });
    }
})();