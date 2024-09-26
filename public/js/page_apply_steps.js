var valzip;

//Form Validation
//$("#apply-steps").validate();
//var formSteps = $( "#apply-steps" );

var curStepTwndOwner = $("#step-twnd-owner");
var buttonAddTwndOwner = $('#as-form-button-twnd-owner');

var buttonSend = $('#as-form-button-submit');
var buttonNext = $('#as-form-button-next');
var formMaxStep = 4;

var todaya = new Date();
var dda = todaya.getDate();
var mma = todaya.getMonth()+1; //January is 0!
var yyyya = todaya.getFullYear();

var ddaim = dda;
var mmaim = mma;

if(dda<10){
    ddaim='0'+dda
} 
if(mma<10){
    mmaim='0'+mma
} 

var today_bsd = yyyya+'-'+mmaim+'-'+ddaim;
var today_bsd_m = (yyyya-70)+'-'+mmaim+'-'+ddaim;
var today_dob = (yyyya-18)+'-'+mmaim+'-'+ddaim;

//document.getElementById("input27").setAttribute("max", today_dob);
/* ---- */

$(function() {
    $(document).ready(function() {
        
        //multyselect file
        $('.file__up_inp').MultiFile({
            max: coutnLimitFiles,
            list: '.fileList',
            separator: ',<br> ',
            afterFileSelect: function(element, value, master_element) {
              $('.btn_slc_f').attr('for', $('#fileup input').last().attr('id'))
              if ($('.file_up_l').css('display') == 'none') {
                $('.file_up_l').css('display', 'block');
                $('.file_up_l .files_list_uploads_tt').css('display', 'block');
              }
            },
            afterFileRemove: function(element, value, master_element) {
              if ($('.fileList').text().length == 0) {
                $('.file_up_l').css('display', 'none') 
                $('.file_up_l .files_list_uploads_tt').css('display', 'none') 
              }
            },
            STRING: {
              remove: '<button class="files_list_uploads_itm_del_btn" title="Delete" type="button" aria-label="Delete file"><span class="files_list_uploads_itm_del_ico"></span></button>',
              file: '$file, $size',
              selected:'$file, $size'
            }
        });
        $('.btn_slc_f').attr('for', $('#fileup input').last().attr('id'));

        //remove:'&#10006;',
        //file: '$file, $size',

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
            adaptiveHeight:false,
            autoplay:true,
            autoplaySpeed:5000,
            slidesToShow:1,
            slidesToScroll:1
        });
        
        $('#inp-bus-business-start-date').datepicker({
            autoclose: true,
            format: 'mm.dd.yyyy',
            startDate: '-120y',
            endDate: mma+'.'+dda+'.'+yyyya
        }).on('changeDate', function(e) {
            $('#inp-business-start-date').blur();
        });


        $('#inp-owner-a-date-of-birth').datepicker({
            autoclose: true,
            format: 'mm.dd.yyyy',
            startDate: '-120y',
            endDate: mma+'.'+dda+'.'+(yyyya - 18)
        }).on('changeDate', function(e) {
            $('#inp-owner-a-date-of-birth').blur();
        });
        $('#inp-owner-b-date-of-birth').datepicker({
            autoclose: true,
            format: 'mm.dd.yyyy',
            startDate: '-120y',
            endDate: mma+'.'+dda+'.'+(yyyya - 18)
        }).on('changeDate', function(e) {
            $('#inp-owner-b-date-of-birth').blur();
        });
        $('#input27').datepicker({
            autoclose: true,
            format: 'mm.dd.yyyy',
            startDate: '-120y',
            endDate: mma+'.'+dda+'.'+(yyyya - 18)
        }).on('changeDate', function(e) {
            $('#input27').blur();
        });

        $('#step-twnd-owner input').blur(function() {
            checkTwNdOwnerField();
        });

        formSteps.keypress(function(){
            formSteps.find('.invalid_cs_inp').remove();
            //formSteps.valid();
        });

        /*$("#as-form-button-submit").on("click", function() {
            validInputByStep(4);
        });*/ 

        //Sticky menu bar
        $('#as-side-l-itm').stickySidebar({
            topSpacing: 10,
            bottomSpacing: 0,
            minWidth: 980
        });

        $("#bitton-mob-menu").on('click', function(e){
            menuBtnMob();
        });

        $(".form_input_zip").keyup(function(){
            let idInpzip = $(this).data('inpzipcode');
            let idInpcity = $(this).data('inpcity');
            let idInpaddress = $(this).data('inpaddress');
            let idInpstate = $(this).data('inpstate');

            getZipFN(idInpzip, idInpcity, idInpaddress, idInpstate);
        });

        $(".files_list_uploads_itm_del_btn").on('click', function(e){
            let getidh = $(this).data('idh');
            let getoldname = $(this).data('oldname');

            applyStpdelFileItm(getidh, getoldname);
        });

        $("#as-form-button-twnd-owner").on('click', function(e){
            asButtonAddTwndOwner();
        });

    });
});

