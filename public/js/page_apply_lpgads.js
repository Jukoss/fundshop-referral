$(function() {
    $(document).ready(function() {
        BLC.initNumericalSlider(); 

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

        formSteps.keypress(function(){
            formSteps.find('.invalid_cs_inp').remove();
            //formSteps.valid();
        });

        setTimeout(function() {
            $('#apply-lpgads-main').animate({opacity: 1}, 500);
        }, 500);
    });
});

var BLC = {
    initNumericalSlider: function(){
        var loan_range_slider = document.getElementById('form_ln_price_range');
        
        if(loan_range_slider){
            let valSaveOld = 10000;

            if (val_amount_requested_hdn.length > 0) {
                //valSaveOld = accounting.formatNumber(val_amount_requested_hdn);
                valSaveOld = Math.floor(val_amount_requested_hdn);
            }

            noUiSlider.create(loan_range_slider, {
                start: valSaveOld,
                step: 10000,
                range: {
                    'min': 10000,
                    'max': 2000000
                }
            });
            
            loan_range_slider.noUiSlider.on('update', function( values, handle ) {
                let lv = values[handle];

                /*if (lv == "10000.00") {
                    lv = valSaveOld;
                }*/        

                let formatted_lv = accounting.formatNumber(lv);

                $('#owner-mdyn-pr').val("$"+formatted_lv);
                $('#owner-mdyn-pr-hd').val(lv);
            });
        }
    },
}

/*function applyStpdelFileItm(fld, fln) {
    if (fld && fln && pathToDelFlAppl) {

        if (!sc_tknm || !sc_tkv) {
            console.log("Data error");
            return;
        }

        return;

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
}*/

function hideForm() {
    setTimeout(function() {
        $('#apply-lpgads-main').animate({opacity: 0}, 500);
    }, 500);
    setTimeout(function() {
        $('#apply-lpgads-sent-msg').show().animate({opacity: 1}, 500);
    }, 1000);
}
