
var FormView = {
    render: function() {
        var field;

        //for each model attribute
        for (attr in this.model.attributes) {
            //find a form field with a matching id
            //since Bootstrap makes us use ids for labels
            //we might as well use them for view binding as well
            field = this.form.find('[data-model-attr="' + attr + '"]');
            if (field.length > 0 && field.val) {
                field.val(this.model.get(attr));
            }
        } //for each model attribute

    }, //render()

    updateModel: function() {
        var fields = this.form.find('[data-model-attr]');

        //for each field in the form
        var model = this.model;
        fields.each(function(index){
            var field = $(this);
            var attr = field.attr('data-model-attr');

            //if the field has a val() method, set the model
            //attribute to the result of that function
            //else set it to the html of the element (static)
            if (field.val)
                model.set(attr, field.val());
            else
                model.set(attr, field.html());
        }); //for each field
    }, //updateModel()

    clear: function() {
        var fields = this.form.find('[data-model-attr]');

        //for each field in the form
        var model = this.model;
        fields.each(function(index, element){
            var field = $(this);
            field.val('');
        });
    } //clear()
}; //FormView


function createFormView(config) {
    var view = Object.create(FormView);

    //apply all the config properties to the new view
    apply(config, view);


    //make the view an event source
    makeEventSource(view);

    //if we have a model, render the view
    if (view.model)
        view.render();
    
    //handle form submit
    if (view.form && view.form.submit) {
        view.form.submit(function(){
            view.updateModel();
            view.trigger('submit');
            return false;
        });
    }

    return view;
}
