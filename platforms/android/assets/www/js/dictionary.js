$(document).on('pageshow', '#dictionary', function() {
console.log("Dictionary loaded");
  $.getJSON("data/dictionary/"+option, function(data) {/*you would put a variable here once we fix the chooser*/
    console.log(data.category);
    for (i=0; i<data.entries.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      console.log(data.entries[i].english);
      console.log(typeof(data.entries[i].english));
      if (i==0) {
        classname+=" ui-first-child";
      }else if (i==data.entries.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>").html(data.entries[i].kiswahili);
      var pstrong=$("<p></p>").append("<strong></strong>").html(data.entries[i].english);
      console.log("test");

      var audio=$("<p></p>").addClass("ui-li-aside")
      var link=$("<a></a>").attr("href", "assets/audio/greetings/"+data.entries[i].audio);
      link.html("audio");
      audio.append($("<strong></strong>").append(link));
      var li=$("<li></li>");
      li.append(h3).append(pstrong).append(audio);
      if (typeof(data.entries[i].notes)!=='undefined'){
        var p=$("<p></p>").html(data.entries[i].notes);
        li.append(p);
      }
      li.addClass(classname);
      li.attr("id", data.entries[i].english);
      $("#dictionarylist").append(li);
    }
  });
});
