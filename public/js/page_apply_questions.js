$(function() {
    $(document).ready(function() {
        formSteps.keypress(function(){
            formSteps.find('.invalid_cs_inp').remove();
            //formSteps.valid();
        });

        setTimeout(function() {
            $('#apply-questions-main').animate({opacity: 1}, 500);
        }, 500);
    });
});