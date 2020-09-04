"use strict";

const encounters = [
  { number: 1, description: "Mundane Animals" },
  { number: 2, description: "People" },
  { number: 3, description: "Intelligent Animal" },
  { number: 4, description: "Chimera" },
  { number: 5, description: "Something weird" },
  { number: 6, description: "Something really weird" }
];

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max + 1);
}

function rollD6(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(6);
  }
  chooseRow(total);
}

function rollD20(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(20);
  }
  chooseRow(total);
}

function chooseRow(roll) {
  let text = "";
  switch (roll) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      text = encounters[0].description;
      break;
    case 11:
    case 12:
      text = encounters[1].description;
      break;
    case 13:
    case 14:
      text = encounters[2].description;
      break;
    case 15:
    case 16:
    case 17:
      text = encounters[3].description;
      break;
    case 18:
    case 19:
      text = encounters[4].description;
      break;
    case 20:
      text = encounters[5].description;
      break;
    default:
      text = "error";
  }
  presentText(text);
}

function presentText(text) {
  var mainContainer = document.getElementById("totalDiv");
  mainContainer.innerHTML = text;
  //   mainContainer.appendChild(div);
  //   for (var i = 0; i < data.length; i++) {
  //     var div = document.createElement("div");
  //     div.innerHTML = "<strong>Description:</strong> " + data[i].description;
  //     mainContainer.appendChild(div);
  //   }
}
