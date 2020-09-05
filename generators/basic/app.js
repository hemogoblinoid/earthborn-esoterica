"use strict";

const encounters = [
  { type: 1, description: "Mundane Animals" },
  { type: 2, description: "People" },
  { type: 3, description: "Intelligent Animal" },
  { type: 4, description: "Chimera" },
  { type: 5, description: "Something weird" },
  { type: 6, description: "Something really weird" }
];

const animals = [
  { quantity: 2, dice: 6, mod: 0, description: "mammoths" },
  { quantity: 2, dice: 8, mod: 0, description: "horses (reindeer stats)" },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer" },
  { quantity: 2, dice: 8, mod: 0, description: "aurochs (boar stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "terror birds (herbivorus)" },
  { quantity: 2, dice: 6, mod: 0, description: "wooly rhinos" },
  { quantity: 2, dice: 8, mod: 0, description: "bison (rhino stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "hares" },
  { quantity: 2, dice: 4, mod: 0, description: "ptarmigan" },
  { quantity: 1, dice: 1, mod: 0, description: "lone mammoth (bigger)" },
  { quantity: 2, dice: 6, mod: 0, description: "wolves" },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas" },
  { quantity: 1, dice: 1, mod: 0, description: "eagle (bird of pray stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "jackals" },
  { quantity: 2, dice: 4, mod: 0, description: "vultures" },
  { quantity: 1, dice: 4, mod: 0, description: "sabre-toothed tigers" },
  { quantity: 1, dice: 4, mod: 1, description: "vipers" },
  { quantity: 2, dice: 4, mod: 0, description: "titanotheriums" },
  { quantity: 1, dice: 1, mod: 0, description: "Glyptodon" },
  { quantity: 1, dice: 20, mod: 20, description: "migratory reindeer" }
];

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max + 1);
}

function rollD4(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(4);
  }
  return total;
}

function rollD6(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(6);
  }
  return total;
}

function rollD8(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(8);
  }
  return total;
}

function rollD20(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(20);
  }
  return total;
}

function chooseEncounterType(roll) {
  let text = "";
  let monsterRoll = 0;
  let encounter = null;
  let encounterQty = 0;

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
      monsterRoll = rollD20(1);
      encounter = animals[monsterRoll - 1];
      switch (encounter.dice) {
        case 1:
          encounterQty = 1 + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 4:
          encounterQty = rollD4(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 6:
          encounterQty = rollD6(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 8:
          encounterQty = rollD8(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 20:
          encounterQty = rollD20(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
      }
      break;
    case 11:
    case 12:
      text = encounters[1].description;
      break;
    case 13:
    case 14:
      text = encounters[2].description;
      monsterRoll = rollD20(1);
      encounter = animals[monsterRoll - 1];
      switch (encounter.dice) {
        case 1:
          encounterQty = 1 + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 4:
          encounterQty = rollD4(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 6:
          encounterQty = rollD6(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 8:
          encounterQty = rollD8(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 20:
          encounterQty = rollD20(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
      }

      text = text + " + Intelligent";
      break;
    case 15:
    case 16:
    case 17:
      text = encounters[3].description;
      monsterRoll = rollD20(1);
      encounter = animals[monsterRoll - 1];
      switch (encounter.dice) {
        case 1:
          encounterQty = 1 + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 4:
          encounterQty = rollD4(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 6:
          encounterQty = rollD6(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 8:
          encounterQty = rollD8(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
        case 20:
          encounterQty = rollD20(encounter.quantity) + encounter.mod;
          text = encounterQty + " " + encounter.description;
          break;
      }

      text = text + " + Chimera";
      break;
    case 18:
    case 19:
      text = encounters[4].description;
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

function generateEncounter() {
  let encounterRoll = rollD20(1);
  chooseEncounterType(encounterRoll);
}
