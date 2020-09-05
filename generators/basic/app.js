"use strict";

var text = "";
var monsterRoll = 0;
var encounter = null;
var encounterQty = 0;
var area = null;

const locations = [
  { id: 1, description: "Plains" },
  { id: 2, description: "Forest" },
  { id: 3, description: "Wetland" },
  { id: 4, description: "Highland" },
  { id: 5, description: "Coast" },
  { id: 6, description: "Ice Sheet" },
  { id: 7, description: "Underground" },
];

const encounters = [
  { type: 1, description: "Mundane Animals" },
  { type: 2, description: "People" },
  { type: 3, description: "Intelligent Animal" },
  { type: 4, description: "Chimera" },
  { type: 5, description: "Something weird" },
  { type: 6, description: "Something really weird" },
];

const plainsAnimals = [
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
  { quantity: 1, dice: 1, mod: 0, description: "eagle (bird of prey stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "jackals" },
  { quantity: 2, dice: 4, mod: 0, description: "vultures" },
  { quantity: 1, dice: 4, mod: 0, description: "sabre-toothed tigers" },
  { quantity: 1, dice: 4, mod: 1, description: "vipers" },
  { quantity: 2, dice: 4, mod: 0, description: "titanotheriums" },
  { quantity: 1, dice: 1, mod: 0, description: "Glyptodon" },
  { quantity: 1, dice: 20, mod: 20, description: "migratory reindeer" },
];

const forestAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "deer (reindeer stats" },
  { quantity: 2, dice: 4, mod: 0, description: "boars" },
  { quantity: 1, dice: 6, mod: 0, description: "owls (bird of prey stats)" },
  { quantity: 2, dice: 8, mod: 0, description: "reindeer" },
  { quantity: 2, dice: 4, mod: 0, description: "terror birds (predatory)" },
  { quantity: 2, dice: 6, mod: 0, description: "bison (rhino stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "beavers (hare stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "weasels (jackal stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "grouse (ptarmigan stats)" },
  { quantity: 3, dice: 8, mod: 0, description: "rats (hare stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "wolves" },
  { quantity: 1, dice: 4, mod: 1, description: "gigantopithicus" },
  { quantity: 2, dice: 6, mod: 0, description: "foxes (jackal stats)" },
  { quantity: 1, dice: 1, mod: 0, description: "bear" },
  { quantity: 2, dice: 1, mod: 0, description: "bears" },
  { quantity: 1, dice: 2, mod: 0, description: "mountain lions" },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine" },
  { quantity: 2, dice: 10, mod: 0, description: "bats" },
  { quantity: 1, dice: 1, mod: 0, description: "megatherium" },
  { quantity: 3, dice: 10, mod: 0, description: "antelope (reindeer stats)" },
];

const wetlandAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "antelope (reindeer stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "boars" },
  { quantity: 1, dice: 6, mod: 0, description: "osprey (bird of prey stats)" },
  { quantity: 1, dice: 4, mod: 0, description: "hippos (rhino stats)" },
  { quantity: 1, dice: 4, mod: 0, description: "eels (viper stats, aquatic)" },
  { quantity: 2, dice: 6, mod: 0, description: "bison (rhino stats)" },
  { quantity: 1, dice: 4, mod: 1, description: "mammoths" },
  { quantity: 2, dice: 4, mod: 0, description: "rabbits" },
  { quantity: 2, dice: 4, mod: 0, description: "swans (vulture stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "heron (vulture stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "jackals" },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas" },
  { quantity: 2, dice: 6, mod: 0, description: "foxes (jackal stats)" },
  { quantity: 1, dice: 1, mod: 0, description: "pike (wolf stats, aquatic)" },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "turtle (jackal stats, aquatic",
  },
  { quantity: 1, dice: 2, mod: 0, description: "saber-toothed tigers" },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine" },
  { quantity: 2, dice: 10, mod: 0, description: "ducks (ptarmigan stats)" },
  { quantity: 1, dice: 1, mod: 0, description: "mastodon" },
  { quantity: 3, dice: 10, mod: 0, description: "elk (reindeer stats)" },
];

const highlandAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "mammoths" },
  { quantity: 2, dice: 8, mod: 0, description: "goats (reindeer stats)" },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer" },
  { quantity: 1, dice: 4, mod: 1, description: "mastodons" },
  { quantity: 2, dice: 6, mod: 0, description: "crows (ptarmigan stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "wooly rhinos" },
  { quantity: 2, dice: 8, mod: 1, description: "bison (rhino stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "hares" },
  { quantity: 2, dice: 4, mod: 0, description: "ptarmigan" },
  { quantity: 1, dice: 1, mod: 0, description: "mammoth (bigger)" },
  { quantity: 2, dice: 6, mod: 0, description: "wolves" },
  { quantity: 2, dice: 4, mod: 0, description: "elks" },
  { quantity: 1, dice: 4, mod: 0, description: "lynxes (wolf stats)" },
  { quantity: 1, dice: 4, mod: 0, description: "bears" },
  { quantity: 2, dice: 4, mod: 0, description: "vultures" },
  { quantity: 1, dice: 4, mod: 0, description: "mountain lions" },
  { quantity: 3, dice: 10, mod: 0, description: "lemmings (hare stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "antelopes" },
  { quantity: 1, dice: 1, mod: 0, description: "eagle (bird of prey stats)" },
  { quantity: 3, dice: 6, mod: 0, description: "bats" },
];

const coastAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "antelope (reindeer stats)" },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "walruses (boar stats, aquatic)",
  },
  { quantity: 2, dice: 6, mod: 0, description: "seals (boar stats, aquatic)" },
  { quantity: 2, dice: 4, mod: 1, description: "storks (vulture stats)" },
  { quantity: 1, dice: 4, mod: 0, description: "eels (viper stats, aquatic)" },
  { quantity: 2, dice: 6, mod: 0, description: "bison (rhinos stats)" },
  { quantity: 1, dice: 4, mod: 1, description: "mammoths" },
  { quantity: 2, dice: 4, mod: 0, description: "lemmings (hare stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "swans (vulture stats)" },
  { quantity: 2, dice: 4, mod: 0, description: "herons (vulture stats)" },
  { quantity: 2, dice: 6, mod: 0, description: "jackals" },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas" },
  { quantity: 2, dice: 4, mod: 0, description: "foxes (jackal stats)" },
  { quantity: 1, dice: 4, mod: 0, description: "bears" },
  { quantity: 2, dice: 6, mod: 0, description: "antelopes" },
  { quantity: 1, dice: 2, mod: 0, description: "cave lions" },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine" },
  { quantity: 2, dice: 10, mod: 0, description: "gulls (ptarmigan stats)" },
  { quantity: 1, dice: 1, mod: 0, description: "mastodon" },
  { quantity: 3, dice: 10, mod: 0, description: "elk (reindeer stats)" },
];

const iceSheetAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "wolves" },
  { quantity: 2, dice: 8, mod: 0, description: "mammoths" },
  { quantity: 2, dice: 6, mod: 0, description: "reindeer" },
  { quantity: 2, dice: 4, mod: 0, description: "wooly rhinos" },
  { quantity: 1, dice: 1, mod: 0, description: "fox (jackal stats)" },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "walruses (boar stats, aquatic)",
  },
  { quantity: 1, dice: 1, mod: 0, description: "mammoth" },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine" },
  { quantity: 1, dice: 6, mod: 1, description: "gulls (ptarmigan stats)" },
  { quantity: 1, dice: 1, mod: 0, description: "bear" },
  { quantity: 1, dice: 4, mod: 1, description: "jackals" },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer" },
];

const undergroundAnimals = [
  { quantity: 1, dice: 4, mod: 1, description: "cave lions" },
  { quantity: 1, dice: 6, mod: 1, description: "jackals" },
  { quantity: 1, dice: 1, mod: 0, description: "bear" },
  { quantity: 1, dice: 4, mod: 1, description: "bears" },
  { quantity: 3, dice: 10, mod: 0, description: "rats" },
  { quantity: 2, dice: 12, mod: 0, description: "bats" },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas" },
  { quantity: 1, dice: 6, mod: 1, description: "goats" },
  { quantity: 1, dice: 4, mod: 0, description: "gygantaoputhecuses" },
  { quantity: 1, dice: 6, mod: 1, description: "moles (use hares)" },
  { quantity: 1, dice: 4, mod: 0, description: "vipers" },
  { quantity: 1, dice: 4, mod: 0, description: "owls (birds of prey stats)" },
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

function rollD12(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(12);
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

function chooseAnimalBasedOnLocation() {
  switch (parseInt(area)) {
    case 1:
      chooseAnimal(20, plainsAnimals);
      break;
    case 2:
      chooseAnimal(20, forestAnimals);
      break;
    case 3:
      chooseAnimal(20, wetlandAnimals);
      break;
    case 4:
      chooseAnimal(20, highlandAnimals);
      break;
    case 5:
      chooseAnimal(20, coastAnimals);
      break;
    case 6:
      chooseAnimal(12, iceSheetAnimals);
      break;
    case 7:
      chooseAnimal(12, undergroundAnimals);
      break;
  }
}

function chooseAnimal(rows, table) {
  if (rows == 12) {
    monsterRoll = rollD12(1);
  } else {
    monsterRoll = rollD20(1);
  }

  encounter = table[monsterRoll - 1];
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
}

function chooseEncounterType(roll) {
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
      chooseAnimalBasedOnLocation();
      break;
    case 11:
    case 12:
      text = encounters[1].description;
      break;
    case 13:
    case 14:
      text = encounters[2].description;
      chooseAnimalBasedOnLocation();
      text = text + " + Intelligent";
      break;
    case 15:
    case 16:
    case 17:
      text = encounters[3].description;
      chooseAnimalBasedOnLocation();
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
}

function createLocationDD() {
  let select = document.getElementById("locationDD");
  for (let i = 0; i < locations.length; i++) {
    var opt = locations[i];
    var el = document.createElement("option");
    el.textContent = opt.description;
    el.value = opt.id;
    select.appendChild(el);
    area = document.getElementById("locationDD").value;
  }
}

function locationDDOnChange() {
  area = document.getElementById("locationDD").value;
}

function generateEncounter() {
  let encounterRoll = rollD20(1);
  chooseEncounterType(encounterRoll);
}

createLocationDD();
