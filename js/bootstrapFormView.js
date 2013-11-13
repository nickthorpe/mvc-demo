
var BootstrapFormView = {
    render: function() {
        var field;

        //for each model attribute
        for (attr in this.model.attributes) {
            //find a form field with a matching id
            //since Bootstrap makes us use ids for labels
            //we might as well use them for view binding as well
            field = this.form.find('#' + attr);
            if (field.length > 0 && field.val) {
                field.val(this.model.get(attr));
            }
        } //for each model attribute

    }, //render()

    updateModel: function() {
        var fields = this.form.find('input,select');

        //for each field in the form
        var model = this.model;
        fields.each(function(index, element){
            var field = $(element);
            var id = field.prop('id');
            var value = field.val();
            if (id && value && value.length > 0) {
                model.set(id, value);
            }
        });
    } //updateModel()
}; //BootstrapFormView()


function createBootstrapFormView(config) {
    var view = Object.create(BootstrapFormView);

    //apply all the config properties to the new view
    apply(config, view);


    //make the view an event source
    makeEventSource(view);

    //if we have a model, render the view
    if (view.model)
        view.render();
    
    //if we have a submitButton, handle the click
    if (view.submitButton && view.submitButton.click) {
        view.submitButton.click(function(){
            view.updateModel();
            view.trigger('submit');
        });
    }

    return view;
}
