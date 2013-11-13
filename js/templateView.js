"use strict";

var TemplateView = {
    render: function() {
        var items = this.model.getItems();
        var idxItem;
        var item;
        var clonedTemplate;
        var idxBoundElem;
        var boundElems;
        var boundElem;
        var attr;
        var val;

        this.container.empty();
        this.container.addClass('working');

        for (idxItem = 0; idxItem < items.length; ++idxItem) {
            item = items[idxItem];
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

        this.container.removeClass('working');
    }, //render()

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
