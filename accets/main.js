var docWidth = "";

//$(window).on("resize", function(event){
//    docWidth = getResizeWdth();
//});

$(function() {
    $("body").removeClass("no-transition");
});
$(document).ready(function() {

    //Cherck Form Errors and Scroll
    checkFormPopUpErrorPost();

    //Cherck Form Msg
    checkFormPopUpErrorRessMsg();
    
    //Cherck Form Errors and Scroll
    checkFormErrorPost();

    headerResizeScroll();
    $(window).scroll(function(){
        //let scrpos = $(document).scrollTop();
        headerResizeScroll();
    });

    $('.form_input, .form_input_select').on("keyup, change", function() {
        let valinp = $(this).val();
        if (valinp.length > 0) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
            }
        }else{
            $(this).removeClass('active');
        }
    });

    $('#mainButtonsPrograms').on('show.bs.modal', function (e) {
        $('body').addClass("popprog_active");
    }).on('hide.bs.modal', function (e) {
        $('body').removeClass("popprog_active");
    });

    //disabled click link
    $("a.disclk").click(function(event){
        event.preventDefault();
        return;
    });
    
    $("#button-abspprg-itm").on('click', function(e){
        let getSectNavAb = $('.section_page_navbar_nav');
        if (!getSectNavAb.hasClass('mob_active')) {
            getSectNavAb.addClass('mob_active');
            //$("#header").addClass('nav_mob_active');
            $('.section_page_navbar_nav_menu').fadeIn(100);
        }else{
            $('.section_page_navbar_nav_menu').fadeOut(50);
            getSectNavAb.removeClass('mob_active');
            //$("#header").removeClass('nav_mob_active');
        }
    });

    if (typeof val_state !== "undefined") {
        if (val_state.length > 0) {
            $('form select[name="state"] option').removeAttr('selected').filter(`[value='${val_state}']`).attr('selected', true);
        }
    }
    if (typeof val_monthly_gross_sales !== "undefined") {
        if (val_monthly_gross_sales.length > 0) {
            $('form select[name="monthly_gross_sales"] option').removeAttr('selected').filter(`[value='${val_monthly_gross_sales}']`).attr('selected', true);
        }
    }
    if (typeof val_amount_requested !== "undefined") {
        if (val_amount_requested.length > 0) {
            $('form select[name="amount_requested"] option').removeAttr('selected').filter(`[value='${val_amount_requested}']`).attr('selected', true);
        }
    }
    if (typeof val_personal_credit_score !== "undefined") {
        if (val_personal_credit_score.length > 0) {
            $('form select[name="personal_credit_score"] option').removeAttr('selected').filter(`[value='${val_personal_credit_score}']`).attr('selected', true);
        }
    }
    if (typeof val_industry_type !== "undefined") {
        if (val_industry_type.length > 0) {
            $('form select[name="industry_type"] option').removeAttr('selected').filter(`[value='${val_industry_type}']`).attr('selected', true);
        }
    }
    if (typeof val_use_of_funds_hdn !== "undefined") {
        if (val_use_of_funds_hdn.length > 0) {
            $('form select[name="form-fin-opt"] option').removeAttr('selected').filter(`[value='${val_use_of_funds_hdn}']`).attr('selected', true);
        }
    }
    if (typeof val_use_of_funds !== "undefined") {
        if (val_use_of_funds.length > 0) {
            $('form select[name="use_of_funds"] option').removeAttr('selected').filter(`[value='${val_use_of_funds}']`).attr('selected', true);
        }
    }    
    if (typeof val_amount_requested_hdn !== "undefined") {
        if (val_amount_requested_hdn.length > 0) {
            $('#form_price_text').val(val_amount_requested_hdn);
        }
    }

    // Update 040502023 
    $(".header_lenk_drop_hover").mouseenter(function(){
        if ($(".header_nav_drop_data").is(":hidden")) {
            menuDropFadeIn()
        }
    });
    $(".header_lenk_drop_hover").mouseleave(function(){
        if (!$('.section_header_main').is(':hover')) {
            menuDropFadeOut()
        }              
    });
    $(".section_header_main").mouseleave(function(){
        if (!$(".header_nav_drop_data").is(":hidden")) {
            menuDropFadeOut()
        }              
    });
    $(".header_nav_drop_data").mouseleave(function(){
        if (!$('.section_header_main').is(':hover')) {
            menuDropFadeOut()
        }   
    }); 
    // Update End040502023 

    $("#sim-banner-close-button").on('click', function(e){
        clsBannerErc();
    });

    $("#resp-btn-h").on('click', function(e){
        menuBtnRespHd();
    });

    $("a.step_inactive").on('click', function(e){
        return false;
    });

}); 

