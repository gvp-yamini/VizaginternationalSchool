(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http','$location','$window','StudentService','MailService'];
    function HomeController($http,$location,$window,StudentService,MailService) {
        var vm = this;

        vm.student = null;
        vm.allStudents = [];
        vm.selectedStudents = []; // this consisting of checked students
        vm.selectedEmail = []; // this consisting of students email
        vm.selectedResumeUrls = []; // this consisting of students resumes links
        vm.sort = sort;
        vm.CheckAllCheckBoxes = CheckAllCheckBoxes;
        vm.create_zip = create_zip;
        vm.checkedFlag = true;
        vm.selectingIndividualstudents = selectingIndividualstudents;
        vm.searchResults = []; // it consists of results after filteration and search
        vm.isSelected = false;
        vm.sendInvite = sendInvite;
        vm.msgBody = "";
        vm.subject = "";
        vm.navigateToDetails = navigateToDetails;



        initController();

        function initController() {
            loadAllStudents();
        }

     function sort(keyname){
        vm.sortKey = keyname;   //set the sortKey to the param passed
        vm.reverse = !vm.reverse; //if true make it false and vice versa
    }
    function selectingIndividualstudents($event,studentDet){
        $event.stopPropagation();
        if(studentDet["checked"]==true){
            vm.selectedStudents.push(studentDet);
            vm.selectedEmail.push(studentDet["email"]);
            vm.selectedResumeUrls.push({"name" :studentDet["name"], "link":studentDet["resume"]});
        }else{
            for(var st in  vm.selectedStudents){
                 if(vm.selectedStudents[st]["id"]==studentDet["id"]){
                     vm.selectedStudents.splice(st, 1);
                     vm.selectedEmail.splice(st,1);
                     vm.selectedResumeUrls.splice(st,1);
                 }
            }
        }
        //alert(vm.selectedStudents.length);
        if(vm.selectedStudents.length>0){
            vm.isSelected = true;
        }else{
            vm.isSelected = false;
        }
    }
    function sendInvite(){
        var mailingList = vm.selectedEmail.join(", ");
        MailService.sendInvite(vm.subject,vm.msgBody,mailingList,function(response){
            console.log("mail sent: "+ JSON.stringify(response));
        });
    }
    function navigateToDetails(id){
       $location.path('/EmployeeDetails');
    }
    function create_zip(){
        var resumeLinks = vm.selectedResumeUrls;
        var zip = new JSZip();
        var zipFilename = "resumes"+new Date().toISOString()+".zip";
        var count = 0;
        resumeLinks.forEach(function(url)
          { 
             JSZipUtils.getBinaryContent(url["link"], function (err, data) {
               if(err) {
                  console.error("Problem happened when download resume: " + url["name"]);
             } else {
                 console.log("yamini-->"+JSON.stringify(data));
                 zip.file(url["link"].substring(url["link"].lastIndexOf('/')+1), data, {binary:true});
                 count++;
                 if(count==resumeLinks.length){
                          zip.generateAsync({type:'blob'}).then(function(content) {
                          saveAs(content, zipFilename);
                    });

                 }
                }
           });  
    });     
    }
    function CheckAllCheckBoxes(){
            //alert(vm.searchResults.length);
            for(var st in vm.searchResults){
                         vm.searchResults[st]["checked"] = vm.checkedFlag;
                    }
            vm.selectedStudents = [];
            vm.selectedEmail = [];
            vm.selectedResumeUrls = [];
            for(var st in vm.searchResults){
              if(vm.searchResults[st]["checked"] == true){
                  vm.selectedStudents.push(vm.searchResults[st]);
                  vm.selectedEmail.push(vm.searchResults[st]["email"]);
                  vm.selectedResumeUrls.push({"name" : vm.searchResults[st]["name"], "link": vm.searchResults[st]["resume"]});
               }
            }
           //alert(vm.selectedStudents.length);
           vm.checkedFlag = !vm.checkedFlag; 
           if(vm.selectedStudents.length>0){
            vm.isSelected = true;
        }else{
            vm.isSelected = false;
        }
    }

        function loadAllStudents() {
            StudentService.GetAll()
                .then(function (students) {
                    vm.allStudents = students;
                    for(var st in vm.allStudents){
                         vm.allStudents[st]["checked"] = false;
                    }
                });
        }

    }

})();