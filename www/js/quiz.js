var videoPlayer;
var answerScore = 0; // default is 4; decrements by 1 each time a user gets something wrong until zero
var quizCount = 0, lessonScore = 0, panelCount = 0;
var data, myaudio;
	
// TODO: must be dynamic...
var lesson = "sample";

$(document).on('pageshow', '#quiz', function() {
	// remove new storage
	window.localStorage.removeItem(lesson + "_data", undefined);
	
	// set height of multimedia panel to fit screen
	var multimediaHeight = screen.height
		- $("div[data-role=header]").height()
		- $("#multiplechoicePanel").height();
	$("#multimediaPanel").height(multimediaHeight);
	
	// load the conversation quiz data
	$.get("data/lessons/" + lesson + ".json", function(dat) {
		data = dat;
		setUpNextPanel();
	});
	
	$("#hintTrigger").click(function() {
		alert($("#hint").html());
	});
	$("#translation").click(function() {
		alert($("#translationText").html());
	});
});
	
function setUpNextPanel() {
	// reset quiz functions
	stopAudio();
	
	var newDat = {
		lessonScore: lessonScore,
		quizCount: quizCount,
		panelCount: panelCount
	};
	window.localStorage.setItem(lesson + "_data", JSON.stringify(newDat));
	
	if(panelCount >= data.length) {
		// lesson complete, redirect to progress report
		renderProgressReport();
	} else {
		// lesson still going, redirect to next panel
		if(data[panelCount].type == "lecture") {
			answerScore = 0;
			renderLecture(data[panelCount]);
		} else if(data[panelCount].type == "quiz") {
			lessonScore += answerScore;
			answerScore = 4;
			renderQuiz(data[panelCount]);
		}
		panelCount++;
	}
}

function renderProgressReport() {
	$(".lesson-panel").hide();
	
	// calculate final score for this lesson
	var lessonData = window.localStorage.getItem(lesson + "_data");
	var lessonDataJSON = $.parseJSON(lessonData);
	if(lessonDataJSON.lessonScore != undefined
		&& lessonDataJSON.quizCount != undefined
		&& lessonDataJSON.panelCount != undefined) {
		var finalScore = (lessonDataJSON.lessonScore/lessonDataJSON.quizCount).toFixed(2);
	} else
		var finalScore = 4;

	var report = $(".avg-score-star");
	if(finalScore >= 4) {
		report.addClass("avg-score-star-good");
		msg = "Great work!";
	} else if(finalScore < 4 && finalScore > 2) {
		report.addClass("avg-score-star-medium");
		msg = "Not bad, but you could use some practice!";
	} else {
		report.addClass("avg-score-star-bad");
		msg = "You should work on this level. Try again?";
	}
	
	// show score report to user
	$(".avg-score-star div").html("<br><br>" + finalScore);
	$("#progressMsg").html(msg);
	$("#mainmenu").click(function() {
		$(this).off();
		$("body").pagecontainer("change", "index.html");
	}).html("Main Menu");
	$("#progressReport").show();
	$("#mainMenuPanel").show();
}

function cleanStr(str) {
	return str.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase();
}

function renderQuiz(data) {
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
	
	// when the avatar is clicked, replay the sound file
	avatar.click(function() {
		// reload the sound
		if(myaudio)
			myaudio.stop();
		myaudio = new Media("data/audio/" + data.audio + ".mp3");
		myaudio.play();
	});
	
	// if a hint is available, show the lightbulb and set the hint
	if(data.hint != undefined)
		$("#hint").html(data.hint);
	
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
		$(".multiple-choice").off();
		$(".multiple-choice").click(function() {
			$(this).off();
			if($(this).attr("href") == "#popupCorrect") {
				// answer is correct
				alert('Correct!');
				
				mouth.removeClass().addClass("mouth").addClass("smile");
				eyebrows.removeClass().addClass("eyebrows").addClass("up");
				
				setUpNextPanel();
			} else {
				// the answer was incorrect; decrement score and make avatar angrier
				alert('Sorry, that\'s not correct.');
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
				mouth.removeClass().addClass("mouth").addClass("smile");
				eyebrows.removeClass().addClass("eyebrows").addClass("up");
				
				alert('Correct!');
				setUpNextPanel();
			} else {
				// the answer was incorrect; decrement score and make avatar angrier
				answerScore--;
				
				// change eyebrows and/or mouth to make avatar look upset
				if(answerScore == 3) {
					mouth.removeClass().addClass("mouth").addClass("frown");
					
					// show incorrect popup and number of attempts remaining (2)
					alert('Sorry, that\'s not correct.');
				} else if(answerScore == 2) {
					eyebrows.removeClass().addClass("eyebrows").addClass("down");
					
					// show incorrect popup and number of attempts remaining (2)
					alert('Sorry, that\'s not correct.');
				} else if(answerScore == 1) {
					// user has run out of attempts; tell them the answer and direct them to the next stage
					alert('Sorry, that\'s not correct. The correct answer is: ' + data.answers[0]);
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

function renderLecture(data) {
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
		caption = data.caption;
		
		var avatar = $("<div></div>").addClass("avatar");
		var eyebrows = $("<div></div>").addClass("eyebrows").addClass("up");
		var mouth = $("<div></div>").addClass("mouth").addClass("smile");
		var info = $("<div></div>").addClass("info").html("Tap to play.");
		info.fadeIn();
		
		$("#multimediaPanel .media-container").html(avatar).append(info);
		avatar.html(eyebrows).append(mouth);
		
		// when the avatar is clicked, replay the sound file
		avatar.click(function() {
			// load the sound
			if(data.audio)
				playAudio('data/audio/' + data.audio + '.mp3');
			else
				$(".info").html("Audio not available");
		});
	}

	// resize the height of the media container to be a square
	$(".media-container").height($(".media-container").width());
	
	// show caption
	$(".caption").html(caption).show();

	// hide sentence writing panel and multiple choice
	$("#multiplechoicePanel").fadeOut();
	$("#sentencewritingPanel").fadeOut();
	
	// show translation and continue buttons
	$("#translation").fadeIn();translationText
	$("#continuePanel").fadeIn();
	
	// append next click event to continue button
	$("#continue").click(function() {
		$(this).off();
		setUpNextPanel();
	});

	// set up dialog
	$("a[data-rel=dialog]").click(function() {
		$("#dialog").dialog();
	});
	
	$("#translationText").html("English: " + data.english);
	
	quizCount++;
}