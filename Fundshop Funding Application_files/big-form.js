var rejectListEmailDomain = [
    "icloud.com", 
    "ymail.com", 
    "ukr.net"
];

let searchParams = new URLSearchParams(window.location.search);

/*if (searchParams.has('mn')) {
    console.log(searchParams.get('mn'));
}*/

$(function() {
    $(document).ready(function() {

        $("#arrsec1-inputZip_ma").keyup(function(){
          getZipFN('arrsec1-inputZip_ma', '#arrsec1-inputCity_ma', '#input8', '#arrsec1-inputState_ma');
        });

        $("#arrsec1-inputZip_1").keyup(function(){
          getZipFN('arrsec1-inputZip_1', '#arrsec1-inputCity_1', '#arrsec1-inputAddr_1', '#arrsec1-inputState_1');
        });

        $("#arrsec2-inputZip_2").keyup(function(){
          getZipFN('arrsec2-inputZip_2', '#arrsec2-inputCity_2', '#arrsec2-inputAddr_2', '#arrsec2-inputState_2');
        });

        $("#arrsec2-2-inputZip_3").keyup(function(){
          getZipFN('arrsec2-2-inputZip_3', '#arrsec2-2-inputCity_3', '#arrsec2-2-inputAddr_3', '#arrsec2-2-inputState_3');
        });

        //check email domain load page
        //forEmailDomainCheck();

        //$('form, input, select').attr('autocomplete', 'nope');
        //select2 - field Industry Type
        //$('#input-inds-typ').select2();

        //valid 2nd OWNER INFORMATION
        //$("#arrsec2-2 input").keyup(function() {
        $('#arrsec2-2 :input').on("keyup change", function () {
            actChFl("#"+$(this).attr("id"));
        });

        //multyselect file
        $('.file__up_inp').MultiFile({
            //max: $('.file__up_inp').attr('max-count'),
            list: '.fileList',
            separator: ',<br> ',
            afterFileSelect: function(element, value, master_element) {
              $('.btn_slc_f').attr('for', $('#fileup input').last().attr('id'))
              if ($('.file_up_l').css('display') == 'none') {
                $('.file_up_l').css('display', 'block') 
              }
            },
            afterFileRemove: function(element, value, master_element) {
              if ($('.fileList').text().length == 0) {
                $('.file_up_l').css('display', 'none') 
              }
            },
            STRING: {
              remove:'&#10006;',
              file: '$file, $size',
              selected:'$file, $size'
            }
        });
        $('.btn_slc_f').attr('for', $('#fileup input').last().attr('id'));

        var todaya = new Date();
        var dda = todaya.getDate();
        var mma = todaya.getMonth()+1; //January is 0!
        var yyyya = todaya.getFullYear();
        $('#input6').datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy',
            startDate: '-120y',
            endDate: mma+'/'+dda+'/'+yyyya
        }).on('changeDate', function(e) {
            $('#input6').blur();
        });
        $('#input19').datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy',
            startDate: '-120y',
            endDate: mma+'/'+dda+'/'+(yyyya - 18)
        }).on('changeDate', function(e) {
            $('#input19').blur();
        });
        $('#input27').datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy',
            startDate: '-120y',
            endDate: mma+'/'+dda+'/'+(yyyya - 18)
        }).on('changeDate', function(e) {
            $('#input27').blur();
        });
        
    });

    $('#big-form').submit(function(){
        var fldfl = $("input[name^='fileup[]']"); 
        if(fldfl.val() == '' && searchParams.has('mn') == false) { 
            $('.file__el').attr('style', 'border-color: #ff0018 !important;background-color: #fff3f3 !important;');
            //alert("Please add a PDF files"); 
            document.getElementById("fileup").scrollIntoView();
            return false; 
        }else{
            $('.file__el').attr('style', 'border-color: rgba(33, 150, 83, 0.6) !important;background-color: #fff !important;');
            $("#btn-big-form").addClass('btn_send');
            $("#btn-big-form").prop("disabled", true);
        }
    });
		
    /*
    * File Drag and Drop
    */
    /*var filesToUpload = [];
    var input_f = $("#fld_dsd_1");
    var mxsFile = input_f.attr('max-size');
    var mxCnFile = input_f.attr('max-count');

    $.fn.fileUploader = function (filesToUpload) {
    this.closest(".files").change(function (evt) {

        $(".fileList").html('');
        $(".btn_clf").html('');

        for (var i = 0; i < evt.target.files.length; i++) {
            filesToUpload.push(evt.target.files[i]);
        };
        var output = [];
        var outputRess = [];
        var count_fl = 0;
        var filemxerr = true;

        for (var i = 0, f; f = evt.target.files[i]; i++) {
            if (i <= mxCnFile-1) {
                if (f.size > mxsFile) {
                    output.push({key: "flsfile", val: "<li class='file__err_sz'>"+f.name+" ("+bytesToSize(f.size)+") - <strong>Error, max file size: "+bytesToSize(mxsFile)+"</strong></li>"});
                }else{
                    output.push({key: "trufile", val: "<li class='file__tr_sz'>"+f.name+" - "+bytesToSize(f.size)+"</li>"});
                }
            }

            count_fl = i;
        }

        for (var i = 0, fcha; fcha = output[i]; i++) {
            if (fcha.key == "flsfile") {
                outputRess.push(fcha.val);
                filemxerr = false;
                clearFiList();
            }
        }

        for (var i = 0, fchb; fchb = output[i]; i++) {
            if (filemxerr == true) {
                if (fchb.key == "trufile") {
                    outputRess.push(fchb.val);
                }
            }
        }

        if (count_fl <= mxCnFile-1) {
            if (outputRess.length !== 0) {
                $(".file_up_l").children(".fileList").append("<ol>"+outputRess.join("")+"</ol>");
                if (filemxerr == true) {
                    $(".file_up_l").children(".btn_clf").append("<button type='button' class='btn btn-warning' onclick='clearFileList();'>Clear list</button>");
                }
                $(".file_up_l").show();
            }else{
                clearFileList();
            }
        }else{
            clearFiList();
            $(".file_up_l").children(".fileList").append("<span class='file__err_sz'><strong>Error, Max count of files: "+mxCnFile+"</strong></span>");
            $(".file_up_l").show();
        }
        
    });
    };

    $("#fileup").fileUploader(filesToUpload);*/

});

