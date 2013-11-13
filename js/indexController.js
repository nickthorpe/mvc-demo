"use strict";

$(function(){

    function reportError(message) {
        $('.error-message').html(htmlEncode(message)).fadeIn(200);
    }

    //get the current user
    var user = Parse.User.current();

    //update the welcome message
    $('.name').html(user.get('name') || '(unknown)');

    //get the current set of posts
    var postsContainer = $('.posts-container');
    var postsModel = createPostsModel();
    var postsView = createTemplateView({
        model: postsModel,
        template: $('.post-template'),
        container: $('.posts-container')
    });
   
    postsModel.on('query', function(){
        postsContainer.addClass('working');
    });
    postsModel.on('complete', function(){
        postsContainer.removeClass('working');
    });
    postsModel.on('error', function(error){
        postsContainer.removeClass('working');
        reportError(error.message);
    });

    postsModel.refresh();
    
    //new post view and model
    var postModel = new Post();
    var newPostView = createFormView({
        model: postModel,
        form: $('.new-post-form')
    });

    //handle submit of new post
    newPostView.on('submit', function(){
        var sharePostButton = $('.btn-share-post');
        sharePostButton.addClass('working').attr('disabled', true);

        //set the author to be the current user's name
        newPostView.model.set('author', Parse.User.current());
        newPostView.model.save(null, {
            success: function(postModel) {
                //post saved!
                //re-render posts view
                newPostView.setModel(new Post());
                postsModel.refresh();
                sharePostButton.removeClass('working').removeAttr('disabled');
            },
            error: function(postModel, error) {
                reportError(error.message);
                sharePostButton.removeClass('working').removeAttr('disabled');
            }
        });
    });

    //handle the signout button
    $('.btn-signout').click(function(){
        Parse.User.logOut();
        window.location = 'signin.html';
    });

}); //doc ready

