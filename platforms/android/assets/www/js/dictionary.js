var dicentries=[];
var isEnglish = false;

$(document).on('pageshow', '#dictionary', function() {
  $.getJSON("data/dictionary/"+option, function(data) {/*you would put a variable here once we fix the chooser*/
    for (i=0; i<data.entries.length; i++) {
      dicentries.push(data.entries[i]);
    }
    makelist(dicentries);
  });
  $("#english").click(function(){
    dicentries.sort(function (a, b) {
      if (a.english.toUpperCase() > b.english.toUpperCase())
        return 1;
      if (a.english.toUpperCase() < b.english.toUpperCase())
        return -1;
      // a must be equal to b
      return 0;
    });
    isEnglish = true;
    makelist(dicentries);
    $("#dictionarySearch").attr("placeholder", "Search by English...");
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
    isEnglish = false;
    makelist(dicentries);
    $("#dictionarySearch").attr("placeholder", "Search by Kiswahili...");
  });
  $("#homelink").click(function(){
    dicentries=[];
  });
  function makelist(entries){
    $("#dictionarylist").html("");
    for (i=0; i<entries.length; i++) {
      var classname="ui-li-static ui-body-inherit";
      if (i==0) {
        classname+=" ui-first-child";
      }else if (i==entries.length-1) {
        classname+=" ui-last-child";
      }
      if (!isEnglish) {
        var h3=$("<h3></h3>").html(entries[i].kiswahili);
        var pstrong=$("<p></p>").append("<strong></strong>").html(entries[i].english);
      }else {
        var h3=$("<h3></h3>").html(entries[i].english);
        var pstrong=$("<p></p>").append("<strong></strong>").html(entries[i].kiswahili);
      }
      var audiv=$("<a></a>").attr("href", "#");
      audiv.addClass("ui-btn-right jqm-home audio");
      audiv.attr("data-filename", "data/audio/greetings/"+entries[i].audio);
	  audiv.click(function() {
		console.log($(this).attr("data-filename"));
		var hintAudio = new Media($(this).attr("data-filename"));
		hintAudio.play();
	  });
      var li=$("<li></li>");
	  var wrapper=$("<div></div>");
      wrapper.append(h3).append(pstrong);
	  li.append(wrapper).append(audiv);
      var p = $("<span></span>");
      if (entries[i].notes)
        p.html(entries[i].notes);
      else
        p.html("No additional notes");
      p.hide();
      wrapper.append(p);
      wrapper.click(function(){
        $("#note").html($(this).find("span").html());
        $("#notes").popup("open");
      });
      li.addClass(classname);
      li.attr("id", entries[i].english);
      $("#dictionarylist").append(li);
    }
  }

  $("#dictionarySearch").keyup(function() {
    var searchQuery = $(this).val();
    var searchResults = [];
    var strSearch;

    for(k=0; k<dicentries.length; k++) {
      if(!isEnglish) {
        if(dicentries[k].kiswahili.toString().substring(0, searchQuery.length).toLowerCase() == searchQuery.toLowerCase())
          searchResults.push(dicentries[k]);
      } else {
        if(dicentries[k].english.toString().substring(0, searchQuery.length).toLowerCase() == searchQuery.toLowerCase())
          searchResults.push(dicentries[k]);
      }
    }
    makelist(searchResults);
  });
});
