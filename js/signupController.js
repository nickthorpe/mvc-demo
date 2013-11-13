
$(function(){
    var signUpButton = $('.btn-signup');
    var user = new Parse.User();     
    var view = createBootstrapFormView({
        model: user,
        form: $('.signup-form'),
        submitButton: signUpButton
    });

    view.on('submit', function(){
        signUpButton.prop('disabled', true);

        //use email attribute for username
        user.set('username', user.get('email'));

        user.signUp(null, {
            success: function(user) {
                window.location = '.';
            },
            error: function(user, error) {
                $('.error-message').html(htmlEncode(error.message)).fadeIn(200);
                signUpButton.prop('disabled', false);
            }
        });
    });
});