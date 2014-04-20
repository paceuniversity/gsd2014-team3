// create the audio context (chrome only for now)
if (! window.AudioContext) {
	if (! window.webkitAudioContext)
		alert('no audiocontext found');
	window.AudioContext = window.webkitAudioContext;
}
var context = new AudioContext();
var audioBuffer;
var sourceNode;
var splitter;
var analyser, analyser2;
var javascriptNode;

setupAudioNodes();

function setupAudioNodes() {
	// setup a javascript node
	javascriptNode = context.createScriptProcessor(2048, 1, 1);
	// connect to destination, else it isn't called
	javascriptNode.connect(context.destination);
	
	// setup a analyzer
	analyser = context.createAnalyser();
	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 1024;

	// create a buffer source node
	sourceNode = context.createBufferSource();
	splitter = context.createChannelSplitter();

	// connect the source to the analyser and the splitter
	sourceNode.connect(splitter);

	// connect one of the outputs from the splitter to the analyzer
	splitter.connect(analyser,0,0);
	analyser.connect(javascriptNode);
	
	// and connect to destination
	sourceNode.connect(context.destination);
}

// load the specified sound
function loadSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// When loaded decode the data
	request.onload = function() {

		// decode the data
		context.decodeAudioData(request.response, function(buffer) {
			// when the audio is decoded play the sound
			playSound(buffer);
		}, onError);
	}
	request.send();
}

function playSound(buffer) {
	sourceNode.buffer = buffer;
	sourceNode.start(0);
}

var lastVol = 0;
function onError(e) {}

// when the javascript node is called
// we use information from the analyzer node
// to draw the volume
javascriptNode.onaudioprocess = function() {
	// get the average for the first channel
	var array =  new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	var average = getAverageVolume(array);

	// change the avatar's mouth based on volume
	if(Math.abs(average-lastVol) >= 5 && lastVol > 0)
		$(".mouth").removeClass().addClass("mouth").addClass("talking");
	else
		$(".mouth").removeClass().addClass("mouth").addClass("smile");
	lastVol = average;
}

function getAverageVolume(array) {
	var values = 0;
	var average;
	var length = array.length;

	// get average of the frequency amplitudes
	for (var i = 0; i < length; i++)
		values += array[i];

	average = values / length;
	return average;
}