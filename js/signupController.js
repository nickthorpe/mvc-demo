
$(function(){
    var signUpButton = $('.btn-signup');
    var user = new Parse.User();     
    var view = createFormView({
        model: user,
        form: $('.signup-form')
    });

    view.on('submit', function(){
        signUpButton.attr('disabled', true);
        signUpButton.addClass('working');

        //use email attribute for username
        user.set('username', user.get('email'));

        user.signUp(null, {
            success: function(user) {
                window.location = '.';
            },
            error: function(user, error) {
                $('.error-message').html(htmlEncode(error.message)).fadeIn(200);
                signUpButton.removeClass('working');
                signUpButton.removeAttr('disabled');
            }
        });
    });
});