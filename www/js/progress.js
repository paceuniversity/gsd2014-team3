$(document).on('pageshow', '#progress', function() {
console.log("TRRRR");
	var appData = window.localStorage.getItem("appData");
	var completed=[];
	
	if(appData != undefined) {
		var progressData = $.parseJSON(appData);
		
			console.log("err3");
		if(progressData.completed.length > 0) {
			for (i=0; i<progressData.completed.length; i++) {
			  
			}
		} else {
			$("#noprogress").show();
			console.log("err2");
		}
	} else {
		$("#noprogress").show();
		console.log("err1");
	}
});

function progressLessonByKey(key, i) {
	for(j=0; j<completed.length; j++) {
		var classname="ui-li-static ui-body-inherit";
		  if (i==0) {
			classname+=" ui-first-child";
		  }
		  if (i==progressData.available.length-1) {
			classname+=" ui-last-child";
		  }
		  var h3=$("<h3></h3>");
		  var p=$("<p></p>");
		  h3.html(progressData.available[i].Category);
		  p.html(progressData.available[i].Description);
		  var li=$("<li></li>");
		  li.append(h3);
		  li.append(p);
		  li.addClass(classname);
		  li.attr("data-filename", progressData.available[i].File);
		  //where we store the filename for the JSON
		  li.attr("id", progressData.available[i].Category);
		  li.click(function(){
			option = $(this).attr("data-filename");
			if(confirm("Do you want to restart this lesson?")) {
				lesson = option.replace(".json", "");
				$("body").pagecontainer("change", "lesson.html");
			}
		  });
		  $("#proglist").append(li);
	}
}
