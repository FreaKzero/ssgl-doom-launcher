define(['text!fixtures/ObligeDialog.html', 'Component'],
    function(template, Component) {

    	var RESULT;

        var ObligeDialog = Component({
            init: function() {
                this.template = template;
                this.mustachekey = false;
            },

            events: function(scope, collection) {
                scope.$comp.on('click', 'ul > li', function(e) {
                    e.preventDefault();
                    RESULT = $(this).children().data('path');
                    scope.$comp.find('.selected').text($(this).text());
                });

                scope.$comp.on('click', '#launch-oblige', function() {
                	scope.$message.emit('launch-oblige', RESULT);
                });
            },

            isMounted: function(scope, collection) {
            	console.log(this.collection);
            	scope.$comp.find('.selected').text(collection.selected);
            },

            getResult: function() {
                return RESULT;
            }

        });

        return ObligeDialog;
    });