function menuBtnMob() {
    console.log("222");
    if ($(document).width() <= 980) {
        console.log("111");
        let getHeaderMn = $('#main');
        if (!getHeaderMn.hasClass('mob_active')) {
            $('html, body').animate({
                "scrollTop": $('body').offset().top
            }, 100);
            getHeaderMn.addClass('mob_active');
            //$('.mob_active .header_nav').fadeIn(100);
            $('.mob_active .as_steps_ls').addClass('mob_menu_h');
            //$('body').css("overflow", "hidden");
        }else{
            //$('.mob_active .header_nav').fadeOut(50);
            $('.mob_active .as_steps_ls').removeClass('mob_menu_h');
            getHeaderMn.removeClass('mob_active');
            //$('body').css("overflow", "auto");
        }
    }
}

/*function asNavNextStep(step) {
    if (!step) return false;

    let curStep = step;
    if (step > 1 && step !== 4) {
      curStep = (step-1);
    }else if (step == 4) {
      curStep = 2;
    }

    if(validInputByStep(curStep) === true) {
        $(".as_steps_itm").removeClass("as_subm_active");
        
        if (step <= formMaxStep) {
            let setStep = step;
            //if (step == formMaxStep) {
            //    setStep = step-1;
          // }

            buttonAddTwndOwner.hide();
            //asClearHideTwndOwner();
            if (step == "2") {
                if (!buttonAddTwndOwner.is(':visible')) {
                    buttonAddTwndOwner.show();
                }
            }
          

            $(".as_form_steps").removeClass("as_inp_active");
            $('#step'+setStep).addClass("as_inp_active");
            
            if (buttonSend.is(':visible')) {
                buttonSend.hide();
                buttonNext.show();
            }
        }
        if(step == formMaxStep) {
            if (!buttonSend.is(':visible')) {
                buttonSend.show();
                buttonNext.hide();
            }
        }
        
        $('.as_steps_itm_step'+step).addClass("as_subm_active");

    }
}*/

function asButtonAddTwndOwner() {
    if (!curStepTwndOwner.is(':visible')) {
        if (curStepTwndOwner.hasClass("step_twnd_owner_dsn")) {
            curStepTwndOwner.removeClass('step_twnd_owner_dsn');
        }else{
            curStepTwndOwner.show();
        }
        buttonAddTwndOwner.hide();
        $('html, body').animate({
            "scrollTop": curStepTwndOwner.offset().top-10
        }, 100);
        $('#inp-owner-b-full-name').focus();
    }else{
        curStepTwndOwner.hide();
        buttonAddTwndOwner.show();
    }
}

/*function asClearHideTwndOwner() {
    curStepTwndOwner.hide();
    $('#step-twnd-owner input').val('');
    //$('#step-twnd-owner option:selected').remove();
    //$('#step-twnd-owner').find('option:selected').remove();
    $('#step-twnd-owner').prop('selectedIndex', 0); 
}*/

/*function asButtonNextStep() {
    let curStep = $(".as_inp_active").data("step");
    let nextStep = curStep+1;

    if (validInputByStep(curStep) === true) {
        if (nextStep) {
            asNavNextStep(nextStep);
        }
    }    
}*/

function checkAllInputs(idl) {
  if (!idl) return false;

  let checkInputs = false;

  $("#"+idl+" input, #"+idl+" select").removeClass("ignore inp_invalid");
  $("#"+idl+" input, #"+idl+" select").removeAttr("required");
  $("#"+idl+" .inp-req-hd, #"+idl+" span.inp_invalid").hide();

  $("#"+idl+" input").each(function() {
      if ($.trim($(this).val()).length > 0) {
          checkInputs = true;
          return;
      }
  });

  $("#"+idl+" select").each(function() {
      if ($.trim($(this).find(":selected").val()).length > 0) {
          checkInputs = true;
          return;
      }
  });

  if (checkInputs === false) {
      $("#"+idl+" input, #"+idl+" select").addClass("ignore");
  }

  if (checkInputs === true) {
      $("#"+idl+" input, #"+idl+" select").prop("required", true);
      $("#"+idl+" .inp-req-hd").show();
  }

  return checkInputs;
}

function checkInputInvalid(sectId) {
  let checkClass = true;

  $("#"+sectId+" input").each(function() {
      if ($(this).hasClass("inp_invalid")) {
          checkClass = false;
          return;
      }
  });

  $("#"+sectId+" select").each(function() {
      if ($(this).hasClass("inp_invalid")) {
          checkClass = false;
          return;
      }
  });

  return checkClass;
}

