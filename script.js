var app = {
    widthMobile : 900,
    init : function(){
        this.resizeBackground();
        
    },
    message : function(t){
        var m = $(".message-information");
        m.html(t);
        m.addClass("is-active");
        setTimeout(function (){
            m.removeClass("is-active");
        }, 3000);
    },
    resizeBackground : function(){
        var bg = $(".section-h-100");

        var window_width = $(window).width();
        var window_height = $(window).height();

        if (window_width <= 1024) {
            if (window_width < window_height) {
                bg.css("height",$(window).height() );
            } else {
                bg.css("height",$(window).width() );
            }
        } 
    },
    inputEnter : function(){
        
    },
    click : function(e, f){
        
        (typeof e == "object") ? e.on("click", f) : $(document).on("click", e, f);
    },
    change : function(e, f){
        
        (typeof e == "object") ? e.on("change", f) : $(document).on("change", e, f);
    },
}
app.init();

var body = {
    scroll : function(e){
        $(window).scroll(e);
    },
    load : function(e){
        $(window).on("load",e);
    },
}


var modal = {
    init : function(){
        modal.closeClick();
        
    },
    show : function(e){
        $(e).addClass("is-active");
    },
    hide : function(e){
        $(e).removeClass("is-active");
    },
    closeClick : function(e){
        var self = this;
        app.click(".modal-background, .modal-close", function(){
            var s = $(this);
            self.hide(s.closest(".modal"));
        });
        
        
    },
}
modal.init();



var validation = {
    isEmail : function(v){
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(v);
    },
    isNumeric : function(v){
        return !isNaN(parseFloat(v)) && isFinite(v);
    },
}


var scroll = {
    window : function(e){
        body.scroll(e);
    },
    value : function(e, o){
        return (e == undefined) ?  $(window).scrollTop() : ($(e).length == 0) ? false : parseFloat($(e).offset().top) + parseInt(o || 0) ;
    },
    to : function(e, o){
        $("html, body").animate({ scrollTop: this.value(e) + parseInt(o || 0) }, 800);
    },
    before : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() < scroll.value(e) ;
    },
    after : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() > scroll.value(e) ;
    },
    equal : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() == scroll.value(e) ;
    },
    between : function(e, o){
        return (scroll.value(e) === false) ? false : scroll.value() < parseInt(scroll.value(e, o)) && scroll.value() >= parseInt(scroll.value(e));
    },
    toSpeed : function(e, o){
        $("html, body").animate({ scrollTop: this.value(e) }, o);
    }
}
var scrollMagic = {
    init : function(t){
        t = t || "onCenter";
        var controller = new ScrollMagic.Controller({
                            globalSceneOptions: {
                                triggerHook: t
                            }
                        });
    },
}
scrollMagic.init();




var utub = {
    init : function(){
        
        $.getScript( "https://cdn.jsdelivr.net/npm/jquery-tubeplayer-plugin@2.1.0/src/tubeplayer.js", function( data, textStatus, jqxhr ) {
            utub.loadVideo();    
        })
        
    },
    loadVideo : function(e){
        $(".utub").each(function(){
            var s = $(this);
            var videoId = s.attr("id");
            s.tubeplayer({
                initialVideo: videoId,
                controls: 0,    
                color: "white", 
                modestbranding: false,   
                annotations: false,
            });
        })
    },  
}
utub.init();



var select = {
    select2 : null,
    option : null,
    init : function(e, o){
        this.select2 = $(e);
        this.option = o || "";
        select.generate(".select2",{});
    },
    generate : function(e, o){
        this.select2 = $(e);
        this.option = o || {};
        this.option.width = "100%";
        this.select2.select2(this.option);
    },
    value : function(e){
        $("select[data-value]").each(function(){
            var self = $(this);
            
            self.val(self.data("value"));
            self.trigger("change");
        })
    },
}




var placeholder = {
    init : function(){
        
        $(document).on("focus", ".with-placeholder input, .with-placeholder textarea", function(){
            var self = $(this);
            var v = self.val();
            var w = self.closest(".with-placeholder").find(".placeholder");
            w.addClass("is-active");
        })
        $(document).on("focusout", ".with-placeholder input, .with-placeholder textarea", function(){
            var self = $(this);
            var v = self.val();
            var w = self.closest(".with-placeholder").find(".placeholder");
            (v == undefined || v == "") ? w.removeClass("is-active") : w.addClass("is-active");
        })
    },
}
placeholder.init();


