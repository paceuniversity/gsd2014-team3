$(document).on('pageshow', '#dictionarypage', function() {
  $.getJSON("data/dictionary/greetings.json", function(data) {/*you would put a variable here once we fix the chooser*/
    console.log(data.category);
    for (i=0; i<data.entries.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      console.log(data.entries[i].english);
      if (i==0) {
        classname+=" ui-first-child";
      }else if (i==data.entries.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>").html(data.entries[i].kiswahili);
      var pstrong=$("<p><strong></strong></p>").html(data.entries[i].english);
      console.log("test");
      var p=null;
      if (typeof(data.entries[i].notes)!=='undefined'){
        p=$("<p></p>").html(data.entries[i].notes);
      }
      var audio=$("<p></p>").addClass("ui-li-aside")
      var link=$("<a></a>").attr("src", data.entries[i].audio);
      audio.html("<strong><a>"+link+"</a></strong>");
      var li=$("<li></li>");
      li.html(h3+pstrong+p+audio);
      li.addClass(classname);
      li.attr("id", data.entries[i].english);
      $("#dictionary").append(li);
    }
  });
});
