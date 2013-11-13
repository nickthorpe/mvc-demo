
var PostsModel = {
    getItems: function() {
        return this.posts || [];
    },

    refresh: function() {
        //if already refreshing, ignore this
        if (this.refreshing)
            return;

        this.refreshing = true;

        var query = new Parse.Query(Post);
        query.include('author');
        query.descending('createdAt');
        query.limit(100);
        this.trigger('query');
        var self = this;
        query.find({
            success: function(posts) {
                self.refreshing = false;
                self.posts = posts;
                self.trigger('complete');
                self.trigger('change');
            },
            error: function(error) {
                self.refreshing = false;
                self.trigger('error', error);
            }
        });
    } //refresh()
}

function createPostsModel() {
    var model = Object.create(PostsModel);
    return makeEventSource(model);
} //createPostsModel()