function checkTwNdOwnerField() {
    //let grTwndOwner = $("#step-twnd-owner");
    //let checkInputsNotEmpty = checkAllInputs('step-twnd-owner');
    let meth = false;
  
    if ($("#step-twnd-owner").is(':visible') && checkAllInputs('step-twnd-owner') === true) {
        meth = true;
    } 
    
    inpTwNdOwnerRules(meth);
  
    return meth;
}

function validInputByStep(step) {
  
    if (!formSteps) return false;

    var checkValid = false;
    let stepId = "step"+step;
    let globlMsgEl = $("#msg-alert-js");


    if (step === 2) {
        checkValid = checkTwNdOwnerField();
    }
    
    //if (checkValid === false) {
        checkValid = formSteps.valid();

        if (checkInputInvalid(stepId) === true && checkValid === false) {
            globlMsgEl.html("");
            return true;
        }
    //}    

    globlMsgEl.html("<span class='inp_invalid'>Please check that all input fields are correct</span>");


    /*let checkValid = formSteps.valid();

    if (checkValid === true) {
        return true;
    } */  

    return false;
}

function inpTwNdOwnerRules(meth) {

  if (meth == false) {
      $( "#inp-owner-b-full-name" ).rules( "remove" );
      $( "#inp-owner-b-home-address" ).rules( "remove" );
      $( "#inp-owner-b-home-zip-code" ).rules( "remove" );
      $( "#inp-owner-b-home-state" ).rules( "remove" );
      $( "#inp-owner-b-home-city" ).rules( "remove" );
      $( "#inp-owner-b-date-of-birth" ).rules( "remove" );
      $( "#inp-owner-b-social-security" ).rules( "remove" );
      $( "#inp-owner-b-of-ownership" ).rules( "remove" );
      $( "#inp-owner-b-phone" ).rules( "remove" );
      $( "#inp-owner-b-email-address" ).rules( "remove" );
  }else if (meth == true) {
      $( "#inp-owner-b-full-name" ).rules( "add", {
          required: true,
          minlength: 5,
          maxlength: 350,
          messages: {
            required: "Please Enter Full Name"
          }
      });

      $( "#inp-owner-b-home-address" ).rules( "add", {
          required: true,
          minlength: 5,
          maxlength: 300,
          messages: {
            required: "Please Enter Home Address"
          }
      });

      $( "#inp-owner-b-home-zip-code" ).rules( "add", {
          required: true,
          minlength: 5,
          maxlength: 5,
          number: true,
          messages: {
            required: "Please Enter Home ZIP Code"
          }
      });

      $( "#inp-owner-b-home-state" ).rules( "add", {
          required: true,
          maxlength: 100,
          messages: {
            required: "Please Select Home State"
          }
      });

      $( "#inp-owner-b-home-city" ).rules( "add", {
          required: true,
          maxlength: 100,
          messages: {
            required: "Please Select Home City"
          }
      });

      $( "#inp-owner-b-date-of-birth" ).rules( "add", {
          required: true,
          maxlength: 11,
          messages: {
            required: "Please Select Date of Birth"
          }
      });

      $( "#inp-owner-b-social-security" ).rules( "add", {
          required: true,
          minlength: 9,
          maxlength: 9,
          number: true,
          messages: {
            required: "Please Enter Social Security"
          }
      });

      $( "#inp-owner-b-of-ownership" ).rules( "add", {
          required: true,
          minlength: 1,
          maxlength: 3,
          min: 0,
          max: 100,
          number: true,
          messages: {
            required: "Please Enter Social Security"
          }
      });

      $( "#inp-owner-b-phone" ).rules( "add", {
          required: true,
          minlength: 10,
          maxlength: 10,
          phoneUS: true,
          messages: {
            required: "Please Enter Phone"
          }
      });

      $( "#inp-owner-b-email-address" ).rules( "add", {
          required: true,
          maxlength: 100,
          email: true,
          messages: {
            required: "Please Enter Email Address"
          }
      });
  }
  
}

