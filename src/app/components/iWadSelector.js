define(['text!fixtures/iWadSelector.html', 'Component'],
	function(template, Component) {
	
	var RESULT;

	var WadSelector = Component({
		
		init: function() {
			this.template = template;
			this.mustachekey = false;
		},
		
		events: function(scope, collection) {
			scope.$comp.on('click', 'ul > li', function(e) {
				e.preventDefault();
				RESULT = $(this).children().data('path');
				collection.selected = $(this).text();				
				scope.syncView();
				scope.$message.emit('iwad selected', {iwad: $(this).text()});
			});
		},

		getResult: function() {
			return RESULT;
		}		

	});
	
	return WadSelector;
});