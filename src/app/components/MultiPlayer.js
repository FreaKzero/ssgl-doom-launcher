define(['text!fixtures/MultiPlayer.html', 'Component'],
    function(template, Component) {

        var SettingsModal = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope) {                
            }
            
        });

        return SettingsModal;
    });