"use strict";!function(p){var t=window.location.search.substring(1).split("&"),r="",u=p(".title"),d=p(".info"),g=p(".price span");p.each(t,function(t,i){-1===i.split("=").indexOf("sid")||(r=i.split("=")[1])}),p.ajax({type:"POST",url:"http://localhost/xiangmu/php/details.php",dataType:"json",data:{sid:r}}).done(function(t){var i=p(".list_box"),s=t.piclist.split(",");i.css("height",75*s.length+"px"),i.attr("sid",r);var o="";p.each(s,function(t,i){o+='\n                <div class="sbox" main-src="'+i+'">\n                   <img src="'+i+'_65x65.jpg">\n                </div>\n            '}),i.html(o),p("title").html(t.title),u.html(t.title),d.html(t.info),g.html(t.price),p(".sbox").eq(0).addClass("active"),p(".spic img").attr("src",s[0]+"_350x350.jpg"),p(".bpic img").attr("src",s[0]+"_800x800.jpg");var e=p(".up-down");6<p(".sbox").length&&e.show();var n=p(".up"),a=p(".down"),c=p(".sbox"),h=p(".list_box"),l=6;a.on("click",function(){c.size()>l&&(l++,h.stop(!0).animate({top:-(l-6)*c.eq(0).outerHeight(!0)}))}),n.on("click",function(){6<l&&(l--,h.stop(!0).animate({top:-(l-6)*c.eq(0).outerHeight(!0)}))})});var i=p(".addincart"),s="",o=[],e=[],n="";jscookie.get("sid")&&jscookie.get("num")&&(o=jscookie.get("sid").split(","),e=jscookie.get("num").split(",")),i.on("click",function(){s=parseInt(p(".num input").val()),n=p(".list_box").attr("sid"),-1!==o.indexOf(n)?e.splice(o.indexOf(n),1,parseInt(e[o.indexOf(n)])+s):(o.push(n),e.push(s)),jscookie.add("sid",o,99999),jscookie.add("num",e,99999),alert("成功加入"+s+"个商品到购物车")})}(jQuery),function(t){var i=t(".spic_list"),s=t(".spic img"),o=t(".bpic img");i.on("mouseover",".sbox",function(){t(".sbox").removeClass("active"),t(this).addClass("active"),s.attr("src",t(this).attr("main-src")+"_350x350.jpg"),o.attr("src",t(this).attr("main-src")+"_800x800.jpg")})}(jQuery),function(t){var i=t(".spic"),s=t(".small-show"),o=t(".bpic"),e=t(".bpic img"),n="",a="";i.on("mouseover",function(){s.show(),o.show(),s.height(i.height()*o.height()/e.height()),s.width(i.width()*o.width()/e.width()),i.on("mousemove",function(t){a=t.pageY-i.offset().top-s.height()/2,n=t.pageX-i.offset().left-s.width()/2,a<0?a=0:a>i.height()-s.height()&&(a=i.height()-s.height()),n<0?n=0:n>i.width()-s.width()&&(n=i.width()-s.width()),s.css({top:a,left:n}),e.css({top:-a*e.height()/i.height(),left:-n*e.width()/i.width()})}),i.on("mouseout",function(){i.off("mousemove"),s.hide(),o.hide(),i.off("mouseout")})})}(jQuery),function(t){var i=t(".add"),s=t(".sub"),o=t(".num input"),e=/^[1-9]+$/,n=1;o.on("blur",function(){e.test(o.val())?(parseInt(o.val())<1&&(n=1,o.val("1")),999<parseInt(o.val())?(n=999,o.val("999")):(n=parseInt(o.val()),o.val(n))):(n=1,o.val("1"))}),i.on("click",function(){n<999&&(n++,o.val(n))}),s.on("click",function(){1<n&&(n--,o.val(n))})}(jQuery);