// OnKeyDown ZIP Code Function 
//idz - Zip Code
//idct - City
//idad - Address
//idst - State
var valzip;
function getZipFN(idz, idct, idad, idst) {  

    if (($.isNumeric($("#"+idz).val()) == true)) {
        if (($("#"+idz).val().length == 5) && ($("#"+idz).hasClass("error_zip") !== true) && ($("#"+idz).val() !== valzip)){
            $("#"+idz).parent().addClass("zip_load");

            $.ajax({
                url: "https://api.zippopotam.us/us/" + $("#"+idz).val(),
                cache: false,
                dataType: "json",
                type: "GET",
                success: function(result, success) {
                    $("#"+idz).parent().removeClass("zip_load");
                    /*$(idct).prop("disabled", false);
                    $(idad).prop("disabled", false);
                    $(idst).prop("disabled", false);*/
    
                    $(idst).find('option').removeAttr("selected");
    
                    places = result['places'][0];
                    
                    $(idct).val(places['place name']);
                    $(idst).val(places['state']);

                    $("#"+idz).addClass('success_zip').removeClass('error_zip');
 
                    $(idct).removeClass("error");
                    $(idad).removeClass("error");
                    $(idst).removeClass("error");

                    $(idct).parent().removeClass("has-error");
                    $(idad).parent().removeClass("has-error");
                    $(idst).parent().removeClass("has-error");

                    $(idct).siblings(".help-block").remove();
                    $(idad).siblings(".help-block").remove();
                    $(idst).siblings(".help-block").remove();

                    $(idct).css("border-color", "#ced4da");
                    $(idad).css("border-color", "#ced4da");
                    $(idst).css("border-color", "#ced4da");


                    //$(idad).focus();
    
                    if ($("#"+idz+"-error").text().length > 0) {
                        $("#"+idz+"-error").html('');
                        $("#"+idz+"-error").hide();
                    }
                    valzip = $("#"+idz).val();
                    //remDisBtn();
                },
                error: function(result, success) {
                    $("#"+idz).parent().removeClass("zip_load");
                    //$(idct).val('');
                    //$(idad).val('');
                    //$(idst).val('');
    
                    /*$(idct).prop("disabled", true);
                    $(idad).prop("disabled", true);
                    $(idst).prop("disabled", true);*/
    
                    $("#"+idz).removeClass('success_zip').addClass('error_zip');
    
                    if ($("#"+idz+"-error").text().length == 0) {
                        $("#"+idz+"-error").html('Zip code not found');
                        $("#"+idz+"-error").show();
                    }
                    valzip = $("#"+idz).val();
                    //addDisBtn();
                }
            });
            
        }else if(($("#"+idz).val().length < 5)) {
            $("#"+idz).removeClass('error_zip');
            removeElementErr(idz);
        }
    }else{
        valzip = $("#"+idz).val();
        //$(idct).val('');
        //$(idad).val('');
        //$(idst).val('');

        /*$(idct).prop("disabled", true);
        $(idad).prop("disabled", true);
        $(idst).prop("disabled", true);*/
        removeElementErr(idz);
    }
    
}

