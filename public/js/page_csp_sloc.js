$(document).ready(function() {
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
			personal_credit_score: {
          required: true,
          maxlength: 80
      },
      inquiries_the_last_s_month: {
          required: true,
          maxlength: 80
      },
      any_outstanding_charge_offs: {
          required: true,
          maxlength: 80
      },
      least_year_individual_credit_history: {
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

$('form select').on("keyup, change", function() {
	$(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
	$('.glob_form_error_msg').remove();
});

$('form input').keypress(function(){
	$(this).closest('div.form_col').find("span.inp_invalid_cvl").remove();
	$('.glob_form_error_msg').remove();
});