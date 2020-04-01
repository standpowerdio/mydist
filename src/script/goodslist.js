(function($){
    $.ajax({
        url:"http://localhost/xiangmu/php/goodslist.php",
        dataType: 'json'
    }).done(function(data){
        render(data);
        //加减框
        let add = $(".add");
        let sub = $(".sub");
        let num = $(".num input");
        let reg = /^[1-9]+$/;
        let count = {};
        $.each(num,function(index,value){
            count[$(this).index("input")] = parseInt($(this).val());
        });
        num.on("blur",function(){
            let id = $(this).index("input");
            count[id] = 1;
            if (reg.test($(this).val())) {
                if (parseInt($(this).val()) < 1) {
                    count[id] = 1;
                    $(this).val("1")
                } if (parseInt($(this).val()) > 999) {
                    count[id] = 999;
                    $(this).val("999")
                } else {
                    count[id] = parseInt($(this).val());
                    $(this).val(count[id]);
                };
            } else {
                count[id] = 1;
                $(this).val("1")
            };
        });
        add.on("click", function () {
            let id = $(this).parent().children("input").index("input");
            if (count[id] < 999) {
                count[id]++;
                $(this).parent().children("input").val(count[id]);
            };
        });
        sub.on("click", function () {
            let id = $(this).parent().children("input").index("input");
            if (count[id] > 1) {
                count[id]--;
                $(this).parent().children("input").val(count[id]);
            };
        });


        //加入购物车
        let sidlist = [];
        let numlist = [];
        let adcsid = '';
        let adcnum = '';
        let pcart = $(".addincart");
        if(jscookie.get("sid")&&jscookie.get("num")){
            sidlist = jscookie.get("sid").split(",");
            numlist = jscookie.get("num").split(",");
        };
        pcart.on("click",function(){
            adcsid = $(this).attr("sid");
            adcnum = parseInt($(this).parents(".goodscard").find(".num").children("input").val());
            if(sidlist.indexOf(adcsid) !== -1){
                numlist.splice(sidlist.indexOf(adcsid),1,parseInt(numlist[sidlist.indexOf(adcsid)])+adcnum);
            }else{
                sidlist.push(adcsid);
                numlist.push(adcnum);
            };
            jscookie.add("sid",sidlist,99999);        
            jscookie.add("num",numlist,99999);
            alert(`成功加入${adcnum}个商品到购物车`)
        });













        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.goodscard').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
        //排序
        $(".sorttype").eq(2).on('click', function () {
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    prev = parseFloat(array[j].find('.goodscard_price span').text());
                    next = parseFloat(array[j+1].find('.goodscard_price span').text());
                    if (prev > next) {
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            };
            $('.goodslist').empty();
            $.each(array, function (index, value) {
                $('.goodslist').append(value);
            });
            $(function () {
                $("img.lazy").lazyload({
                    effect: "show"
                });
            });
        });
        $('.sorttype').eq(0).on('click', function () {
            $('.goodslist').empty();
            $.each(array_default, function (index, value) {
                $('.goodslist').append(value);
            });
            $(function () {
                $("img.lazy").lazyload({
                    effect: "show"
                });
            });
        });
        $(".sorttype").eq(1).on('click', function () {
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    prev = parseFloat(array[j].find('.goodscard_price span').text());
                    next = parseFloat(array[j+1].find('.goodscard_price span').text());
                    if (prev < next) {
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            };
            $('.goodslist').empty();
            $.each(array, function (index, value) {
                $('.goodslist').append(value);
            });
            $(function () {
                $("img.lazy").lazyload({
                    effect: "show"
                });
            });
        });
        










    });









    function render(data){
        let gL = $(".goodslist");
        let gC = '';
        for(let i = 0 ; i < data.length ; i++){
            gC += `
            <div class="goodscard">                        
                        <div class="goodscard_center">
                            <a href="details.html?sid=${data[i].sid}"><img class="lazy" data-original="${data[i].piclist.split(',')[0]}_240x240.jpg" width="240" height="240"></a>
                            <a href="details.html?sid=${data[i].sid}" class="goodscard_name">${data[i].title}</a>
                            <p class="goodscard_info">${data[i].info}</p>
                            <p class="goodscard_price">
                                <i>¥</i>
                                <span>${data[i].price}<span>
                            </p>
                            <div class="push_shoopingcart">
                                <div class="num">
                                    <div class="sub">–</div>
                                    <input type="text" value="1">
                                    <div class="add">+</div>
                                </div>
                                <div class="addincart" sid="${data[i].sid}">
                                    <i></i>加入购物车
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        };
        gL.html(gC);
        $(function () {
            $("img.lazy").lazyload({
                effect: "show"
            });
        });
    };
    //分页
    $('.page').pagination({
        pageCount: 3,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            $.ajax({
                url: 'http://localhost/xiangmu/php/goodslist.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                render(data);
                array_default = [];
                array = [];
                prev = null;
                next = null;
                $('.goodscard').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
                $(".sorttype").removeClass("active");
                $(".sorttype").eq(0).addClass("active")        
            });
        }
    });

    //排序按钮
    $(".sorttype").on("click",function(){
        $(".sorttype").removeClass("active");
        $(this).addClass("active")
    });

    




})(jQuery)