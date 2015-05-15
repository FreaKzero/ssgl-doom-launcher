define(['text!fixtures/SettingsModal.html', 'Component'],
    function(template, Component) {

        var SettingsModal = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope) {
                scope.$comp.on('click', '#save-settings', function() {
                    // todo: check for empty
                    scope.$message.emit('save-settings', {
                        gzDoom: $('#gzDoom').val(),
                        iwadpath: $('#iwadpath').val(),
                        wadpath: $('#wadpath').val(),
                        obligepath: $('#obligepath').val(),
                        obligeconfigpath: $('#obligeconfigpath').val(),
                        randmappath: $('#randmappath').val(),
                        activateoblige: $('#activateoblige').is(':checked')
                    });
                });

                scope.$comp.on('change', '#activateoblige', function() {
                    var $c = scope.$comp.find('.obligefields input');
                    var $l = scope.$comp.find('.obligefields label');
                    var $a = scope.$comp.find('.obligefields .appended');
                    
                    if ($(this).is(':checked')) {
                        $c.prop('disabled', false);
                    } else {
                        $c.prop('disabled', true);
                        $c.removeClass('uk-form-danger');
                        $l.removeClass('uk-form-danger');                        
                        $a.remove();
                    }
                });

                scope.$message.on('highlightErrors', function(arr) {
                    var len = arr.length;

                    scope.$comp.find('input').removeClass('uk-form-danger');
                    scope.$comp.find('label').removeClass('uk-form-danger');
                    scope.$comp.find('.appended').remove();

                    for (var i = 0; i < len; i++) {
                        var elem = '#'+arr[i];
                        var label = 'label[for='+arr[i]+']';

                        $(elem).addClass('uk-form-danger');
                        $(label).addClass('uk-form-danger').append(' <span class="uk-form-danger appended">No File Found</span>');
                    }

                });
            }
        });

        return SettingsModal;
    });