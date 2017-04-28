(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$location', 'FlashService','MailService','StudentService'];
    function ProjectController($location, FlashService,MailService,StudentService) {
        var vm = this;

        vm.student=null;
		vm.emailId = "";
		vm.msgBody = "";
		vm.search = "";
		vm.searchById = searchById;
        vm.downloadFile = downloadFile;
        vm.sendInvite = sendInvite;
        vm.norecords = false;
        vm.emailBody = "";
		

        function searchById() {
            vm.norecords = true;
     
          if(Number.isInteger(parseInt(vm.search))){
            StudentService.GetById(vm.search)
                .then(function (student) {
                    vm.student = student;
                    if(vm.student[0].HINDI || vm.student[0].ENGLISH || vm.student[0].SCIENCE || vm.student[0].SOCIAL || vm.student[0].GENERAL || vm.student[0].TELUGU || vm.student[0].MATHEMATICS || vm.student[0].NAME){
                        vm.norecords = false;
                    vm.msgBody = "Your List of Projects: \r\n";
                    vm.msgBody = vm.msgBody + "\r\n";
                    vm.emailBody = "<p>Your List of Projects: <br>";
                    if(vm.student[0].HINDI){
                        vm.msgBody = vm.msgBody + "Hindi: "+vm.student[0].HINDI+"\r\n";
                        vm.emailBody = vm.emailBody + "Hindi: "+vm.student[0].HINDI+"<br>";
                    }
                     if(vm.student[0].ENGLISH){
                        vm.msgBody = vm.msgBody + "English: "+vm.student[0].ENGLISH+"\r\n";
                        vm.emailBody = vm.emailBody + "English: "+vm.student[0].ENGLISH+"<br>";
                    }
                     if(vm.student[0].SCIENCE){
                        vm.msgBody = vm.msgBody + "Science: "+vm.student[0].SCIENCE+"\r\n";
                        vm.emailBody = vm.emailBody + "Science: "+vm.student[0].SCIENCE+"<br>";
                    }
                     if(vm.student[0].SOCIAL){
                        vm.msgBody = vm.msgBody + "Social: "+vm.student[0].SOCIAL+"\r\n";
                        vm.emailBody = vm.emailBody + "Social: "+vm.student[0].SOCIAL+"<br>";
                    }
                     if(vm.student[0].GENERAL){
                        vm.msgBody = vm.msgBody + "General: "+vm.student[0].GENERAL+"\r\n";
                        vm.emailBody = vm.emailBody + "General: "+vm.student[0].GENERAL+"<br>";
                    }
                     if(vm.student[0].TELUGU){
                        vm.msgBody = vm.msgBody + "Telugu: "+vm.student[0].TELUGU+"\r\n";
                        vm.emailBody = vm.emailBody + "Telugu: "+vm.student[0].TELUGU+"<br>";
                    }
                     if(vm.student[0].MATHEMATICS){
                        vm.msgBody = vm.msgBody + "Maths: "+vm.student[0].MATHEMATICS+"\r\n";
                        vm.emailBody = vm.emailBody + "Maths: "+vm.student[0].MATHEMATICS+"<br>";
                    }
                    vm.emailBody = vm.emailBody + "</p>";
                }else{
                    vm.norecords = true;
                }
                });
            }else{
                 vm.norecords = true;
            }
        }
    function downloadFile(){
        var blob = new Blob([vm.msgBody], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "projectsList.txt");    
    }
        function sendInvite(){
        MailService.sendInvite(vm.emailBody,vm.emailId,function(response){
            console.log("mail sent: "+ JSON.stringify(response));
        });
    }
}

})();