function form(e){
    this.e = e;
    this.button = ".send-" + this.e.replace(".", "");
    this.el = $(e);
    this.o = {
                ignore: "",
                errorElement: "label",
                errorPlacement: function(error, element) {
                    element.parent().append(error);
                },
                highlight: function(element) {
                    $(element).parent().addClass("error");
                },
                unhighlight: function(element) {
                    $(element).parent().removeClass("error");
                },
            };
    this.init = function(o){
        (o == undefined) ? false : this.o.rules = o.rules ;
        (o == undefined) ? false : this.o.messages = o.messages ;
        
        this.validate();
        this.extend();
        
        return (this.el.length === 0) ? false : this;
    };
    this.extend = function(){
        jQuery.validator.addMethod("checkfirstat", function(value, element) {
            return (value != "") ? (value.substring(0, 1) == "@") : true ;
        }, "Awali dengan @ sebelum user ID");
        jQuery.validator.addMethod("phonenumber", function(value, element) {
            return (value != "") ? (value.substring(0, 1) != "0") && validation.isNumeric(value) : true ;
        }, "Pastikan no telp valid.");
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return (value != "") ? this.optional(element) || /^[a-z\s]+$/i.test(value) : true ;
        }, "Hanya boleh huruf a-z."); 

        jQuery.extend(jQuery.validator.messages, {
            required: "Kolom ini harus diisi.",
            email: "Pastikan email kamu valid.",
            url: "Masukan tautan yang valid. Contoh : http://example.com/node/1, https://example.com/",
            number: "Hanya boleh angka 0-9.",
            alphanumeric: "Hanya boleh berupa huruf, angka dan underscore.",
            lettersonly: "Hanya boleh huruf a-z.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Kolom ini tidak boleh lebih dari {0} karakter."),
            minlength: jQuery.validator.format("Masukan minimal {0} karakter."),
        });
    }
    this.validate = function(){
        var self = this;
        this.el.validate(this.o);
    };
    this.submit = function(){
        console.log(this.valid());
        if (this.valid()){
            this.el.submit();
        }
    };
    this.valid = function(){
        return this.el.valid();
    };
    this.post = function(url, formData, callbackSuccess, callbackError){
        formData = formData || "";
        url = url || "";
        callbackSuccess = callbackSuccess || "";
        callbackError = callbackError || "";
        if ( formData != "" && url != "" ){
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                success: callbackSuccess,
                error: callbackError
            });
        }
    };
    
}

var ajaxForm = {
    init : function(){
        
    },
    post : function(url, formData, callbackSuccess, callbackError){
        formData = formData || "";
        url = url || "";
        callbackSuccess = callbackSuccess || "";
        callbackError = callbackError || "";
        if ( formData != "" && url != "" ){
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                success: callbackSuccess,
                error: callbackError
            });
        }
    },
}
ajaxForm.init();


    


var scrollMagic = {
    e : $("[scroll-magic]"),
    init : function(){
        scrollMagic.e.each(function(){
            var s = $(this);
            var t = s.attr("type-scroll-magic") || "";
            var n = s.attr("scroll-magic") +"-scroll-magic";
            var c = "scroll-magic";
            var r = s.attr("scroll-magic") +"-scroll-magic-parent";
            switch (t){
                case "wrap":
                    s.addClass(n);
                    s.addClass(c);
                    break;
                default:
                case "wrapInner":
                    s.wrapInner(function() {
                        return "<div class='"+ n +" "+ c +" '></div>";
                    }); 
                    s.addClass(r);
                    break;
            }
            
            
            

        })
    },
}
if ($(window).width() >= app.widthMobile){
    scrollMagic.init();
}


var slick = {
    e : null,
    opt : {
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 5000,
        
            responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,

              }
            }]
    },
    init : function(e, s, a, d){
        var self = this;
        this.e = e;
        
        
        
        $(e).each(function(){
            self.opt.slidesToShow = s || 1;
            self.opt.autoplay = a || false;
            self.opt.dots = d || false;
            self.opt["prevArrow"] = $(this).parent().find(self.e + '-left');
            self.opt["nextArrow"] = $(this).parent().find(self.e + '-right');
            self.opt.responsive[0].settings["prevArrow"] = $(this).parent().find(self.e + '-left');
            self.opt.responsive[0].settings["nextArrow"] = $(this).parent().find(self.e + '-right');
            

            $(this).slick(self.opt);        
            
            
        });

        
    },
    option : function(e){
        var self = this;
        $.each(e, function(k, v){
            
            self.opt[k] = v;
        });
        

        
        
    },
}


