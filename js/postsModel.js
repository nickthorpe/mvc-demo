
var PostsModel = {
    getItems: function() {
        return this.posts || [];
    },

    refresh: function() {
        var query = new Parse.Query(Post);
        query.include('author');
        query.descending('createdAt');
        query.limit(100);
        this.trigger('query');
        var self = this;
        query.find({
            success: function(posts) {
                self.posts = posts;
                self.trigger('complete');
                self.trigger('change');
            },
            error: function(error) {
                self.trigger('error', error);
            }
        });
    } //refresh()
}

function createPostsModel() {
    var model = Object.create(PostsModel);
    return makeEventSource(model);
} //createPostsModel()

