(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$location', 'FlashService','StudentService','MailService'];
    function ProjectController($location, FlashService,StudentService,MailService) {
        var vm = this;

        vm.student=null;
		vm.subject = "";
		vm.msgBody = "";
		vm.search = "";
		vm.searchById = searchById;
		

        function searchById() {
            StudentService.GetById(vm.search)
                .then(function (student) {
                    vm.student = student;
                });
        }
    }

})();