var textTransform = {
    init : function(){
        
    },
    ucfirst : function(e){
        return e.charAt(0).toUpperCase() + e.slice(1);  
    },
    ucwords : function(e){
        return (e + '')
            .replace(/^(.)|\s+(.)/g, function ($1) {
                return $1.toUpperCase()
            })
    },
}
textTransform.init();


var url = {
    init : function(){
        
    },
    change : function(e){
        history.pushState({}, '', e);
    },
}
url.init();





var script = {
    init : function(){
        script.setOmni();
        script.checkPage();
    },
    checkPage : function(e){
        var className = window.location.hash.substr(1) || "/home";
        if (className.slice(0,1) == "/"){
            className = className.substr(1);

            $(".menu-page").each(function(){
                var s = $(this);
                s.removeClass("is-active");
            })
            $(".page-" + className).addClass("is-active");
        }
        if (className != "tnc" && $(window).width() >= 1000){

        }
    },
    setOmni : function(){
        $("[omni]").each(function(){
            var o = $(this).attr("omni");
            
            $(this).attr("data-omni-type", "microsite");
            $(this).attr("data-omni", "id:buy_m10:" + o );
        })
        
    },
    
}
script.init();

var getScreenWidth = window.innerWidth;
if(getScreenWidth >= 1024) {}

$('body').on('click', '.slider section.kv .copyy a.btn-cek', function() {
    $(".modal").addClass("is-active");
});

var navigate = {
    init : function(){
        $('.navigation a:not(".nav1")').click(function(){
            var getVal = $(this).attr('goto');
            setTimeout(function (){
                $('.navigation a').removeClass('is-active');
            }, 200);
            setTimeout(function (){
                $(this).addClass('is-active');
            }, 500);
            scroll.to('section.section.' + getVal);

        });
    },
    slider : function(){
        $('.navigation a.nav1').click(function(){
            scroll.to('.slider');
        });
    },
    floatBtn : function(){
        $('.floating-btn').click(function(){
            scroll.to('section.section.activity');
        })
    }
}
navigate.init();
navigate.floatBtn();
navigate.slider();

var menu = {
    detect : function(){
        scroll.window(function(){
            
            if (scroll.value() < scroll.value(".slider") + 100) {
                
                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav1").addClass("is-active"); 
            }

            if (scroll.value() > scroll.value(".section.second") - 100) {
                
                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav2").addClass("is-active"); 
                
            }

            if (scroll.value() > scroll.value(".section.third") - 100) {
                 
                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav3").addClass("is-active"); 
                
            }
        });
    }
}

menu.detect();


var stickyNav = {
    detect : function(){
        $('.navigation').parents().filter(function() {
            return $(this).css('overflow') === 'hidden';
        });
    }
};
stickyNav.detect();

var kabariSaya = {
    init : function(){
        $('.slider .kv .copyy .btn-cek').click(function(){
            fbq('track', 'KabariSaya-M10');
            gtag_report_conversion();
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            $(".kabariSaya").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m10_m0;cat=m10-k0;u61=[M10 - Kabari Saya];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

        })
    }
}
kabariSaya.init();

