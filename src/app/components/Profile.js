define(['text!fixtures/Profile.html', 'Component'],
    function(template, Component) {

        var Profile = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope) {
            }        
        });

        return Profile;
    });