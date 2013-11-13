
$(function(){

    //check if there's a current user and redirect to signup page if not
    var currentUser = Parse.User.current();
    if (currentUser) {
        //we have a current user
    } 
    else {
        // show the signup or login page
        window.location = 'signup.html';
    }

    $('.btn-signout').click(function(){
        Parse.User.logOut();
        window.location = 'signin.html';
    });

}); //doc ready