var floodLight = {
    daftarSekarang : function(){
        $('.modal .online-wrapper .callFlood.samsung').click(function(){
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            $(".floodDaftar").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m20_m0;cat=m20-d0;u53=[M20 - Daftar Sekarang];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        })
    },
    learnMore : function(){
        $('.buttonn .btn-learnmore1').click(function(){
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            $(".floodlearnMore").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m20_m0;cat=m20-l0;u54=[M20 - Learn More];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        })
    },
    ecomm : function(){
        $('.modal .online-wrapper .callFlood').click(function(){
            var axel = Math.random() + "";
            var a = axel * 10000000000000;

            var t = $(this);

            var getVal = t.attr('flood-target');
            if(getVal == 'lazada'){
                $(".floodLazada").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m10_m0;cat=m10-i0;u62=[M10 - Ingatkan Lazada];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
                fbq('track', 'IngatkanSaya-M10-Lazada');

            }else if(getVal == 'jdid'){
                $(".floodJdid").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m10_m0;cat=m10-i00;u63=[M10 - Ingatkan JD.ID];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
                fbq('track', 'IngatkanSaya-M10-JDID');

            }else if(getVal == 'blibli'){
                $(".floodBlibli").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m10_m0;cat=m10-i000;u64=[M10 - Ingatkan Blibli];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
                fbq('track', 'IngatkanSaya-M10-Blibli');

            }else if(getVal == 'samsung'){
                $(".floodSamsung").html('<iframe src="https://9107965.fls.doubleclick.net/activityi;src=9107965;type=m10_m0;cat=m10-i001;u65=[M10 - Ingatkan Samsung];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
                fbq('track', 'IngatkanSaya-M10-Samsung');
            }

        });
    }
}
floodLight.daftarSekarang();
floodLight.learnMore();
floodLight.ecomm();

var changeUrl = {
    init : function(){
        if(getScreenWidth < 1024){
            
        };
    }
}
changeUrl.init();


var video = {
    open : function (){
        $('.logoo a.link').click(function() {
            $('.section.activity .modal').addClass("is-active");
        });
    }
}
video.open();

$('.slider').slick({
    autoplay: false,
    nextArrow: `<div class='arrowGeneral arrowRight'>
                    <i class='ti-angle-right'></i>
                </div>`,
    prevArrow: `<div class='arrowGeneral arrowLeft'>
                    <i class='ti-angle-left'></i>
                </div>`,
    dots: true,
    customPaging: function(slider, i) {
        return `<div class="border-out">
                <div class="dots"></div>
            </div>`;
    },
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: true
            }
        }
    ]
});

$('.btn-jadwal').click(function(){
    $('.jadwal').toggle();
});
$('.logo.lazada').click(function(){
    $('.lazadaa').show();
    $('.jdidd').hide();
    $('.bliblii').hide();
    $('.erafonee').hide();
    $('.telesindoo').hide();
    $('.logo.lazada').css("filter" ,"grayscale(0)");
    $('.logo.jdid').css("filter" ,"grayscale(100%)");
    $('.logo.blibli').css("filter" ,"grayscale(100%)");
    $('.logo.erafone').css("filter" ,"grayscale(100%)");
    $('.logo.telesindo').css("filter" ,"grayscale(100%)");
})
$('.logo.jdid').click(function(){
    $('.lazadaa').hide();
    $('.jdidd').show();
    $('.bliblii').hide();
    $('.erafonee').hide();
    $('.telesindoo').hide();
    $('.logo.jdid').css("filter" ,"grayscale(0)");
    $('.logo.lazada').css("filter" ,"grayscale(100%)");
    $('.logo.blibli').css("filter" ,"grayscale(100%)");
    $('.logo.erafone').css("filter" ,"grayscale(100%)");
    $('.logo.telesindo').css("filter" ,"grayscale(100%)");
})
$('.logo.blibli').click(function(){
    $('.lazadaa').hide();
    $('.jdidd').hide();
    $('.bliblii').show();
    $('.erafonee').hide();
    $('.telesindoo').hide();
    $('.logo.blibli').css("filter" ,"grayscale(0)");
    $('.logo.jdid').css("filter" ,"grayscale(100%)");
    $('.logo.lazada').css("filter" ,"grayscale(100%)");
    $('.logo.erafone').css("filter" ,"grayscale(100%)");
    $('.logo.telesindo').css("filter" ,"grayscale(100%)");
})
$('.logo.erafone').click(function(){
    $('.lazadaa').hide();
    $('.jdidd').hide();
    $('.bliblii').hide();
    $('.erafonee').show();
    $('.telesindoo').hide();
    $('.logo.erafone').css("filter" ,"grayscale(0)");
    $('.logo.jdid').css("filter" ,"grayscale(100%)");
    $('.logo.lazada').css("filter" ,"grayscale(100%)");
    $('.logo.blibli').css("filter" ,"grayscale(100%)");
    $('.logo.telesindo').css("filter" ,"grayscale(100%)");
})
$('.logo.telesindo').click(function(){
    $('.lazadaa').hide();
    $('.jdidd').hide();
    $('.bliblii').hide();
    $('.erafonee').hide();
    $('.telesindoo').show();
    $('.logo.telesindo').css("filter" ,"grayscale(0)");
    $('.logo.jdid').css("filter" ,"grayscale(100%)");
    $('.logo.lazada').css("filter" ,"grayscale(100%)");
    $('.logo.blibli').css("filter" ,"grayscale(100%)");
    $('.logo.erafone').css("filter" ,"grayscale(100%)");
})