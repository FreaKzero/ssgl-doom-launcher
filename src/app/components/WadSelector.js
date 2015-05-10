define(['text!fixtures/WadSelector.html', 'Component'],
	function(template, Component) {
	
	var WadSelector = Component({
		init: function() {
			this.template = template;
		},

		getResult: function() {
			var result = [];
			$('#wadselectorresult').find('[data-result]').each(function() {
				result.push($(this).data('result'));
			});

			return result;
		}
	});
	
	return WadSelector;
});