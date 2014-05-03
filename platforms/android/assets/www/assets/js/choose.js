var categories=[]
$(document).on('pageshow', '#conversation-chooser', function() {
  $.getJSON("data/master.json", function(data) {
    console.log(data.available);
    console.log("debug");
    console.log(data.available);
    var completed=[];
    $.each( data.available, function(index, value) {
      var classname="ui-li-static ui-body-inherit";
      if (index==0) {
        classname+=" ui-first-child";
      }else if (index==data.available.length-1) {
        classname+=" ui-last-child";
      }
      var li=$("<li></li>");
      li.html(value.Description);
      li.addClass(classname);
      li.attr("id", value.Category);
      categories.push(li);
    });
    for (i=0; i<categories.length; i++) {
      $("#catlist").append(categories[i]);
    }
  });
});
