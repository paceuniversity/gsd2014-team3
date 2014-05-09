$(document).on('pageshow', '#conversation-chooser', function() {
  $.getJSON("data/master.json", function(data) {
    var completed=[];
    for (i=0; i<data.available.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      if (i==0) {
        classname+=" ui-first-child";
      }
      if (i==data.available.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>");
      var p=$("<p></p>");
      h3.html(data.available[i].Category);
      p.html(data.available[i].Description);
      var li=$("<li></li>");
      li.append(h3);
      li.append(p);
      li.addClass(classname);
      li.attr("data-filename", data.available[i].File);
      //where we store the filename for the JSON
      li.attr("id", data.available[i].Category);
      li.click(function(){
        option=$(this).attr("data-filename");
        console.log(option);
		lesson = option.replace(".json", "");
		$("body").pagecontainer("change", "lesson.html");
      });
      $("#catlist").append(li);
    }
  });
});
