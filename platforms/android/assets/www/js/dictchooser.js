$(document).on('pageshow', '#dict-chooser', function() {
  $.getJSON("data/master.json", function(data) {
    console.log("Debug");
    console.log(data.unlockedDictionaries);
    for (i=0; i<data.unlockedDictionaries.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      if (i==0) {
        classname+=" ui-first-child";
      }
      if (i==data.unlockedDictionaries.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>").html(data.unlockedDictionaries[i].Category);
      var link=$("<a></a>").attr("href", "data/dictionaries/"+data.unlockedDictionaries[i].File);
      console.log(link);
      var li=$("<li></li>");
      li.append(h3);
      li.addClass(classname);
      li.attr("data-filename", data.unlockedDictionaries[i].File);
      li.attr("id", data.unlockedDictionaries[i].Category);
      li.click(function(){
        option=$(this).attr("data-filename");
        console.log(option);
        $(":mobile-pagecontainer").pagecontainer("change", "dictionary.html");
      });
      $("#dict-choose-list").append(li);
    }
  });
});
