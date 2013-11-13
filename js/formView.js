
var FormView = {
    render: function() {
        var fields = this.form.find('[data-model-attr]');

        //for each field in the form
        var model = this.model;
        fields.each(function(index){
            var field = $(this);
            var attr = field.attr('data-model-attr');
            if (field.val)
                field.val(model.get(attr));
            else
                field.html(model.get(attr));
        }); //for each field

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

    setModel: function(model) {
        this.model = model;
        this.render();
    }
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
