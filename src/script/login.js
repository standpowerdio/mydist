(function($){
    let login = $(".login");
    let tip = $(".loginbox p").eq(1);
    login.on("click",function(){
        $.ajax({
            type:"POST",
            url:"http://localhost/xiangmu/php/login.php",
            data:{
                user:$(".username").val(),
                pass:$(".password").val()
            }
        }).done(function(y){
            if(!y){
                tip.html("用户名或密码错误！")
            }else{
                location.href = 'index.html';
                if($("#setrember").prop("checked")){
                    jscookie.add('loginname', $(".username").val(), 7);
                }else{
                    document.cookie = `loginname=${encodeURIComponent($(".username").val())}`;
                };
            };
        });
    });
})(jQuery);