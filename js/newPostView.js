
function createNewPostView(config) {
    var view = createFormView(config);
    
    //preset the 'author' attribute of the model to the current user name
    view.model.set('author', Parse.User.current());
    return view;
}
