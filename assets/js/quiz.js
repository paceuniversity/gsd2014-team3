var videoPlayer;
var answerScore = 4; // default is 4; decrements by 1 each time a user gets something wrong until zero
var k = 0; // current panel count (panel is a quiz or a lecture)
var data;

$(document).on('pageshow', '#quiz', function() {
	// set height of multimedia panel to fit screen
	var multimediaHeight = screen.height
		- $("div[data-role=header]").height()
		- $("#multiplechoicePanel").height();
	$("#multimediaPanel").height(multimediaHeight);
	
	// TODO: must be dynamic...
	var lesson = "sample";
	
	// load the conversation quiz data
	$.get("data/lessons/" + lesson + ".json", function(dat) {
		data = dat;
		setUpNextPanel();
	});
});

function setUpNextPanel() {
	if(k >= data.length) {
		console.log("end");
		// lesson complete, redirect to progress report
		$(":mobile-pagecontainer").pagecontainer("change", "progress.html", { showLoadMsg: true });
	} else {
		// lesson still going, redirect to next panel
		if(data[k].type == "lecture")
			initLecture(data[k]);
		else if(data[k].type == "quiz")
			initQuiz(data[k]);
		console.log(k + " <-- k");
		k++;
		
	}
}

function cleanStr(str) {
	return str.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase();
}

function initQuiz(data) {
	// hide translation and continue buttons
	$("#translation").fadeOut();
	$("#continue").fadeOut();
	
	// show caption if defined
	if(data.caption != undefined)
		$(".caption").html(data.caption).fadeIn();
		
	// create the elements for the avatar
	var avatar = $("<div></div>").addClass("avatar");
	var eyebrows = $("<div></div>").addClass("eyebrows").addClass("up");
	var mouth = $("<div></div>").addClass("mouth").addClass("smile");
	var info = $("<div></div>").addClass("info").html("Tap to play.");
	info.fadeIn();
	
	$("#multimediaPanel .media-container").html(avatar).append(info);
	avatar.html(eyebrows).append(mouth);
	
	// load the sound
	//var myaudio = new Media("data/audio/" + data.audio + ".mp3");
	
	// when the avatar is clicked, replay the sound file
	avatar.click(function() {
		// reload the sound
		//myaudio.play();
	});
	
	// if a hint is available, show the lightbulb and set the hint
	if(data.hint != undefined) {
		$("#hintTrigger").fadeIn();
		$("#popupDialog p").html(data.hint);
	}
	
	// if there are four different answers, the quiz type is multiple choice.
	// otherwise, it is a direct answer (user types it in)
	if(data.answers.length == 4) {
		// randomize the answers array
		var correct = data.answers[0]; // first answer is always correct
		var answers = shuffle(data.answers);
		
		// place multiple choice answers
		for(i=0; i<answers.length; i++)
			$("#ans" + i).attr("href", (answers[i] == correct ? "#popupCorrect" : "#popupIncorrect")).html(answers[i]);
		
		// functions for multiple choice
		$(".multiple-choice").click(function() {
			if($(this).attr("href") == "#popupCorrect") {
				// popup was correct!
				answerScore = 4;
				
				mouth.removeClass().addClass("mouth").addClass("smile");
				eyebrows.removeClass().addClass("eyebrows").addClass("up");
				
				setUpNextPanel();
			} else {
				// the answer was incorrect; decrement score and make avatar angrier
				answerScore--;
				
				// change eyebrows and/or mouth to make avatar look upset
				if(answerScore == 3)
					mouth.removeClass().addClass("mouth").addClass("frown");
				else if(answerScore == 2)
					eyebrows.removeClass().addClass("eyebrows").addClass("down");
				else if(answerScore == 1)
					setUpNextPanel();
			}
		});
	
		$("#sentencewritingPanel").fadeOut();
		$("#multiplechoicePanel").fadeIn();
	} else {
		// set up the sentence writing panel
		$("#sentenceSubmit").click(function() {
			if(cleanStr($("#sentenceText").val()) == cleanStr(data.answers[0])) {
				// answer is correct! make avatar happy
				answerScore = 4;
				
				mouth.removeClass().addClass("mouth").addClass("smile");
				eyebrows.removeClass().addClass("eyebrows").addClass("up");
				
				$("#popupCorrect").popup('open', {transition: "pop", role: "dialog"});
			} else {
				// the answer was incorrect; decrement score and make avatar angrier
				answerScore--;
				
				// change eyebrows and/or mouth to make avatar look upset
				if(answerScore == 3) {
					mouth.removeClass().addClass("mouth").addClass("frown");
					
					// show incorrect popup and number of attempts remaining (2)
					$("#popupIncorrectDetail p").html("Sorry, that's not correct. You have <b>" + answerScore + "</b> tries left.");
					$("#popupIncorrectDetail").popup('open', {transition: "pop", role: "dialog"});
				} else if(answerScore == 2) {
					eyebrows.removeClass().addClass("eyebrows").addClass("down");
					
					// show incorrect popup and number of attempts remaining (2)
					$("#popupIncorrectDetail p").html("Sorry, that's not correct. You have <b>" + answerScore + "</b> tries left.");
					$("#popupIncorrectDetail").popup('open', {transition: "pop", role: "dialog"});
				} else if(answerScore == 1) {
					// user has run out of attempts; tell them the answer and direct them to the next stage
					$("#popupIncorrectDetail p").html("Sorry, that's not correct. The correct answer was: <b>" + data.answers[0] + "</b>.");
					$("#popupIncorrectDetail").popup('open', {transition: "pop", role: "dialog"});
					
					setUpNextPanel();
				}
			}
		});
		
		$("#multiplechoicePanel").fadeOut();
		$("#sentencewritingPanel").fadeIn();
	}
	
	// resize the height of the media container to be a square
	$(".media-container").height($(".media-container").width());

	// set up dialog
	$("a[data-rel=dialog]").click(function() {
		$("#dialog").dialog();
	});
}

