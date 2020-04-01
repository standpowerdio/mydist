(function($){
    //欢迎
    if(jscookie.get("loginname")){
        $(".welcome").html(`
        ${jscookie.get("loginname")}
        山姆欢迎您！
        <a href="javascript:">退出</a>
        `);
        $(".welcome a").on("click",function(){
            jscookie.del("loginname");
            location.reload();
        });
    };
})(jQuery);