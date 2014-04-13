var videoPlayer;

$(function() {
	// set height of multimedia panel to fit screen
	var multimediaHeight = screen.height
		- $("div[data-role=header]").height()
		- $("#multiplechoicePanel").height();
	$("#multimediaPanel").height(multimediaHeight);
	
	// TBD: get json data from json
	
	var correctAnswer = "d";
	var isMultipleChoiceMode = true;
	var caption = "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.";
	var mediaType = "video";
	var videoFile = "test.mp4";
	var videoExt = videoFile.split(".");
	var videoSize = "1280x720";
	
	if(isMultipleChoiceMode)
		$("#multiplechoicePanel").show();
	else
		$("#sentencewritingPanel").show();
		
	if(mediaType == "video") { // TBD: add support for play/replay and touch-to-play/pause features
		// a video will play for the user
		videoPlayer = $("<video></video>");
		videoPlayer.attr("autoplay", "true");
		sourceFile = $("<source>");
		sourceFile.attr("src", 'data/media/' + videoFile);
		sourceFile.attr("type", 'video/' + videoExt[videoExt.length-1]);
		
		videoPlayer.append(sourceFile);
		$(".media-container").append(videoPlayer);
		
		// force video to fit in container while maintaining aspect ratio
		videoSize = videoSize.split("x");
		videoPlayer.width($(".media-container").width());
		videoPlayer.height(($(".media-container").width() / videoSize[0]) * videoSize[1]);
		
		// vertically-align the video player
		videoPlayer.css("margin-top", Math.ceil((($(".media-container").width() - videoPlayer.height()) / 2))  + "px");
	} else if(mediaType == "image") {
		// display an image as the media
	} else {
		// avatar will speak to user
	}
	
	// resize the height of the media container to be a square
	$(".media-container").height($(".media-container").width());
	
	// show caption if defined
	if(caption != undefined)
		$(".caption").html(caption).show();
	
	// set up dialog
	$("a[data-rel=dialog]").click(function() {
		$("#dialog").dialog();
	});
});