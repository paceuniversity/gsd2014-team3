var my_media = null;
var mediaTimer = null;

// Play audio
//
function playAudio(src) {
	// Create Media object from src
	my_media = new Media(getPhoneGapPath() + src);
	var lastPos = 0;
	
	// Play audio
	my_media.play();

	// Update my_media position every second
	if (mediaTimer == null) {
		mediaTimer = setInterval(function() {
			// get my_media position
			my_media.getCurrentPosition(
				// success callback
				function(position) {
					if (position > -1) {
						if(parseInt(position*1000) % 2 == 0 || position == lastPos)
							$(".mouth").removeClass().addClass("mouth").addClass("up");
						else
							$(".mouth").removeClass().addClass("mouth").addClass("talking");
							
						if(position == lastPos)
							$(".info").show();
						else
							$(".info").hide();
							
						lastPos = position;
					} else
						$(".mouth").removeClass().addClass("mouth").addClass("up");
				},
				// error callback
				function(e) {
					console.log("Error getting pos=" + e);
				}
			);
		}, 100);
	}
}

// Pause audio
//
function pauseAudio() {
	if (my_media) {
		my_media.pause();
	}
				console.log("4");
}

// Stop audio
//
function stopAudio() {
	if (my_media) {
		my_media.stop();
	}
				console.log("5");
	clearInterval(mediaTimer);
	mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
	console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
	console.log('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(callback) {
	callback();
}

function getPhoneGapPath() {
     var path = window.location.pathname;
     path = path.substr( path, path.lastIndexOf("/")+1 );

	//	return ""; // if chrome
	return 'file://' + path; // if phonegap
}