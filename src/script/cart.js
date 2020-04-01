(function($){
    $.ajax({
        url:"http://localhost/xiangmu/php/cart.php",
        dataType: 'json',
    }).done(function (data) {
        let sidlist = jscookie.get("sid").split(",");
        let numlist = jscookie.get("num").split(",");
        let gl = $(".list_center");
        let gc = '';
        let tprice = 0;
        $.each(sidlist, function (index, sid) {
            $.each(data, function (ind, val) {
                if (sid === val.sid) {
                    gc += `
                    <div class="list_card" sid=${sid}>
                    <div class="chkbox">
                        <input class="chk selects" type="checkbox">
                    </div>
                    <div class="info">
                        <a href="details.html?sid=${sid}"><img src="${val.piclist.split(',')[0]}_90x90.jpg" alt=""></a>
                        <p>${val.title}</p>
                    </div>
                    <div class="unit-price">
                    ${val.price}
                    </div>
                    <div class="num-box">
                        <div class="addbox">
                            <div class="sub">–</div>
                            <input type="text" price="${val.price}" value="${numlist[index]}">
                            <div class="add">+</div>
                        </div>
                    </div>
                    <div class="weight">0.5kg</div>
                    <div class="total"><i>¥</i><span>${(numlist[index]*val.price).toFixed(1)}</span></div>
                    <div class="delete"><a href="javascript:"></a></div>
                </div>
                    `;
                    tprice += numlist[index]*val.price;
                };
                return;
            })
        });
        gl.html(gc);
        $(".chk").prop("checked",true);
        $(".num span").html(tprice.toFixed(1));

        //加入cookie用的变量
        let adcsid = '';
        let adcnum = '';
        //cookie操作函数
        function addcart(a,b){
            adcnum = a;
            adcsid = b.parents(".list_card").attr("sid");
            numlist.splice(sidlist.indexOf(adcsid),1,adcnum);
            jscookie.add("sid",sidlist,99999);        
            jscookie.add("num",numlist,99999);
            adcsid = '';
            adcnum = '';
        };

        //购买数量加减框
        let add = $(".add");
        let sub = $(".sub");
        let num = $(".addbox input");
        let reg = /^[1-9]+$/;
        let count = {};
        $.each(num,function(index,value){
            count[$(this).index("input")] = parseInt($(this).val());
        });
        num.on("blur", function () {
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
            cprice();
            $(this).parents(".list_card").find("span").html((count[id]*$(this).attr("price")).toFixed(1));
            addcart(count[id],$(this));
        });
        add.on("click", function () {
            let id = $(this).parent().children("input").index("input");
            if (count[id] < 999) {
                count[id]++;
                $(this).parent().children("input").val(count[id]);
                addcart(count[id],$(this));
            };
            cprice();
            $(this).parents(".list_card").find("span").html((count[id]*$(this).siblings("input").attr("price")).toFixed(1));
        });
        sub.on("click", function () {
            let id = $(this).parent().children("input").index("input");
            if (count[id] > 1) {
                count[id]--;
                $(this).parent().children("input").val(count[id]);
                addcart(count[id],$(this));
            };
            cprice();
            $(this).parents(".list_card").find("span").html((count[id]*$(this).siblings("input").attr("price")).toFixed(1));
        });

        //全选
        $(".chk:first").on("click",function(){
            if($(".chk:first").prop("checked")){
                $(".chk").prop("checked",true);
            }else{
                $(".chk").prop("checked",false);
            };
            cprice();
        });
        $(".selects").on("click",function(){
            if($(".selects:checked").size() === $(".selects").size()){
                $(".chk:first").prop("checked",true);
            }else{
                $(".chk:first").prop("checked",false);
            };
            cprice();
        });
        
        //单个删除
        let dela = $(".delete a");
        dela.on("click",function(){
            if(confirm("确定删除这个商品吗")){
                $(this).parents(".list_card").remove();
                if($(".selects:checked").size() === $(".selects").size()){
                    $(".chk:first").prop("checked",true);
                }else{
                    $(".chk:first").prop("checked",false);
                };
                adcsid = $(this).parents(".list_card").attr("sid");
                adcnum = sidlist.indexOf(adcsid);
                sidlist.splice(adcnum,1);
                numlist.splice(adcnum,1);
                jscookie.add("sid",sidlist,99999);        
                jscookie.add("num",numlist,99999);
                adcsid = '';
                adcnum = '';
                cprice();
            };
        });
        //批量删除
        $('.deleteall a').on("click", function () {
            if (confirm("确定批量删除商品吗")) {
                $.each($(".selects:checked").parents(".list_card"), function (index, value) {
                    adcsid = $(this).attr("sid");
                    adcnum = sidlist.indexOf(adcsid);
                    sidlist.splice(adcnum, 1);
                    numlist.splice(adcnum, 1);
                });
                jscookie.add("sid", sidlist, 99999);
                jscookie.add("num", numlist, 99999);
                adcsid = '';
                adcnum = '';
                $(".selects:checked").parents(".list_card").remove();
                $(".chk:first").prop("checked", false);
                cprice();
            };
        });


        //计算总价函数
        function cprice(){
            tprice = 0;
            $.each($(".selects:checked"),function(index,value){
                tprice += $(this).parents(".list_card").children(".num-box").find("input").val()*$(this).parents(".list_card").children(".num-box").find("input").attr("price");
            });
            $(".num span").html(tprice.toFixed(1));
        };
    })
})(jQuery);