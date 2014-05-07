var dicentries=[];
$(document).on('pageshow', '#dictionary', function() {
console.log("Dictionary loaded");
  $.getJSON("data/dictionary/"+option, function(data) {/*you would put a variable here once we fix the chooser*/
    console.log(data.category);
    for (i=0; i<data.entries.length; i++) {
      dicentries.push(data.entries[i]);
    }
    makelist();
  });
  $("#english").click(function(){
    console.log("english sorting test");
    console.log(dicentries);
    dicentries.sort(function (a, b) {
      if (a.english.toUpperCase() > b.english.toUpperCase())
        return 1;
      if (a.english.toUpperCase() < b.english.toUpperCase())
        return -1;
      // a must be equal to b
      return 0;
    });
    console.log(dicentries);
    $("#dictionarylist").html("");
    makelist();
  });
  $("#kiswahili").click(function(){
    dicentries.sort(function (a, b) {
      if (a.kiswahili.toUpperCase() > b.kiswahili.toUpperCase())
        return 1;
      if (a.kiswahili.toUpperCase() < b.kiswahili.toUpperCase())
        return -1;
      // a must be equal to b
      return 0;
    });
    console.log(dicentries);
    $("#dictionarylist").html("");
    makelist();
  });
  $("#homelink").click(function(){
    dicentries=[];
    console.log(dicentries);
  });
  function makelist(){
    for (i=0; i<dicentries.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      if (i==0) {
        classname+=" ui-first-child";
      }else if (i==dicentries.length-1) {
        classname+=" ui-last-child";
      }
      var h3=$("<h3></h3>").html(dicentries[i].kiswahili);
      var pstrong=$("<p></p>").append("<strong></strong>").html(dicentries[i].english);

      var audiv=$("<a></a>");
      audiv.addClass("ui-btn-right jqm-home audio");
      audiv.attr("data-filename", "assets/audio/greetings/"+dicentries[i].audio);
      audiv.html("audio");
      var li=$("<li></li>");
      li.append(h3).append(pstrong).append(audiv);
      var p = $("<span></span>");
      if (typeof(dicentries[i].notes))
        p.html(dicentries[i].notes);
      else
        p.html("No additional notes");
      p.hide();
      li.append(p);
      li.click(function(){
        $("#note").html($(this).find("span").html());
        $("#notes").popup("open");
      });
      li.addClass(classname);
      li.attr("id", dicentries[i].english);
      $("#dictionarylist").append(li);
    }
  }
});
