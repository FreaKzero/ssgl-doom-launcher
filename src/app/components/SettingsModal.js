define(['text!fixtures/SettingsModal.html', 'Component'],
    function(template, Component) {

        var SettingsModal = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope) {
                scope.$comp.on('click', '#save-settings', function() {
                    scope.$message.emit('save-settings', {
                        gzDoom: $('#gzDoom').val(),
                        iwadpath: $('#iwadpath').val(),
                        wadpath: $('#wadpath').val()
                    });
                });
            }
            
        });

        return SettingsModal;
    });