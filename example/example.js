(function() {

    var viewSelector = new Backbone.ViewSelector();
    var viewStack = new Backbone.ViewStack();

    var TemplateView = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = _.template($(this.template).html());
            this.$el.html(template());
            return this;
        }

    });

    var TabsView = TemplateView.extend({

        template: '#tabs-template',

        events: {
            'click [data-tab]': 'selectTab'
        },

        selectTab: function(e) {
            var index = parseInt($(e.target).data('tab'), 10);
            viewSelector.selectView(index);
        }

    });

    var FooView = TemplateView.extend({

        template: '#foo-template',

        events: {
            'click .push': 'push'
        },

        push: function() {
            var bar = new BarView();
            viewStack.pushView(bar);
        },

        render: function() {
            return TemplateView.prototype.render.call(this);
        }

    });

    var BarView = TemplateView.extend({

        template: '#bar-template',

        events: {
            'click .push': 'push',
            'click .pop': 'pop'
        },

        push: function() {
            var baz = new BazView();
            this.viewStack.pushView(baz);
        },

        pop: function() {
            this.viewStack.popView();
        }

    });

    var BazView = TemplateView.extend({

        template: '#baz-template',

        events: {
            'click .pop': 'pop'
        },

        pop: function() {
            this.viewStack.popView();
        }

    });

    var QuxView = TemplateView.extend({

        template: '#qux-template'

    });

    $(function() {
        var tabs = new TabsView();
        var foo = new FooView();
        var baz = new BazView();
        var qux = new QuxView();

        viewSelector.setViews([viewStack, qux]);
        viewSelector.selectView(0);

        viewStack.pushView(foo);

        $('#tabs').html(tabs.el);
        $('#content').html(viewSelector.el);
    });

})();