function shuffle(o){ // courtesy: Google
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function initLecture(data) {
	// TBD: get json data from json
	var correctAnswer = "d";
	var isMultipleChoiceMode = true;
	var mediaType = "avatar";
	var videoFile = "test.mp4";
	var videoExt = videoFile.split(".");
	var videoSize = "1280x720";

	if(mediaType == "video") { // TBD: add support for play/replay and touch-to-play/pause features
		// a video will play for the user
		videoPlayer = $("<video></video>");
		//videoPlayer.attr("autoplay", "true");
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
		caption = "What is the avatar saying? Choose the English equivalent below.";
		
		var avatar = $("<div></div>").addClass("avatar");
		var eyebrows = $("<div></div>").addClass("eyebrows").addClass("up");
		var mouth = $("<div></div>").addClass("mouth").addClass("smile");
		var info = $("<div></div>").addClass("info").html("Tap to play.");
		info.fadeIn();
		
		$("#multimediaPanel .media-container").html(avatar).append(info);
		avatar.html(eyebrows).append(mouth);
		
		// load the sound
		//var myaudio = new Media("data/audio/greetings/habari za mchana.mp3");
	//	loadSound("data/audio/greetings/habari za mchana.mp3");
		
		// when the avatar is clicked, replay the sound file
		avatar.click(function() {
			// load the sound
			setupAudioNodes();
			loadSound("data/audio/greetings/habari za mchana.mp3");
		});
	}

	// resize the height of the media container to be a square
	$(".media-container").height($(".media-container").width());

	// hide caption, sentence writing panel and multiple choice
	$("#multiplechoicePanel").fadeOut();
	$("#sentencewritingPanel").fadeOut();
	
	// show translation and continue buttons
	$("#translation").fadeIn();
	$("#continuePanel").fadeIn();
	
	// append next click event to continue button
	$("#continue").click(function() {
		setUpNextPanel();
	});

	// set up dialog
	$("a[data-rel=dialog]").click(function() {
		$("#dialog").dialog();
	});
}