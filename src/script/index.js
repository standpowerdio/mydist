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


    //渲染
    $.ajax({
        url:"http://localhost/xiangmu/php/index.php",
        dataType: 'json'
    }).done(function (data) {
        let mL = $(".member_list");
        let bC = $(".best_buy_list");
        let mB = '';
        let bB = '';
        for (let i = 0; i < data.length; i++) {
            mB += `
            <div class="only_for_you_box">
                    <a href="">
                        <img class="lazy" data-original="${data[i].piclist.split(',')[0]}_220x220.jpg" width="220" height="220">
                        <p>${data[i].title}</p>
                        <div class="price"><i>¥</i>${data[i].price}</div>
                    </a>
                </div>
            `;
        };
        mL.html(mB);
        $.each(data, function (ind, val) {
            bB = $('<div>');
            bB.addClass('best_buy_box');
            bB.html(`
                <a href="">
                <img class="lazy" data-original="${val.piclist.split(',')[0]}_220x220.jpg" width="220" height="220">
                <p>${val.title}</p>
                <div class="price"><i>¥</i>${val.price}</div>
                </a>
                `);
            bC.append(bB);
        });
        $(function () {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        });
    });
})(jQuery);
//轮播图
(function () {
    let box = document.querySelector('.banner_center')
    let LiImg = document.querySelectorAll('.banner img');
    let point = document.querySelectorAll('.banner_nav div');
    let index = 0;
    for (let i = 0; i < point.length; i++) {
        point[i].onclick = function () {
            index = i;
            tab()
        }
    };
    let count = setInterval(function(){
        timer()
    },5000);
    box.onmouseover = function(){
        clearInterval(count)
    };
    box.onmouseout = function () {
        count = setInterval(function () {
            timer()
        }, 5000);
    };
    function timer(){
        index++;
        tab();
    };
    function tab() {
        for (let j = 0; j < point.length; j++) {
            point[j].className = '';
            bufferMove(LiImg[j], { opacity: 0 })
        }
        if (index === point.length) {
            index = 0
        }
        point[index].className = 'active';
        bufferMove(LiImg[index], { opacity: 100 })
    }
})();
//楼梯
(function($){
    let auto = function(){
        $('.elevator_floor').not('.last').each(function(a,b){
            if($(window).scrollTop()<=$('.building').eq(a).offset().top + $('.building').eq(a).height()/2){
                $('.elevator_floor').not('.last').removeClass('on');
                $(b).addClass('on');
                return false;
            }
        })
    };
    let oped = function(){
        if($(window).scrollTop()>=300){
            $('.elevator').show()
        }else{
            $('.elevator').hide()
        };
    };
    $(window).on('scroll',auto);
    $(window).on('scroll',oped);
    $('.elevator_floor').not('.last').on('click',function(){
        //点击跳转时关闭auto 只保留show hide
        $(window).off('scroll',auto);
        $('.elevator_floor').not('.last').removeClass('on');
        $(this).addClass('on');
        $('html').stop(true).animate({
            scrollTop:$('.building').eq($('.elevator_floor').not('.last').index($(this))).offset().top
        },function(){
            //动画结束时开启
            $(window).on('scroll',auto)
        })
    })
    $('.last').on('click',function(){
        $(window).off('scroll',auto);
        $('html').stop(true).animate({
            scrollTop:0
        },function(){
            $(window).on('scroll',auto)
        })
    })
})(jQuery);
//顶部悬浮
(function($){
    let nav1 = $(".header_nav").eq(0);
    let nav2 = $(".nav_fixed");
    $(window).on('scroll',function(){
        if($(window).scrollTop() >= $(".header_center").offset().top + $(".header_center").outerHeight()){
            nav2.css("display","block");
            nav1.css("display","none");
        }else{
            nav2.css("display","none");
            nav1.css("display","block");
        }
    });
})(jQuery);