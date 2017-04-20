(function () {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailsController', StudentDetailsController);

    StudentDetailsController.$inject = ['$location','StudentService'];
    function StudentDetailsController($location,StudentService) {
        var vm = this;

        vm.student=null;

        initController();

        function initController() {
			loadStudentdetails();
        }

        function loadStudentdetails() {
            StudentService.GetById(1)
                .then(function (student) {
                    vm.student = student;
                    console.log(JSON.stringify(student));
                });
        }

    }

})();