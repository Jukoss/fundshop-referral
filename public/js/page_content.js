$(document).ready(function() {

	//slick slider testimonials
	$('#slider-testim').slick({
		fade: true,
		cssEase: 'ease-in-out',
		dots:false,
		infinite:true,
		touchThreshold:10,
		speed:300,
		arrows: false,
		//prevArrow:'<a class="button button_large button_js slider_prev" href="#"><span class="button_icon"><i class="icon-up-open-big"></i></span></a>',
		//nextArrow:'<a class="button button_large button_js slider_next" href="#"><span class="button_icon"><i class="icon-down-open-big"></i></span></a>',
		adaptiveHeight:true,
		autoplay:true,
		autoplaySpeed:5000,
		slidesToShow:1,
		slidesToScroll:1
	});

	//Sticky calc
	$('#section-side-navbar-form').stickySidebar({
		topSpacing: 80,
		bottomSpacing: 0,
		minWidth: 900
	});

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
			url_website: {
				required: false,
				url: true,
				maxlength: 250
			},
			state: {
				required: true,
				maxlength: 80
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
			amount_requested: {
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
			$(form).find('button[type="submit"] span').html("Submitting ...");
			$(form).find('button[type="submit"]').prop("disabled", true);
			form.submit();
		}
	});
});

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
                //$('#form_ln_value').val(lv);
                //$('.form_ln_value').val(lv);

                //if (!val_amount_requested_hdn) {
                    $('#amount-requested').val(lv);
                //}
                
                BLC.calculateBusinessLoan(lv);
            });
        }
    },

    calculateBusinessLoan: function(loan_amt){
        var fo = $("#form-fin-opt").val();

        if (val_use_of_funds_hdn.length > 0) {
            if (fo !== val_use_of_funds_hdn) {
                $('#use-of-funds').val(fo);
            }
        }else{
            $('#use-of-funds').val(fo);
        }

        /*if (!val_use_of_funds_hdn) {
            $('#use-of-funds').val(fo);
        } */       

        if (loan_amt) {
            if (fo == "Buy new or used business equipment") {
                BLC.formCalcEstPayByMonth(loan_amt);
            } else {
                BLC.formCalcEstPayByWeekly(loan_amt);
            }
        }        
    },

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
//end form Calc

$('form select').on("keyup, change", function() {
	$(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
	$('.glob_form_error_msg').remove();
});

$('form input').keypress(function(){
	$(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
	$('.glob_form_error_msg').remove();
});

$('#form-fin-opt').on("keyup, change", function() {
	BLC.calculateBusinessLoan();
});

$(".calc_form_button").on('click', function(e){
    /*$('html, body').animate({
        "scrollTop": $("#form-home").offset().top-150
    }, 100);*/
    
    BLC.calculateBusinessLoan(); 
	setTimeout(function() {
		mainFormActionInfDef.focus();
	}, 500);

    //menuBtnRespHd();
   // e.preventDefault();
});

$("#butn-sbm-form").on('click', function(e){
    $('html, body').animate({
        "scrollTop": $("#main-form").offset().top-150
    }, 100);
    mainFormActionInfDef.focus();
    e.preventDefault();
});