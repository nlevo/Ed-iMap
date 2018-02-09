var map = AmCharts.makeChart("chartdiv", {
    "type": "map",
    "theme": "light",
    "dataProvider": {
      "map": "usaLow",
      "getAreasFromMap": true,
    },
    "areasSettings": {
      "selectedColor": "#d9534f", //red color
      "selectable": true,
      "autoZoom": false,
      "bringForwardOnHover": true,
      "color": "#74C6E5", //blue color
      "balloonText": ""
    },
    "imagesSettings": {
        "labelPosition": "middle",
        "labelFontSize": 8,
      },
    "mouseWheelZoomEnabled": true,

  /**
   * Add click event to track country selection/unselection
   */
  "listeners": [{
    "event": "clickMapObject",
    "method": function(e) {
      
      // Ignore any click not on area
      if (e.mapObject.objectType !== "MapArea")
        return;
      
    
       // e.mapObject.selectedColorReal = selectColorBasedOnUserAnswer(e.mapObject);
      
      
      //console.log(area);
      
      // Toggle showAsSelected
      if(game.gameOn){
        var x = isAnswerCorrect(e);
        var area = e.mapObject;
        area.showAsSelected = !area.showAsSelected;
        e.chart.returnInitialColor(area);
        $('#question').append("<h4 class=\"pt-2\">" + game.answer + "</h4>");
        setTimeout(createQuestion, 500);
       }
      
      // Update the list
      //document.getElementById("selected").innerHTML = JSON.stringify(getSelectedCountries());
      
    }
  }]
});

/**
 * Function which extracts currently selected country list.
 * Returns array consisting of country ISO2 codes
 */

 function isAnswerCorrect(e){
    if(e.mapObject.enTitle.toUpperCase() === game.answer && userTry === 1){
        e.mapObject.selectedColorReal = "green";
        game.correctAnswer++;
        $('#questions-stat').text("Correct: " + game.correctAnswer + "\/" + game.maxQuestions);
        clearTimeout(countDown);
        return true;
    }
    else if(e.mapObject.enTitle.toUpperCase() === correctAnswer && userTry > 1) {
        e.mapObject.selectedColorReal = "yellow";
        clearTimeout(countDown);
        return true;
    }
    else {
        e.mapObject.selectedColorReal = "red";
        game.incorrectAnswer++;
        clearTimeout(countDown);
        return false;
    } 
 }

function getSelectedCountries() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selected.push(map.dataProvider.areas[i].id);
  }
  return selected;
}

function selectColorBasedOnUserAnswer(object){
    if(object.enTitle.toUpperCase() === answer && userTry === 1){
        $('#questions-stat').text('Test');
        return "green"; 
    }
    else if(object.enTitle === correctAnswer && userTry > 1) {
        return  "yellow";
    }
    else {
        return "red";
    }
}  

var correctAnswer = "Florida";
var userTry = 1;

function restartMap (){ 

//unselects every map/state/region, thus color goes to default   
var area = map.dataProvider.areas;
area.forEach(element => {
    element.showAsSelected = false;
});

// make the chart take in new color
map.validateNow();
  return "Done"
}

// var map = AmCharts.makeChart( "chartdiv", {
//     "type": "map",
//     "theme": "light",
//     "colorSteps": 10,
  
