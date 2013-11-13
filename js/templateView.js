"use strict";

var TemplateView = {
    render: function() {
        var items = this.model.getItems();
        var idx;

        this.container.empty();

        for (idx = 0; idx < items.length; ++idx) {
            this.renderItem(items[idx]);
        } //for each item in model list

    }, //render()

    renderItem: function(item) {
        var clonedTemplate = this.template.clone();
        
        var boundElems = clonedTemplate.find('[data-model-attr]');
        var idx;
        var boundElem;
        var attr;
        var val;

        for (idx = 0; idx < boundElems.length; ++idx) {
            boundElem = $(boundElems[idx]);
            attr = boundElem.attr('data-model-attr');

            //Parse includes three system-maintained properties
            //on every object: id, createdAt, and updatedAt
            //unfortunately, these are not included in the
            //standard attributes map, so if the attr is one of
            //these, we need to get the value directly from the
            //item as a property instead of using .get()
            switch (attr) {
                case 'id':
                    val = item[attr];
                    break;
                case 'createdAt':
                case 'updatedAt':
                    val = item[attr].toLocaleString();
                    break;
                default:
                    val = this.getModelAttr(attr.split('.'), item);
            }

            if (undefined != val)
                boundElem.html(htmlEncode(val));
        }

        this.container.append(clonedTemplate);
    },

    getModelAttr: function(attrs, curObj) {
        var attr = attrs.shift();
        if (0 == attrs.length)
            return curObj.get(attr);
        else
            return this.getModelAttr(attrs, curObj.get(attr));
    }
}; //TempalteView()


function createTemplateView(config) {
    var view = Object.create(TemplateView);
    apply(config, view);
    if (view.model) {
        view.render();

        //re-render when model changes
        view.model.on('change', function(){
            view.render();
        });
    }
    return view;
} //createTemplateView()
