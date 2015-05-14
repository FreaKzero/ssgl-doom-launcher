define(['text!fixtures/Preloader.html', 'Component'],
    function(template, Component) {

        var Preloader = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope) {
            }        
        });

        return Preloader;
    });