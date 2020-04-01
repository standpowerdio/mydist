(function($){
    let username = $(".username");
    let password = $(".password");
    let passwordAgain = $(".password_again");
    let email = $(".email");
    let form = $("form");
    let tip = $(".regbox p");
    let namereg = /^[a-zA-Z0-9_-]{4,16}$/;
    let emailreg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
    let keyreg = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$/;
    let lock = {
        name:false,
        password:false,
        email:false
    };
    username.on("blur",function(){
        if(username.val() === ''){
            tip.eq(0).html("用户名不能为空");
            username.css("border-color","#F22727");
            lock.name = false;
        }else if(!namereg.test(username.val())){
            tip.eq(0).html("请输入4-16位字母和数字组成的用户名");
            username.css("border-color","#F22727");
            lock.name = false;
        }else{
            $.ajax({
                url:"http://localhost/xiangmu/php/register.php",
                data:{
                    xingming:username.val()
                },
            }).done(function(y){
                if(!y){
                    tip.eq(0).html("");
                    username.css("border-color","#dcdcdc");
                    lock.name = true;
                }else{
                    tip.eq(0).html("用户名已被使用");
                    username.css("border-color","#F22727");
                    lock.name = false;
                };
            });
        };
    });
    email.on("blur",function(){
        if(email.val() === ''){
            tip.eq(1).html("邮箱不能为空");
            email.css("border-color","#F22727");
            lock.email = false;
        }else if(!emailreg.test(email.val())){
            tip.eq(1).html("邮箱格式不正确");
            email.css("border-color","#F22727");
            lock.email = false;
        }else{
            $.ajax({
                url:"http://localhost/xiangmu/php/register.php",
                data:{
                    youxiang:email.val()
                },
            }).done(function(y){
                if(!y){
                    tip.eq(1).html("");
                    email.css("border-color","#dcdcdc");
                    lock.email = true;
                }else{
                    tip.eq(1).html("此邮箱已被使用");
                    email.css("border-color","#F22727");
                    lock.email = false;
                };
            });
        };
    });
    password.on("blur",function(){
        if(password.val() === ''){
            tip.eq(2).html("密码不能为空");
            password.css("border-color","#F22727");
        }else if(!keyreg.test(password.val())){
            tip.eq(2).html("请输入8到16位包含至少一个大写和一个小写的密码");
            password.css("border-color","#F22727");
        }else{
            tip.eq(2).html("");
            password.css("border-color","#dcdcdc");
        };
    });
    passwordAgain.on("blur",function(){
        if(passwordAgain.val() === ''){
            tip.eq(3).html("请确认密码");
            passwordAgain.css("border-color","#F22727");
            lock.password = false;
        }else if(passwordAgain.val() !== password.val()){
            tip.eq(3).html("两次输入的密码不一致");
            passwordAgain.css("border-color","#F22727");
            lock.password = false;
        }else{
            tip.eq(3).html("");
            passwordAgain.css("border-color","#dcdcdc");
            lock.password = true;
        };
    });
    form.on("submit",function(){
        username.blur();
        email.blur();
        password.blur();
        passwordAgain.blur();
        if(!(lock.name && lock.email && lock.password)){
            return false;
        };
    });
})(jQuery);