(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$location', 'FlashService','StudentService','MailService'];
    function ProjectController($location, FlashService,StudentService,MailService) {
        var vm = this;

        vm.student=null;

        initController();

        function initController() {
            alert("before call");
            loadStudentdetails();
        }

        function loadStudentdetails() {
            StudentService.GetById("142")
                .then(function (student) {
                    vm.student = student;
                    alert(JSON.stringify(student));
                });
        }
    }

})();