// OnKeyDown ZIP Code Function 
//idz - Zip Code
//idct - City
//idad - Address
//idst - State
function getZipFN(idz, idct, idad, idst) {  

    if (($.isNumeric($("#"+idz).val()) == true)) {
        if (($("#"+idz).val().length == 5) && ($("#"+idz).hasClass("error_zip") !== true) && ($("#"+idz).val() !== valzip)){
            $("#"+idz).parent().addClass("form_input_zip_loader");

            $.ajax({
                url: "https://api.zippopotam.us/us/" + $("#"+idz).val(),
                cache: false,
                dataType: "json",
                type: "GET",
                success: function(result, success) {
                    $("#"+idz).parent().removeClass("form_input_zip_loader");
                    /*$(idct).prop("disabled", false);
                    $(idad).prop("disabled", false);
                    $(idst).prop("disabled", false);*/
    
                    $(idst).find('option').removeAttr("selected");
    
                    places = result['places'][0];
                    
                    $(idct).val(places['place name']);
                    $(idst).val(places['state']);

                    $("#"+idz).addClass('success_zip').removeClass('error_zip');
 
                    $(idct).removeClass("inp_invalid");
                    //$(idad).removeClass("inp_invalid");
                    $(idst).removeClass("inp_invalid");

                    /*$(idct).parent().removeClass("has-error");
                    $(idad).parent().removeClass("has-error");
                    $(idst).parent().removeClass("has-error");*/

                    $(idct).siblings(".inp_invalid").hide();
                    //$(idad).siblings(".inp_invalid").hide();
                    $(idst).siblings(".inp_invalid").hide();

                    $(idct).css("border-color", "#F3F7F4");
                    //$(idad).css("border-color", "#F3F7F4");
                    $(idst).css("border-color", "#F3F7F4");

                    //$(idad).focus();
    
                    if ($("#"+idz+"-zip-error").text().length > 0) {
                        $("#"+idz+"-zip-error").html('');
                        $("#"+idz+"-zip-error").hide();
                    }
                    valzip = $("#"+idz).val();
                    //remDisBtn();
                },
                error: function(result, success) {
                    $("#"+idz).parent().removeClass("form_input_zip_loader");
                    //$(idct).val('');
                    //$(idad).val('');
                    //$(idst).val('');
    
                    /*$(idct).prop("disabled", true);
                    $(idad).prop("disabled", true);
                    $(idst).prop("disabled", true);*/
    
                    $("#"+idz).removeClass('success_zip').addClass('error_zip');
    
                    if ($("#"+idz+"-zip-error").text().length == 0) {
                        $("#"+idz+"-zip-error").html('Zip code not found');
                        $("#"+idz+"-zip-error").show();
                    }
                    valzip = $("#"+idz).val();
                    //addDisBtn();
                }
            });
            
        }else if(($("#"+idz).val().length < 5)) {
            $("#"+idz).removeClass('error_zip');
            rhElZipErr(idz);
        }
    }else{
        valzip = $("#"+idz).val();
        //$(idct).val('');
        //$(idad).val('');
        //$(idst).val('');

        /*$(idct).prop("disabled", true);
        $(idad).prop("disabled", true);
        $(idst).prop("disabled", true);*/
        rhElZipErr(idz);
    }
    
}

function rhElZipErr(elementId) {
  if ($("#"+elementId+"-zip-error").text().length > 0) {
      $("#"+elementId+"-zip-error").html('');
      $("#"+elementId+"-zip-error").hide();
  }
}

function applyStpdelFileItm(fld, fln) {
    if (fld && fln && pathToDelFlAppl) {

        if (!sc_tknm || !sc_tkv) {
            console.log("Data error");
            return;
        }

        //return;

        $(`#apply-file-ritm-${fld} .files_list_uploads_box_del`).fadeIn();

        $.ajax({
            url: pathToDelFlAppl,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json',
            data:{
                [sc_tknm]: sc_tkv,
                dfl: fld
            },
            success: function(data){

                if (data.tn || data.th) {
                    sc_tknm = data.tn;
                    sc_tkv = data.th;
                    $(`input[name="${data.tn}"]`).val(data.th);
                }

                setTimeout(function() {
                    if (data.status == true) {
                        $(`#apply-file-ritm-${fld} .files_list_uploads_box_delcon`).html(`<span class='files_list_uploads_box_delcon_succes'>${data.msg} - ${fln}</span>`);

                        setTimeout(function() {
                            $('#apply-file-ritm-'+fld).remove();

                            if (!$('.files_list_uploads_itm').length) {
                                $('.files_list_uploads').remove();
                                $('.button_al_submit_form').remove();                                
                            }
                        }, 2000);
                    }else if(data.status == false) {
                        $(`#apply-file-ritm-${fld} .files_list_uploads_box_delcon`).html(`<span class='files_list_uploads_box_delcon_err'>${data.msg}</span>`);
                    }
                }, 1000);
            },
            error: function (jqXHR, exception) {
                var sherr;
                if (jqXHR.status === 0) {
                    sherr = 'Not connect. Verify Network.';
                } else if (jqXHR.status == 404) {
                    sherr = 'Requested page not found (404).';
                } else if (jqXHR.status == 500) {
                    sherr = 'Internal Server Error (500).';
                } else if (exception === 'parsererror') {
                    sherr = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    sherr = 'Time out error.';
                } else if (exception === 'abort') {
                    sherr = 'Ajax request aborted.';
                } else {
                    sherr = 'Uncaught Error.';
                }
                $(`#apply-file-ritm-${fld} .files_list_uploads_box_del`).hide();
                if (sherr) {
                    console.log(sherr);
                    alert(sherr);
                }
            }
        });
    }else{
        console.log("Data transfer error")
    }
}