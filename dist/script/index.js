"use strict";!function(a){jscookie.get("loginname")&&(a(".welcome").html("\n        "+jscookie.get("loginname")+'\n        山姆欢迎您！\n        <a href="javascript:">退出</a>\n        '),a(".welcome a").on("click",function(){jscookie.del("loginname"),location.reload()})),a.ajax({url:"http://localhost/xiangmu/php/index.php",dataType:"json"}).done(function(o){for(var n=a(".member_list"),e=a(".best_buy_list"),l="",t="",i=0;i<o.length;i++)l+='\n            <div class="only_for_you_box">\n                    <a href="">\n                        <img class="lazy" data-original="'+o[i].piclist.split(",")[0]+'_220x220.jpg" width="220" height="220">\n                        <p>'+o[i].title+'</p>\n                        <div class="price"><i>¥</i>'+o[i].price+"</div>\n                    </a>\n                </div>\n            ";n.html(l),a.each(o,function(o,n){(t=a("<div>")).addClass("best_buy_box"),t.html('\n                <a href="">\n                <img class="lazy" data-original="'+n.piclist.split(",")[0]+'_220x220.jpg" width="220" height="220">\n                <p>'+n.title+'</p>\n                <div class="price"><i>¥</i>'+n.price+"</div>\n                </a>\n                "),e.append(t)}),a(function(){a("img.lazy").lazyload({effect:"fadeIn"})})})}(jQuery),function(){for(var o=document.querySelector(".banner_center"),n=document.querySelectorAll(".banner img"),e=document.querySelectorAll(".banner_nav div"),l=0,t=function(o){e[o].onclick=function(){l=o,s()}},i=0;i<e.length;i++)t(i);var a=setInterval(function(){c()},5e3);function c(){l++,s()}function s(){for(var o=0;o<e.length;o++)e[o].className="",bufferMove(n[o],{opacity:0});l===e.length&&(l=0),e[l].className="active",bufferMove(n[l],{opacity:100})}o.onmouseover=function(){clearInterval(a)},o.onmouseout=function(){a=setInterval(function(){c()},5e3)}}(),function(e){function o(){e(".elevator_floor").not(".last").each(function(o,n){if(e(window).scrollTop()<=e(".building").eq(o).offset().top+e(".building").eq(o).height()/2)return e(".elevator_floor").not(".last").removeClass("on"),e(n).addClass("on"),!1})}e(window).on("scroll",o),e(window).on("scroll",function(){300<=e(window).scrollTop()?e(".elevator").show():e(".elevator").hide()}),e(".elevator_floor").not(".last").on("click",function(){e(window).off("scroll",o),e(".elevator_floor").not(".last").removeClass("on"),e(this).addClass("on"),e("html").stop(!0).animate({scrollTop:e(".building").eq(e(".elevator_floor").not(".last").index(e(this))).offset().top},function(){e(window).on("scroll",o)})}),e(".last").on("click",function(){e(window).off("scroll",o),e("html").stop(!0).animate({scrollTop:0},function(){e(window).on("scroll",o)})})}(jQuery),function(o){var n=o(".header_nav").eq(0),e=o(".nav_fixed");o(window).on("scroll",function(){o(window).scrollTop()>=o(".header_center").offset().top+o(".header_center").outerHeight()?(e.css("display","block"),n.css("display","none")):(e.css("display","none"),n.css("display","block"))})}(jQuery);