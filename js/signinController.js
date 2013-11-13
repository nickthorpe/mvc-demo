
$(function(){
    //the Parse login method doesn't take a model object,
    //but will return one after a successful login
    var signinButton = $('.btn-signin');

    $('.signin-form').submit(function(){
        signinButton.attr('disabled', true);
        signinButton.addClass('working');
        
        Parse.User.logIn($('#email').val(), $('#password').val(), {
            success: function(user) {
                //redirect to home page
                window.location = '.';
            },

            error: function(user, error) {
                $('.error-message').html(htmlEncode(error.message)).fadeIn(200);
                signinButton.removeClass('working');
                signinButton.removeAttr('disabled');
            }
        });

        //stop normal form submission
        return false;
    }); //submit handler
}); //doc ready 
