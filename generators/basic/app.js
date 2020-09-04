"use strict";

const encounters = [
  { description: "Mundane Animals" },
  { description: "People" },
  { description: "Intelligent Animal" },
  { description: "Chimera" },
  { description: "Something weird" },
  { description: "Something really weird" }
];

function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "<strong>Description:</strong> " + data[i].description;
    mainContainer.appendChild(div);
  }
}

appendData(encounters);
