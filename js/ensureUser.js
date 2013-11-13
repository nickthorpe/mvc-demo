//check if there's a current user and redirect to signup page if not
var currentUser = Parse.User.current();
if (!currentUser || !currentUser.authenticated()) {
    // show the signup or login page
    window.location = 'signup.html';
}
