"use strict";

var TemplateView = {
    render: function() {
        var idxItem;
        var item;
        var clonedTemplate;
        var idxBoundElem;
        var boundElems;
        var boundElem;
        var attr;
        var val;

        this.container.empty();

        for (idxItem = 0; idxItem < this.model.length; ++idxItem) {
            item = this.model[idxItem];
            clonedTemplate = this.template.clone();
            
            boundElems = clonedTemplate.find('[data-model-attr]');
            for (idxBoundElem = 0; idxBoundElem < boundElems.length; ++idxBoundElem) {
                boundElem = $(boundElems[idxBoundElem]);
                attr = boundElem.attr('data-model-attr');
                val = this.getModelAttr(attr.split('.'), item);
                if (undefined != val)
                    boundElem.html(htmlEncode(val));
            }

            this.container.append(clonedTemplate);
        } //for each item in model list
    }, //render()

    getModelAttr: function(attrs, curObj) {
        var attr = attrs.shift();
        if (0 == attrs.length)
            return curObj.get(attr);
        else
            return this.getModelAttr(attrs, curObj.get(attr));
    },

    refresh: function(newModel) {
        this.model = newModel;
        this.render();
    }
}; //TempalteView()


function createTemplateView(config) {
    var view = Object.create(TemplateView);
    apply(config, view);
    if (view.model) {
        view.render();
    }
    return view;
} //createTemplateView()
