$(document).ready(function(){
    var res_ham_toggle = true;
    
    $("#mrnd-hamburger").click(function(){
        if (res_ham_toggle){
            res_ham_toggle = false;
            $(this).addClass("is-active");
            $(".mrnd-hamburger-collapsed-menu").slideDown(200);
        }
        else{
            res_ham_toggle = true;
            $(this).removeClass("is-active");
            $(".mrnd-hamburger-collapsed-menu").slideUp(200);
            
        }
    });
    
    $(".left-menu-item").click(function(){
        $(".left-menu-item").each(function(i, ob){
            $(this).removeClass("active");
        });
        
        $(this).addClass("active");
    });
    
    $(".student-card-name>span").click(function(){
        if ($(this).hasClass("active"))
            $(this).removeClass("active");
        else
            $(this).addClass("active");
    })
    
});