//plugin validator 
$.formUtils.addValidator({
    name : 'domn',
    validatorFunction : function(value, $el, config, language, $form) {
        if (
            value.indexOf("facebook") > 0 || 
            value.indexOf("Facebook") > 0 ||
            value.indexOf("FACEBOOK") > 0
        ) {
            return false;
        }else{
            return true;
        }
    },
    errorMessage : 'Please enter company\'s official website',
    errorMessageKey: 'badEvenNumber'
});
$.validate({
    lang : 'en',
    modules : 'security, date',
    scrollToTopOnError : false
});

//valid 2nd OWNER INFORMATION
function actChFl(valId) {
    var isValid = false;
    $("#arrsec2-2 input, #arrsec2-2 select").each(function() {
        var element = $(this);
        if (element.val() !== "" && element.val() !== null) {
            isValid = true;
        }
    });

    if(!$(valId).prop('required')){
        if (isValid == true) {
            requiredElemSt("true");
        }
    }else if(isValid == false){
        requiredElemSt("false");
    }
}
function requiredElemSt(st) {
    if (st == "true") {
        /*$("#data-2nd-user input").prop('required',true);
        if ($("#data-2nd-user").css('display') == 'none') {
            $("#data-2nd-user input").val('');
            $("#data-2nd-user").show();
        }*/
        if ($(".requ__ff").css('display') == 'none') {
            $(".requ__ff").show();
        }
        
        if(!$("#arrsec2-2 input").prop('required')){
            $("#arrsec2-2 input").prop('required',true);
        }
    }else{
        /*$("#data-2nd-user input").prop('required',false);
        if ($("#data-2nd-user").css('display') !== 'none') {
            $("#data-2nd-user input").val('');
            $("#data-2nd-user").hide();
        }*/
        if ($(".requ__ff").css('display') !== 'none') {
            $(".requ__ff").hide();
        }
        if($("#arrsec2-2 input").prop('required')){
            $("#arrsec2-2 input").prop('required',false);
        }
    }
}

function removeElementErr(elementId) {
    // Removes an element from the document
    if ($("#"+elementId+"-error").text().length > 0) {
        $("#"+elementId+"-error").html('');
        $("#"+elementId+"-error").hide();
    }
}

function file_up_l() {
    $(".file_up_l").hide();
}

function clearFiList() {
  $("#fld_dsd_1").replaceWith($("#fld_dsd_1").val('').clone(true).removeAttr('required'));
};

function clearFileList() {
  $(".fileList").html('');
  $(".btn_clf").html('');
  file_up_l();
  clearFiList();
};

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function addDisBtn() {
    $("#btn-big-form").prop("disabled", true);
}

function remDisBtn() {
    $("#btn-big-form").prop("disabled", false);
}

function checkEmailDomainDeny(emailGet, fieldid) {

    //var emailValue = $('#email-input').val(); // To Get Value (can use getElementById)
    var emailValue = emailGet.val();
    var splitArray = emailValue.split('@'); // To Get Array

    if(rejectListEmailDomain.indexOf(splitArray[1]) < 0) {
        if ($("#"+fieldid+"-error").text().length != 0) {
            $("#"+fieldid+"-error").html('');
            $("#"+fieldid+"-error").hide();
            $("#"+fieldid).removeClass('error-email');
            
        }
    }

    if(rejectListEmailDomain.indexOf(splitArray[1]) >= 0) {
        if ($("#"+fieldid+"-error").text().length == 0) {
            $("#"+fieldid+"-error").html('This email domain deny');
            $("#"+fieldid+"-error").show();
            $("#"+fieldid).addClass('error-email');
            
        }
    }

    return true;
}

/*function forEmailDomainCheck() {
    var getAllEmailEl = $("input[type='email']");
    $(getAllEmailEl).each(function() {
        var emailFieldLoad = $(this);
        if (emailFieldLoad.val() !== "" && emailFieldLoad.val() !== null) {
            checkEmailDomainDeny(emailFieldLoad, emailFieldLoad.attr("id"));
        }
    }); 

    if (forEmailDomainCheckBtnStatus(getAllEmailEl) == false) {
        addDisBtn();
    }else{
        remDisBtn();
    }
}

function forEmailDomainCheckBtnStatus(getAllEmailEl) {
    if (getAllEmailEl) {
        var stsfor = true;
        $(getAllEmailEl).each(function() {
            var emailField = $(this);
            if (emailField.val() !== "" && emailField.val() !== null) {
                var emailVal = emailField.val();
                var splitArr = emailVal.split('@');
                if(rejectListEmailDomain.indexOf(splitArr[1]) >= 0) {
                    stsfor = false;
                    return false;
                }
            }
        }); 

        return stsfor;  
    }
}*/