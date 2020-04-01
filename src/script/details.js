//渲染
(function($){
    let sids = window.location.search.substring(1).split("&");
    let res = '';
    let title = $(".title");
    let info = $(".info");
    let price = $(".price span");
    $.each(sids,function(index,value){
        if(value.split("=").indexOf("sid") !== -1){
            res = value.split("=")[1];
            return
        }
    });
    $.ajax({
        type:"POST",
        url:"http://localhost/xiangmu/php/details.php",
        dataType: 'json',
        data:{
            sid:res
        }
    }).done(function(data){
        let lbox = $('.list_box');
        let plist = data.piclist.split(",");
        lbox.css('height',`${plist.length*75}px`);
        lbox.attr('sid',res);
        let card = "";
        $.each(plist,function(index,value){
            card += `
                <div class="sbox" main-src="${value}">
                   <img src="${value}_65x65.jpg">
                </div>
            `
        });
        lbox.html(card);
        $("title").html(data.title);
        title.html(data.title);
        info.html(data.info);
        price.html(data.price);
        $(".sbox").eq(0).addClass("active");
        $(".spic img").attr("src",`${plist[0]}_350x350.jpg`);
        $(".bpic img").attr("src",`${plist[0]}_800x800.jpg`);
        //如果小图列表大于6个  显示上下箭头
        let ud = $(".up-down");
        if ($(".sbox").length > 6) {
            ud.show()
        };
        //列表下面的箭头
        let up = $(".up");
        let down = $(".down");
        let sbox = $(".sbox");
        let list = $(".list_box");
        let index = 6;
        down.on('click', function () {
            if (sbox.size() > index) {
                index++;
                list.stop(true).animate({
                    top: -(index - 6) * sbox.eq(0).outerHeight(true)
                });
            }
        });
        up.on('click', function () {
            if (index > 6) {
                index--;
                list.stop(true).animate({
                    top: -(index - 6) * sbox.eq(0).outerHeight(true)
                });
            }
        });
        
        




    });
    //加入购物车
    let addCart = $(".addincart");
    let num = '';
    let sidarr = [];
    let numarr = [];
    let sid = '';
    if(jscookie.get("sid")&&jscookie.get("num")){
        sidarr = jscookie.get("sid").split(",");
        numarr = jscookie.get("num").split(",");
    };
    addCart.on("click",function(){
        num = parseInt($(".num input").val());
        sid =$(".list_box").attr("sid");
        if(sidarr.indexOf(sid)!==-1){
            numarr.splice(sidarr.indexOf(sid),1,parseInt(numarr[sidarr.indexOf(sid)])+num)
        }else{
            sidarr.push(sid);
            numarr.push(num);    
        };
        jscookie.add("sid",sidarr,99999);        
        jscookie.add("num",numarr,99999);
        alert(`成功加入${num}个商品到购物车`)
    });
})(jQuery);
//左边列表
(function($){
    let sl = $(".spic_list");
    let spic = $(".spic img");
    let bpic = $(".bpic img");
    sl.on('mouseover','.sbox',function(){
        $('.sbox').removeClass("active");
        $(this).addClass("active");
        spic.attr("src",`${$(this).attr("main-src")}_350x350.jpg`);
        bpic.attr("src",`${$(this).attr("main-src")}_800x800.jpg`)
    })
})(jQuery);
//放大镜
(function($){
    let spic = $(".spic");
    let sshow = $(".small-show");
    let bshow = $(".bpic");
    let bpic = $(".bpic img");
    let ssx = '';
    let ssy = '';
    spic.on("mouseover",function(){
        sshow.show();
        bshow.show();
        sshow.height(spic.height()*bshow.height()/bpic.height());
        sshow.width(spic.width()*bshow.width()/bpic.width());
        spic.on("mousemove",function(e){
            ssy = e.pageY-spic.offset().top-sshow.height()/2;
            ssx = e.pageX-spic.offset().left-sshow.width()/2;
            if (ssy < 0) {
                ssy = 0
            } else if (ssy > spic.height() - sshow.height()) {
                ssy = spic.height() - sshow.height()
            };
            if (ssx < 0) {
                ssx = 0
            } else if (ssx > spic.width() - sshow.width()) {
                ssx = spic.width() - sshow.width()
            };
            sshow.css({
                top:ssy,
                left:ssx
            });
            bpic.css({
                top:-ssy*bpic.height()/spic.height(),
                left:-ssx*bpic.width()/spic.width()
            })
        });
        spic.on("mouseout", function () {
            spic.off("mousemove");
            sshow.hide();
            bshow.hide();
            spic.off("mouseout")
        })
    })
})(jQuery);
//购买数量
(function($){
    let add = $(".add");
    let sub = $(".sub");
    let num = $(".num input");
    let reg = /^[1-9]+$/;
    let count = 1;
    num.on("blur",function(){
        if(reg.test(num.val())){
            if (parseInt(num.val()) < 1) {
                count = 1;
                num.val("1")
            } if (parseInt(num.val()) > 999) {
                count = 999;
                num.val("999")
            } else {
                count = parseInt(num.val());
                num.val(count);
            };
        } else {
            count = 1;
            num.val("1")
        };        
    });
    add.on("click", function () {
        if (count < 999) {
            count++;
            num.val(count)
        }
    });
    sub.on("click", function () {
        if (count > 1) {
            count--;
            num.val(count)
        }
    });
})(jQuery);

