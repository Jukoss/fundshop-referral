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

    
    const today = new Date();
    const dda = today.getDate();
    const mma = today.getMonth()+1;
    const yyyya = today.getFullYear();

    $('.datepicker').datepicker({
        autoclose: true,
        startDate: "01/01/1950",
        endDate: mma+'/'+dda+'/'+(yyyya - 18),
    });
    
    $('.phone-number').keydown(function (e) {
		const key = e.which || e.charCode || e.keyCode || 0;
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
			$phone.val('').val($phone.val()); // Ensure cursor remains at the end
		}
	})
	
	.blur(function () {
		$phone = $(this);
		
		if ($phone.val() === '(') {
			$phone.val('');
		}
	});


    $('.tax-id').keydown(function (e) {
		const key = e.which || e.charCode || e.keyCode || 0;
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
		
        $phone.val('').val($phone.val()); // Ensure cursor remains at the end

	})

    $('#zip-code').keyup(function (e) {
        const key = e.which || e.charCode || e.keyCode || 0;
        $zipCode = $(this);

        if (key !== 8 && key !== 9) {	
			if ($zipCode.val().length >= 5) {

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
    });

    $('#company-zip-code').keyup(function (e) {
        const key = e.which || e.charCode || e.keyCode || 0;
        $companyZipCode = $(this);

        if (key !== 8 && key !== 9) {	
			if ($companyZipCode.val().length >= 5 ) {

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
    });

    $('#company-zip-code').keydown(function (e) {
        const key = e.which || e.charCode || e.keyCode || 0;

		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
    });

    $('#zip-code').keydown(function (e) {
        const key = e.which || e.charCode || e.keyCode || 0;

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
    }); 

    $('.referral-form').validate({
        focusCleanup: true,
        onfocusout: false,
        onkeyup: function(element) {$(element).valid()},
        rules: {
            "first-name": {
                required: true,
                minlength: 3,
            },
            "last-name": {
                required: true,
                minlength: 3,
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
                minlength: 1,
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
                minlength: 3,
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
                minlength: 3,
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
                minlength: 3,
            },
            "references": {
                required: true,
                minlength: 3,
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
        },
        submitHandler: function(form) {
            const data = $(form).serializeArray().reduce(function(obj, item) {
                if(obj[item.name]) {
                    const prevElement = Array.isArray(obj[item.name]) ? obj[item.name] : [obj[item.name]];
                    obj[item.name] = [...prevElement, item.value];
                } else {
                    obj[item.name] = item.value;
                }
                return obj;
            }, {});

            console.log("data", data);
    
            $(".btn-sign-up").attr("disabled", true);

            // $.ajax({
            //     url: "url",
            //     cache: false,
            //     dataType: "json",
            //     type: "POST",
            //     data: data,
            //     success: function() {
            //         $(".btn-sign-up").attr("disabled", false);
            //         $('.select2-selection__rendered').html("");
            //         form.reset();
            //         showSuccessFormModal();
            //     },
            //    error:function({errorFields}){
            // example
            //         const errorFields = [
            //             {
            //                 field: "first-name",
            //                 message: "At least 3 characters",
            //             },
            //             {
            //                 field: "home-address",
            //                 message: "At least 5 characters",
            //             }
            //         ];

            //         if (errorFields.length) {
            //             errorWithFields(errorFields)
            //         } else {
            //             showErrorFormModal();
            //         }
            //         $(".btn-sign-up").attr("disabled", false);
            //     }
            // }); 
            
            
            //test 
            const urlParams = new URLSearchParams(window.location.search);
            const TEST_ERROR = urlParams.has('test_error');
            const TEST_ERROR_FIELDS = urlParams.has('test_error_fields');

            if (TEST_ERROR) {
                testApi(showErrorFormModal);
            } else if (TEST_ERROR_FIELDS) {
                testApi(errorWithFields);
            } else {
                testApi(showSuccessFormModal)
                form.reset();
                $('.select2-selection__rendered').html("");
            }
        }
    });

    const ERRORS = [
        {
            field: "first-name",
            message: "At least 3 characters",
        },
        {
            field: "home-address",
            message: "At least 5 characters",
        }
    ];

    function errorWithFields(errors = ERRORS) {

        if (errors.length) {
            errors.forEach((error, index) => {
                const elementWithError = `#${error.field}`;
                $(elementWithError).next().html(`<label id="${error.field}-error" class="error" for="${error.field}" style="">${error.message}</label>`);
                $(elementWithError).addClass("is-invalid");
                if(index === 0) {
                    const firstElement = document.getElementById(error.field);
                    firstElement.scrollIntoView({ block: 'center', behavior: 'smooth' });  
                }
            });
        }
    }

    function testApi(response) {
        setTimeout(() => {
            response();
            $(".btn-sign-up").attr("disabled", false);
        }, 1000);
    }

    function showSuccessFormModal() {
        let formModalPopUpMsg = new bootstrap.Modal(document.getElementById('modalMsgForm'));
        if (formModalPopUpMsg) {
            if (!$('#modalMsgForm').hasClass('show')) {
                formModalPopUpMsg.show()
            }    
        }   
    }

    function showErrorFormModal() {
        let formModalPopUp = new bootstrap.Modal(document.getElementById('mainFormAction'));
        if (formModalPopUp) {
            if (!$('#mainFormAction').hasClass('show')) {
                formModalPopUp.show()
            }    
        }   
    }
  
});