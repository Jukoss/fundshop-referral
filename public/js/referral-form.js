$(document).ready(function(){
    $(document).ready(function() {
        $('.basic-multiple').select2(
            {
                selectAll: false,
                width: "100%",
                placeholder: "Choose...",
                closeOnSelect: false,
            }
        );
    });

    $('.datepicker').datepicker({
        autoclose: true,
        startDate: "01/01/1950",
        endDate: new Date(),
    });
    

    $('.phone-number')

	.keydown(function (e) {
		var key = e.which || e.charCode || e.keyCode || 0;
		$phone = $(this);

    // Don't let them remove the starting '('
    if ($phone.val().length === 1 && (key === 8 || key === 46)) {
			$phone.val('('); 
      return false;
		} 
    // Reset if they highlight and type over first char.
    else if ($phone.val().charAt(0) !== '(') {
			$phone.val('('+String.fromCharCode(e.keyCode)+''); 
		}

		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {
			if ($phone.val().length === 4) {
				$phone.val($phone.val() + ')');
			}
			if ($phone.val().length === 5) {
				$phone.val($phone.val() + ' ');
			}			
			if ($phone.val().length === 9) {
				$phone.val($phone.val() + '-');
			}
		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	
	.bind('focus click', function () {
		$phone = $(this);
		
		if ($phone.val().length === 0) {
			$phone.val('(');
		}
		else {
			var val = $phone.val();
			$phone.val('').val(val); // Ensure cursor remains at the end
		}
	})
	
	.blur(function () {
		$phone = $(this);
		
		if ($phone.val() === '(') {
			$phone.val('');
		}
	});


    $('.tax-id')


	.keydown(function (e) {
		var key = e.which || e.charCode || e.keyCode || 0;
		$phone = $(this);

		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {		
			if ($phone.val().length === 2) {
				$phone.val($phone.val() + '-');
			}
		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	
	.bind('focus click', function () {
		$phone = $(this);
		
        var val = $phone.val();
        $phone.val('').val(val); // Ensure cursor remains at the end

	})

    let responseZipCode = "";

    $('#zip-code')
	.keyup(function (e) {
        var key = e.which || e.charCode || e.keyCode || 0;
        $zipCode = $(this);

        if (key !== 8 && key !== 9) {	
			if ($zipCode.val().length === 5 && $zipCode.val() != responseZipCode) {

                responseZipCode = $zipCode.val();
                const validator = $(".referral-form").validate();

                $.ajax({
                    url: "https://api.zippopotam.us/us/" + $zipCode.val(),
                    cache: false,
                    dataType: "json",
                    type: "GET",
                    success: function(result, success) {
                       $("#city").val(result.places[0]["place name"]);
                       $("#state").val(result.places[0].state);
                        validator.element("#city");
                        validator.element("#state");
                    },
                    error:function({ status }){
                        if(status === 404) {
                            $("#city").val("");
                                $("#state").val("");
                            $zipCode.addClass("is-invalid");
                            $zipCode.next().html(`<label id="zip-code-error" class="error" for="zip-code" style="">Please enter correct values.</label>`);
                        }
                    }
                });
			}

		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
        
    });

    let responseCompanyZipCode = "";

    $('#company-zip-code')
	.keyup(function (e) {
        var key = e.which || e.charCode || e.keyCode || 0;
        $companyZipCode = $(this);

        if (key !== 8 && key !== 9) {	
			if ($companyZipCode.val().length === 5 && $companyZipCode.val() != responseCompanyZipCode) {

                responseCompanyZipCode = $companyZipCode.val();
                const validator = $(".referral-form").validate();

                $.ajax({
                    url: "https://api.zippopotam.us/us/" + $companyZipCode.val(),
                    cache: false,
                    dataType: "json",
                    type: "GET",
                    success: function(result, success) {
                       $("#company-city").val(result.places[0]["place name"]);
                       $("#company-state").val(result.places[0].state);
                        validator.element("#company-city");
                        validator.element("#company-state");
                    },
                    error:function({ status }){
                        if(status === 404) {
                            $("#company-city").val("");
                            $("#company-state").val("");
                            $companyZipCode.addClass("is-invalid");
                            $companyZipCode.next().html(`<label id="company-zip-code-error" class="error" for="company-zip-code" style="">Please enter correct values.</label>`);
                        }
                    }
                });
			}

		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
        
    });

    $('#company-zip-code')
	.keydown(function (e) {
        var key = e.which || e.charCode || e.keyCode || 0;

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
        
    });

    $('#zip-code')
	.keydown(function (e) {
        var key = e.which || e.charCode || e.keyCode || 0;

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
        
    });


    $('select').on('change', function() {
        const validator = $(".referral-form").validate();
        validator.element(this);
    });

    $('.referral-form').submit(function(event) {
        event.preventDefault();

        const data = $(this).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        
        console.log("data", data);
    }); 


    $('.referral-form').validate({
        focusCleanup: true,
        focusInvalid: false,
        onfocusout: false,
        onkeyup: function(element) {$(element).valid()},
        rules: {
            "first-name": {
                required: true,
            },
            "last-name": {
                required: true,
            },
            "email": {
                required: true,
                email: true,
            },
            "date-birth": {
                required: true,
            },
            "home-address": {
                required: true,
            },
            "zip-code": {
                required: true,
                minlength: 5,
            },
            "state": {
                required: true,
            },
            "city": {
                required: true,
            },

            "company-name": {
                required: true,
            },
            "company-phone": {
                required: true,
                minlength: 14,
            },
            "website": {
                required: true,
                url: true,
            },
            "business-address": {
                required: true,
            },
            "company-zip-code": {
                required: true,
                minlength: 5
            },
            "company-state": {
                required: true,
            },
            "company-city": {
                required: true,
            },
            "company-type": {
                required: true,
            },
            "company-tax-id": {
                required: true,
                minlength: 10,
            },
            "company-state-inc": {
                required: true,
            },


            "business-activity": {
                required: true,
            },
            "time-in-business": {
                required: true,
            },

            "hear-about-us": {
                required: true,
            },
            "references": {
                required: true,
            },
            "per-month": {
                required: true,
            },
            "currently-offer-customers": {
                required: true,
            },
            "communicate-your-customers": {
                required: true,
            },
        },
        messages: {
            "company-tax-id": {
                minlength: "Please enter at least 9 characters.",
            },
            "company-phone": {
                minlength: "Please enter at least 10 characters.",
            }
        },
        highlight: function (input) {
            $(input).addClass('is-invalid');
        },
        unhighlight: function (input) {
           $(input).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
            $(element).next().append(error);
        }
    });
  
});