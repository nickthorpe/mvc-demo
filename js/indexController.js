$(function(){

    function reportError(message) {
        $('.error-message').html(htmlEncode(message)).fadeIn(200);
    }

    //get the current user
    var user = Parse.User.current();

    //update the welcome message
    $('.name').html(user.get('name') || '(unknown)');

    //get the current set of posts
    var postsView = createTemplateView({
        template: $('.post-template'),
        container: $('.posts-container')
    });

    function getAllPosts() {
        var query = new Parse.Query(Post);
        query.include('author');
        query.descending('createdAt');
        query.limit(100);
        postsView.container.addClass('working');
        query.find({
            success: function(posts) {
                postsView.container.removeClass('working');
                postsView.refresh(posts);
            },
            error: function(error) {
                postsView.container.removeClass('working');
                reportError(error.message);
            }
        });
    } //getAllPosts()
    
    getAllPosts();

    //new post view and model
    var postModel = new Post();
    var newPostView = createNewPostView({
        model: postModel,
        form: $('.new-post-form')
    });

    //handle submit of new post
    newPostView.on('submit', function(){
        var sharePostButton = $('.btn-share-post');
        sharePostButton.addClass('working').attr('disabled', true);

        postModel.save(null, {
            success: function(postModel) {
                //post saved!
                //re-render posts view
                newPostView.clear();
                getAllPosts();
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

