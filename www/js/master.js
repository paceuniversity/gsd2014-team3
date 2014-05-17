var option="", //our global variable for category choice.
lesson = "",
lessonName = "";
var appData;

$(document).on('pageshow', '#index', function() {
  var appDataJSON = window.localStorage.getItem("appData");
  if(appDataJSON == null || appDataJSON == undefined || String(appDataJSON) == "[object Object]") {
    appData = {
      available: [
        {Category: "Greetings", File: "greetings.json", Dictionary: "greetings.json", Max: 14, Description: "Learn to greet people!"},
        {Category: "Family", File: "family.json", Dictionary: "family.json", Max: 22, Description: "Talk about your family!"},
        {Category: "Days of the Week", File: "daysoftheweek.json", Dictionary: "daysoftheweek.json", Max: 7, Description: "Learn the days of the week!"},
        {Category: "Time", File: "time.json", Dictionary: "time.json", Max: 10, Description: "Talk about different time periods!"}
      ],
      completed: [
        {Category: "Greetings", Score: 12}
      ],
      unlockedDictionaries: [
          {Category: "Greetings", File: "greetings.json"},
          {Category: "Days of the Week", File: "daysoftheweek.json"},
          {Category: "Family", File: "family.json"},
          {Category: "Time", File: "time.json"}
      ]
    };
    window.localStorage.setItem("appData", JSON.stringify(appData));
  } else {
    appData = $.parseJSON(appDataJSON);
  }

  /*bind exit function*/
  function exitAppPopup() {
    navigator.notification.confirm(
          'Exit Jifunze Kiswahili?'
        , function(button) {
              if (button == 2) {
                  navigator.app.exitApp();
              }
          }
        , 'Exit'
        , 'Keep Learning'
    );
    return false;
  }
  $("#ebutton").on('click', exitAppPopup());
});

$(document).bind('mobileinit', function() {
});

$( document ).on( "mobileinit", function() {

  // We want popups to cover the page behind them with a dark background
  $.mobile.popup.prototype.options.overlayTheme = "b";

  // Set a namespace for jQuery Mobile data attributes
//  $.mobile.ns = "jqm-";
  alert('test');
});

$(document).on('pageshow', function() {
});

$(document).on('pageload', function() {
});

  $(document).bind("pagebeforecreate", function(event, ui) {
    console.log("The DOM is untouched by jQM");
  });

  $(document).bind("pagebeforeshow", function(event, ui) {
	var loader = $("<div></div>");
	$("div[data-role=page]").wrap(loader.hide());
	$('.ui-loader').show();
    console.log("Before show");
  });

  $(document).bind("pageshow", function(event, ui) {
	$("div[data-role=page]").unwrap();
	$('.ui-loader').hide();
  });

  $(document).bind("pagebeforehide", function(event, ui) {
    console.log("Before hide");
  });

  $(document).bind("pagehide", function(event, ui) {
    console.log("Hide");
  });

console.log("test ignore");

$.mobile.loading( 'show', {
	text: 'foo',
	textVisible: true,
	theme: 'z',
	html: ""
  });
