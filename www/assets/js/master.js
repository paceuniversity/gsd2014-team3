$(document).bind('mobileinit', function() {
  	$(document).on('tap', function(e) {
  		$('.activeOnce').removeClass($.mobile.activeBtnClass);
  	});
});

$( document ).on( "mobileinit", function() {
 
  // We want popups to cover the page behind them with a dark background
  $.mobile.popup.prototype.options.overlayTheme = "b";
 
  // Set a namespace for jQuery Mobile data attributes
//  $.mobile.ns = "jqm-";
  alert('test');
});

$(document).on('pageshow', function() {
});

$(document).on('pageload', function() {
});

  $(document).bind("pagebeforecreate", function(event, ui) {
    console.log("The DOM is untouched by jQM");
  });
  
  $(document).bind("pagebeforeshow", function(event, ui) {
	var loader = $("<div></div>");
	$("div[data-role=page]").wrap(loader.hide());
	$('.ui-loader').show();
    console.log("Before show");
  });

  $(document).bind("pageshow", function(event, ui) {
	$("div[data-role=page]").unwrap();
	$('.ui-loader').hide();
  });

  $(document).bind("pagebeforehide", function(event, ui) {
    console.log("Before hide");
  });

  $(document).bind("pagehide", function(event, ui) {
    console.log("Hide");
  });

console.log("test ignore");

$.mobile.loading( 'show', {
	text: 'foo',
	textVisible: true,
	theme: 'z',
	html: ""
  });