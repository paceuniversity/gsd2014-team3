var entries=[]
$(document).on('pageshow', '#dictionary', function() {
  $.getJSON("data/dictionary/greetings.json", function(data) {/*you would put a variable here once we fix the chooser*/
    console.log(data.category);
    $.each( data.entries, function(index, value) {
      var classname="ui-li-static ui-body-inherit";
      if (index==0) {
        classname+=" ui-first-child";
      }else if (index==data.entries.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>").html(value.kiswahili))
      var pstrong=$("<p><strong></strong></p>").html(value.english);
      var p=$("<p></p>").html(value.notes);
      var audio=$("<p></p>").addClass("ui-li-aside")
      var link=$("<a></a>").attr("strc", value.audio);
      audio.html("<strong><a>"+link+"</a></strong>");
      var li=$("<li></li>");
      li.html(h3+pstrong+p+audio);
      li.addClass(classname);
      li.attr("id", value.Category);
      entries.push(li);
    });
    for (i=0; i<entries.length; i++) {
      $("#catlist").append(entries[i]);
    }
  });
});
