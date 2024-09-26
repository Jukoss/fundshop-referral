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