// Update 040502023 
function menuDropFadeIn() {
    getResizeWdth();
    if (docWidth > 1120) {
        $(".header_nav_drop_data").show();
        $(".header_lenk_drop_hover").addClass("active_focus");
    }
}
function menuDropFadeOut() {
    getResizeWdth();
    if (docWidth > 1120) {
        $(".header_nav_drop_data").hide();
        $(".header_lenk_drop_hover").removeClass("active_focus");
    }
}
function menuBtnDrop() {
    if ($(".header_nav_drop_data").is(":hidden")) {
        $(".header_nav_drop_data").show();
        $(".header_lenk_drop_hover").addClass("active_focus");
    }else{
        $(".header_nav_drop_data").hide();
        $(".header_lenk_drop_hover").removeClass("active_focus");
    }
}
// Update End040502023 

function checkFormPopUpErrorPost() {
    if (typeof form_errors !== 'undefined') {
        if (form_errors.length > 0) {
            let formModalPopUp = new bootstrap.Modal(document.getElementById('mainFormAction'));
            if (formModalPopUp) {
                if (!$('#mainFormAction').hasClass('show')) {
                    formModalPopUp.show()
                }    
            }        
        }
    }
}

function checkFormPopUpErrorRessMsg() {
    if (typeof form_popup_activ !== 'undefined') {
        if (form_popup_activ.length > 0 && form_popup_activ == "true") {
            let formModalPopUpMsg = new bootstrap.Modal(document.getElementById('modalMsgForm'));
            if (formModalPopUpMsg) {
                if (!$('#modalMsgForm').hasClass('show')) {
                    formModalPopUpMsg.show()
                }    
            }        
        }
    }
}


/*if (mainFormAction) {
    mainFormAction.addEventListener('shown.bs.modal', function () {
        mainFormActionInfDef.focus();
    });  
}*/
// end form calc

function checkFormErrorPost() {
    if (typeof form_errors_id !== 'undefined') {
        if (form_errors_id.length > 0) {
            $('html, body').animate({
                "scrollTop": $("#"+form_errors_id).offset().top-150
            }, 100);    
            //$("#"+form_errors_id+" input:text").first().focus();
        }
    }
}

function getScrollTop() {
    let scrtp = $(document).scrollTop();
    return scrtp;
}

function headerResizeScroll() {
    getResizeWdth();
    if (docWidth > 1120) {
        let scrpos = getScrollTop();
        let elhimg = $('#header .header_logo img');
        if (scrpos > 0) {
            if (!$('#header').hasClass('header_scroll')) {
                $('#header').addClass('header_scroll')
                elhimg.animate({height:50},200);
            }        
        }else if(scrpos == 0){
            if ($('#header').hasClass('header_scroll')) {
                $('#header').removeClass('header_scroll');
                elhimg.animate({height:75},200);
            }
        }
    }
}

function menuBtnRespHd() {
    getResizeWdth();
    if (docWidth < 1120) {
        let getHeaderMn = $('.section_header_main');
        if (!getHeaderMn.hasClass('mob_active')) {
            getHeaderMn.addClass('mob_active');
            $("#header").addClass('nav_mob_active');
            //$('.mob_active .header_nav').fadeIn(100);
            $('.mob_active .header_nav').addClass('mob_menu_h');
            $('body').css("overflow", "hidden");
        }else{
            //$('.mob_active .header_nav').fadeOut(50);
            $('.mob_active .header_nav').removeClass('mob_menu_h');
            getHeaderMn.removeClass('mob_active');
            $("#header").removeClass('nav_mob_active');
            $('body').css("overflow", "auto");
        }
    }
}

function getResizeWdth() {
    docWidth = $(document).width();
}

function clsBannerErc() {
    $('#sim-banner').fadeOut();
    $('.inner-wrapper-sticky').removeClass('inner-wrapper-sticky-topbr');
    $('.page_type_page .section_content_cont, .page_type_page .section_rpg_page, .page_type_page .section_about_cont').removeClass('section_content_cont_topbr');
    $('body').addClass('baner_header_hide');
}