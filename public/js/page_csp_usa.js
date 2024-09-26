$(document).ready(function() {
    //hidden fld
    //$("#bl-usn").css("display", "none");

	//Form Validation
	$("#main-form").validate({
        ignore: ".ignore",
        errorClass: "inp_invalid",
        validClass: "inp_success",
        errorElement: "span",
        rules: {
            first_name: {
                required: true,
                minlength: 3,
                maxlength: 80
            },
            last_name: {
                required: true,
                minlength: 3,
                maxlength: 80
            },
            company: {
                required: true,
                minlength: 3,
                maxlength: 300
            },
            email: {
                required: true,
                email: true,
                maxlength: 200
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10,
                phoneUS: true
            },
            monthly_gross_sales: {
                required: true,
                maxlength: 80
            },
            personal_credit_score: {
                required: true,
                maxlength: 80
            },
            industry_type: {
                required: true,
                maxlength: 80
            }
        },
        submitHandler: function(form) {
          $(form).find('button[type="submit"] #status-snds').html("Submitting ...");
          $(form).find('button[type="submit"]').prop("disabled", true);
          form.submit();
        }
    });

    $('form select').on("keyup, change", function() {
        $(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
      $('.glob_form_error_msg').remove();
    });

    $('form input').keypress(function(){
        $(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
      $('.glob_form_error_msg').remove();
    });

    $(".post_faq_sp_it_button").on('click', function(e){
        let getposfaq = $(this).data('posfaq');
        
        fadePostFaqSp(getposfaq);
    });
});

function fadePostFaqSp(idsp) {
    if (!idsp) {
        return;
    }

    if ($(idsp+' .post_faq_sp_it_txt').is(":hidden")) {
        $('.post_faq_sp_it_txt').hide();
        $('.post_faq_sp_it_button').removeClass("button_active_focus");

        $(idsp+' .post_faq_sp_it_txt').fadeIn('200');
        $(idsp+' .post_faq_sp_it_button').addClass("button_active_focus");
    }else{
        $('.post_faq_sp_it_txt').hide();
        $('.post_faq_sp_it_button').removeClass("button_active_focus");
    }
}

function fadeOptionsStCt(idsp) {
    if (!idsp) {
        return;
    }

    if ($(idsp+' .maps-list-group').is(":hidden")) {
        $(idsp+' .maps-list-group').fadeIn('200');
        $(idsp).addClass("item_active_focus");
        $(idsp+' .button_maps_list_dropd').addClass("button_active_focus");
    }else{
        $(idsp+' .maps-list-group').hide();
        $(idsp).removeClass("item_active_focus");
        $(idsp+' .button_maps_list_dropd').removeClass("button_active_focus");
    }
}

var wordStates = document.querySelectorAll(".list_stct_state li a");
var svgStates = document.querySelectorAll("#gmap > a *");

function removeAllOn() {
  wordStates.forEach(function(el) {
    el.classList.remove("on");
  });
  svgStates.forEach(function(el) {
    el.classList.remove("on");
  });
}

function addOnFromList(el) {
  var stateCode = el.getAttribute("data-hover");
  if (stateCode) {
      var svgState = document.querySelector("#" + stateCode);
      el.classList.add("on");
      svgState.classList.add("on");
  }
}

function addOnFromState(el) {
  var stateId = el.getAttribute("id");
  if (stateId) {
      var wordState = document.querySelector("[data-hover='" + stateId + "']");
      el.classList.add("on");
      wordState.classList.add("on");
  }
}

wordStates.forEach(function(el) {
  el.addEventListener("mouseenter", function() {
    addOnFromList(el);
  });
  el.addEventListener("mouseleave", function() {
     removeAllOn();
  });
  
  el.addEventListener("touchstart", function() {
    removeAllOn();
    addOnFromList(el);
  });
});

svgStates.forEach(function(el) {
  el.addEventListener("mouseenter", function() {
    addOnFromState(el);
  });
  el.addEventListener("mouseleave", function() {
     removeAllOn();
  });
  
  el.addEventListener("touchstart", function() {
    removeAllOn();
    addOnFromState(el);
  });
});

$(function() {
    $(document).ready(function() {
        var state = getUrlParameter('state');
        var city = getUrlParameter('city');
        /*if (state) {
            $("path[data-name='"+state+"']").css("fill","#75c682");
            $(".list_stct_state a[data-name='"+state+"']").addClass("active-ct");
        }
        if (city) {
            $(".list_stct_city a[data-city='"+city+"']").addClass("active-ct");
        }*/
        
        /*$(".linck_stct").hover(function(e) {
            //$("path").css("fill","#919191");
            var idel = $(this).data('hover');
            $("#"+idel).css("fill","#75c682");
        });
        $(".linck_stct").mouseleave(function(e) {
            $("path").css("fill","#919191");
              if (state) {
                //$("path:not([data-name='"+state+"'])").css("fill","#75c682");
                $("path[data-name='"+state+"']").css("fill","#75c682");
            }
        });*/

        $("path, circle").hover(function(e) {
          if (e.target.id !== "path67") {
            $('#info-box').css('display','block');
            $('#info-box').html($(this).data('info'));
          }
        });

        $("path, circle").click(function(e) {
          $('#info-box').css('display','block');
        });

        $("path, circle").mouseleave(function(e) {
          $('#info-box').css('display','none');
        });

        $(document).mousemove(function(e) {
          //$('#info-box').css('top',e.pageY-$('#info-box').height()-30);
          //$('#info-box').css('left',e.pageY-($('#info-box').width())/1.65);
          $('#info-box').css('top',e.pageY - ($("#info-box").height()*2.3));
          $('#info-box').css('left',e.pageX-($('#info-box').width())/1.8);
        }).mouseover();

        /*var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if(ios) {
          $('a').on('click touchend', function() {
            var link = $(this).attr('href');
            window.open(link,'_blank');
            return false;
          });
        }*/
        
        $(".button_maps_list_dropd").on('click', function(e){
            let datatp = $(this).data('dataitm');
            fadeOptionsStCt(datatp);
        });

    });

});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function handleButtonClick(el) {
   el.scrollIntoView({block: "center", behavior: "smooth", inline: "center"});
}

//collapsible
//var coll_state = document.getElementsByClassName("collapsible-state");
//var isa;

//for (isa = 0; isa < coll_state.length; isa++) {
  //coll_state[isa].addEventListener("click", function() {
      /*function showAllState() {
          var btn_state;
          var coll_state = document.getElementsByClassName("collapsible-state");
          btn_state = coll_state[0];
          btn_state.innerHTML = (btn_state.innerHTML == 'Close States') ? 'Show All States' : 'Close States' ;
        btn_state.classList.toggle("active");
        var content_state = document.getElementById("collapseState");
        if (content_state.style.maxHeight){
          content_state.style.maxHeight = null;
          setTimeout(function () {
              content_state.style.margin = null;
          }, 210);
        } else {
          content_state.style.maxHeight = content_state.scrollHeight + "px";
          content_state.style.margin = "2rem 0";
          handleButtonClick(content_state);
        } 
    }*/
 // });
//}
//collapsible
//var coll_city = document.getElementsByClassName("collapsible-city");
//var isb;

//for (isb = 0; isb < coll_city.length; isb++) {
  //coll_city[isb].addEventListener("click", function() {
      /*function showAllCity() {
          var btn_city;
          var coll_city = document.getElementsByClassName("collapsible-city");
          btn_city = coll_city[0];
          btn_city.innerHTML = (btn_city.innerHTML == 'Close City') ? 'Show All City' : 'Close City' ;
        btn_city.classList.toggle("active");
        var content_city = document.getElementById("collapseCity");
        if (content_city.style.maxHeight){
          content_city.style.maxHeight = null;
        } else {
          content_city.style.maxHeight = content_city.scrollHeight + "px";
          handleButtonClick(content_city);
        } 
    }*/
 // });
//}



//form calc
var business_loan_int_rate=parseFloat("7");
if(isNaN(business_loan_int_rate)){
    business_loan_int_rate=7;
}

//var mainFormAction = document.getElementById('mainFormAction');
var mainFormActionInfDef = document.getElementById('form-first-name');
var BLC = {
    initNumericalSlider: function(){
        var loan_range_slider = document.getElementById('form_ln_price_range');
        
        if(loan_range_slider){
            noUiSlider.create(loan_range_slider, {
                start: 10000,
                step: 10000,
                range: {
                    'min': 10000,
                    'max': 2000000
                }
            });
            
            loan_range_slider.noUiSlider.on('update', function( values, handle ) {
                var lv = values[handle];

                if (val_amount_requested_hdn.length > 0) {
                    if (lv == "10000.00") {
                        lv = val_amount_requested_hdn;
                    }
                }                

                var formatted_lv = accounting.formatNumber(lv);

                $('#form_price_text').val("$"+formatted_lv);
                $('#form_calc_btnprice').html("$"+formatted_lv);
                $('#form_calc_sum_pr').html("$"+formatted_lv);
                //$('#form_ln_value').val(lv);
                //$('.form_ln_value').val(lv);

                //if (!val_amount_requested_hdn) {
                    $('#amount-requested').val(lv);
                //}
                
                //BLC.calculateBusinessLoan(lv);
            });
        }
    },

    /*calculateBusinessLoan: function(loan_amt){
        //var fo = $("#form-fin-opt").val();

        if (loan_amt) {
            if (fo == "Buy new or used business equipment") {
                BLC.formCalcEstPayByMonth(loan_amt);
            } else {
                BLC.formCalcEstPayByWeekly(loan_amt);
            }
        }        
    },*/

    formCalcEstPayByWeekly: function(amount){
        var rate = business_loan_int_rate;
        var term = 52;
        var amount;
        var monthly=Math.round((amount*1.15)/term);
        var $form_est_pay_month = $("#form_est_pay_month");
        var $form_est_pay_week = $("#form_est_pay_week");
        $form_est_pay_week.removeClass("hide");
        $form_est_pay_month.addClass("hide");
        var formatted_lv = accounting.formatNumber(accounting.formatMoney(monthly,'$','','','0'));
        $form_est_pay_week.find("strong").html("$"+formatted_lv);           
    },

    formCalcEstPayByMonth: function(amount){
        var rate = business_loan_int_rate;
        var term = 60;
        var amount;
        var monthly_interest = (rate / 100 / 12);
        var x = Math.pow(1 + monthly_interest, term);
        var monthly = (amount * x * monthly_interest) / (x - 1);
        if (amount * rate * term > 0) {
            var $form_est_pay_month = $("#form_est_pay_month");
            var $form_est_pay_week = $("#form_est_pay_week");
            $form_est_pay_month.removeClass("hide");
            $form_est_pay_week.addClass("hide");
            var formatted_lv = accounting.formatNumber(accounting.formatMoney(monthly,'$','','','0'));
            $form_est_pay_month.find("strong").html("$"+formatted_lv);         
        }
    },
}

jQuery(window).on('load', function(){   
    BLC.initNumericalSlider(); 
});

jQuery(document).ready(function(e) {
    jQuery("#form-fin-opt").change(function() {
        $this_ = $('#form_price_text').val();
        var amount = $this_.replace('$', '');
        var amount = amount.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "");

        var fo = $(this).val();
        if (fo == "Buy new or used business equipment") {
            BLC.formCalcEstPayByMonth(amount);
        } else {
            BLC.formCalcEstPayByWeekly(amount);
        }
    });
});