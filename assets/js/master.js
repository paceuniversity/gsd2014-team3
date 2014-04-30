/* remove all button active states on all pages */
$(document).bind('mobileinit', function() {
	$(document).on('tap', function(e) {
		$('.activeOnce').removeClass($.mobile.activeBtnClass);
	});
});