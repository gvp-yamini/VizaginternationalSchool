(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$location', 'FlashService','StudentService','MailService'];
    function ProjectController($location, FlashService,StudentService,MailService) {
        var vm = this;

        vm.student=null;
		vm.emailId = "";
		vm.msgBody = "";
		vm.search = "";
		vm.searchById = searchById;
        vm.downloadFile = downloadFile;
        vm.sendmail = sendmail;
		

        function searchById() {
            StudentService.GetById(vm.search)
                .then(function (student) {
                    vm.student = student;
                    if(vm.student[0].HINDI || vm.student[0].ENGLISH || vm.student[0].SCIENCE || vm.student[0].SOCIAL || vm.student[0].GENERAL || vm.student[0].TELUGU || vm.student[0].MATHEMATICS){
                    vm.msgBody = "Your List of Projects: \n";
                    if(vm.student[0].HINDI){
                        vm.msgBody = vm.msgBody + "Hindi: "+vm.student[0].HINDI+"\n";
                    }
                     if(vm.student[0].ENGLISH){
                        vm.msgBody = vm.msgBody + "English: "+vm.student[0].ENGLISH+"\n";
                    }
                     if(vm.student[0].SCIENCE){
                        vm.msgBody = vm.msgBody + "Science: "+vm.student[0].SCIENCE+"\n";
                    }
                     if(vm.student[0].SOCIAL){
                        vm.msgBody = vm.msgBody + "Social: "+vm.student[0].SOCIAL+"\n";
                    }
                     if(vm.student[0].GENERAL){
                        vm.msgBody = vm.msgBody + "General: "+vm.student[0].GENERAL+"\n";
                    }
                     if(vm.student[0].TELUGU){
                        vm.msgBody = vm.msgBody + "Telugu: "+vm.student[0].TELUGU+"\n";
                    }
                     if(vm.student[0].MATHEMATICS){
                        vm.msgBody = vm.msgBody + "Hindi: "+vm.student[0].MATHEMATICS+"\n";
                    }
                }
                });
        }
    function downloadFile(){
        var blob = new Blob([vm.msgBody], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "projectsList.txt");    
    }
    }

        function sendmail(){
        MailService.sendInvite(vm.msgBody,emailId,function(response){
            console.log("mail sent: "+ JSON.stringify(response));
        });
    }

})();