//     "dataProvider": {
//       "map": "usaLow",
//       "areas": [ {
//         id: "US-AL",
//         value: 4447100
//       }, {
//         id: "US-AK",
//         value: 626932
//       }, {
//         id: "US-AZ",
//         value: 5130632
//       }, {
//         id: "US-AR",
//         value: 2673400
//       }, {
//         id: "US-CA",
//         value: 33871648
//       }, {
//         id: "US-CO",
//         value: 4301261
//       }, {
//         id: "US-CT",
//         value: 3405565
//       }, {
//         id: "US-DE",
//         value: 783600
//       }, {
//         id: "US-FL",
//         value: 15982378
//       }, {
//         id: "US-GA",
//         value: 8186453
//       }, {
//         id: "US-HI",
//         value: 1211537
//       }, {
//         id: "US-ID",
//         value: 1293953
//       }, {
//         id: "US-IL",
//         value: 12419293
//       }, {
//         id: "US-IN",
//         value: 6080485
//       }, {
//         id: "US-IA",
//         value: 2926324
//       }, {
//         id: "US-KS",
//         value: 2688418
//       }, {
//         id: "US-KY",
//         value: 4041769
//       }, {
//         id: "US-LA",
//         value: 4468976
//       }, {
//         id: "US-ME",
//         value: 1274923
//       }, {
//         id: "US-MD",
//         value: 5296486
//       }, {
//         id: "US-MA",
//         value: 6349097
//       }, {
//         id: "US-MI",
//         value: 9938444
//       }, {
//         id: "US-MN",
//         value: 4919479
//       }, {
//         id: "US-MS",
//         value: 2844658
//       }, {
//         id: "US-MO",
//         value: 5595211
//       }, {
//         id: "US-MT",
//         value: 902195
//       }, {
//         id: "US-NE",
//         value: 1711263
//       }, {
//         id: "US-NV",
//         value: 1998257
//       }, {
//         id: "US-NH",
//         value: 1235786
//       }, {
//         id: "US-NJ",
//         value: 8414350
//       }, {
//         id: "US-NM",
//         value: 1819046
//       }, {
//         id: "US-NY",
//         value: 18976457
//       }, {
//         id: "US-NC",
//         value: 8049313
//       }, {
//         id: "US-ND",
//         value: 642200
//       }, {
//         id: "US-OH",
//         value: 11353140
//       }, {
//         id: "US-OK",
//         value: 3450654
//       }, {
//         id: "US-OR",
//         value: 3421399
//       }, {
//         id: "US-PA",
//         value: 12281054
//       }, {
//         id: "US-RI",
//         value: 1048319
//       }, {
//         id: "US-SC",
//         value: 4012012
//       }, {
//         id: "US-SD",
//         value: 754844
//       }, {
//         id: "US-TN",
//         value: 5689283
//       }, {
//         id: "US-TX",
//         value: 20851820
//       }, {
//         id: "US-UT",
//         value: 2233169
//       }, {
//         id: "US-VT",
//         value: 608827
//       }, {
//         id: "US-VA",
//         value: 7078515
//       }, {
//         id: "US-WA",
//         value: 5894121
//       }, {
//         id: "US-WV",
//         value: 1808344
//       }, {
//         id: "US-WI",
//         value: 5363675
//       }, {
//         id: "US-WY",
//         value: 493782
//       } ]
//     },
//     "mouseWheelZoomEnabled": true,
//     "areasSettings": {
//     },
    
//     "imagesSettings": {
//       "labelPosition": "middle",
//       "labelFontSize": 8
//     },
  
//   } );
  
//   map.addListener("init", function () {
//     // set up a longitude exceptions for certain areas
//     var longitude = {
//       "US-CA": -130,
//       "US-FL": 120,
//       "US-TX": 1,
//       "US-LA": 40
//     };
    
//     var latitude = {
//       "US-AK": -85
//     };
    
//     setTimeout(function () {
//       // iterate through areas and put a label over center of each
//       map.dataProvider.images = [];
//       for( x in map.dataProvider.areas ) {
//         var area = map.dataProvider.areas[ x ];
//         area.groupId = area.id;
//         var image = new AmCharts.MapImage();
//         image.latitude = latitude[ area.id ] || map.getAreaCenterLatitude( area );
//         image.longitude = longitude[ area.id ] || map.getAreaCenterLongitude( area );
//         image.label = area.id.split('-').pop();
//         image.title = area.title;
//         image.linkToObject = area;
//         image.groupId = area.id;
//         map.dataProvider.images.push( image );
//       }
//       map.validateData();
//       console.log(map.dataProvider);
//     }, 100)
//   });