var videoPlayer;

$(function() {
	// set height of multimedia panel to fit screen
	var multimediaHeight = screen.height
		- $("div[data-role=header]").height()
		- $("#multiplechoicePanel").height();
	$("#multimediaPanel").height(multimediaHeight);

		$("#multiplechoicePanel").show();

	// resize the height of the media container to be a square
	$(".media-container").height($(".media-container").width());
	
	// position the search bar at top
	$("#").css("top", parseInt($("div[data-role=header]").height()));

	// show caption if defined
	if(caption != undefined)
		$(".caption").html(caption).show();

	// set up dialog
	$("a[data-rel=dialog]").click(function() {
		$("#dialog").dialog();
	});
});
