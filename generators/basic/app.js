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

const plainsWeird = [
  { quantity: 1, dice: 4, mod: 1, description: "mycelids" },
  { quantity: 2, dice: 4, mod: 0, description: "giant vermin (roll table 92)" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vermin swarms and 1 walking swarm",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vermin swarms and 1 vermin-brood mother",
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "weak drake offspring and 1 drake mother",
  },
  { quantity: 1, dice: 1, mod: 0, description: "mated pair of drakes" },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk" },
  { quantity: 1, dice: 6, mod: 1, description: "ghouls" },
  { quantity: 1, dice: 4, mod: 1, description: "vargouilles" },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "strange feral undead (table 99)",
  },
  {
    quantity: 1,
    dice: 4,
    mod: -1,
    description: "mammoths and 1 undead flesh hulk",
  },
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

const forestsWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "huge carnivirous plant" },
  { quantity: 1, dice: 4, mod: 1, description: "carnivorous plants" },
  { quantity: 2, dice: 4, mod: 0, description: "giant spiders and their webs" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "spider offspring and their spider brood-mother",
  },
  { quantity: 1, dice: 1, mod: 0, description: "giant vermin (table 92)" },
  { quantity: 1, dice: 1, mod: 0, description: "ooze" },
  { quantity: 1, dice: 1, mod: 0, description: "drake" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mycelids and the plant-monster that made them",
  },
  { quantity: 1, dice: 6, mod: 1, description: "ghouls" },
  { quantity: 1, dice: 1, mod: 0, description: "shambling compost-heap" },
  { quantity: 1, dice: 1, mod: 0, description: "mimic" },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
  },
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

const wetlandsWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "plant monster" },
  { quantity: 1, dice: 4, mod: 0, description: "aquatic vermin" },
  { quantity: 1, dice: 4, mod: 1, description: "giant vermin" },
  { quantity: 1, dice: 1, mod: 0, description: "shambling compost heap" },
  { quantity: 1, dice: 1, mod: 0, description: "ooze" },
  { quantity: 1, dice: 1, mod: 0, description: "giant amoeba" },
  { quantity: 1, dice: 4, mod: 1, description: "bog mummies (table 91)" },
  { quantity: 1, dice: 2, mod: 0, description: "hydras" },
  { quantity: 1, dice: 1, mod: 0, description: "hyrda and its young" },
  { quantity: 1, dice: 4, mod: 0, description: "mycelids" },
  { quantity: 1, dice: 4, mod: 0, description: "mycelids spawns and an ooze" },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
  },
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

const highlandsWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "beast of snow and ice" },
  { quantity: 1, dice: 4, mod: 0, description: "animated stones" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description:
      "animated tools and 1 magma beast within a crack in the ground",
  },
  { quantity: 1, dice: 4, mod: 0, description: "giant spiders and their webs" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "skeletal slaves and 1 tomb guardian",
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "drakes and d6 of young (viper stats)",
  },
  { quantity: 1, dice: 1, mod: 0, description: "baskilisk" },
  { quantity: 1, dice: 1, mod: 0, description: "hyrda" },
  { quantity: 1, dice: 1, mod: 0, description: "mimic" },
  { quantity: 1, dice: 4, mod: 0, description: "angry fossils" },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
  },
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

const coastWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "plant monster (table 93)" },
  { quantity: 1, dice: 4, mod: 0, description: "aquatic vermin (table 92)" },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "giant aquatic vermin (table 92)",
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "drakes and d6 of young (viper stats)",
  },
  { quantity: 1, dice: 1, mod: 0, description: "baskilisk" },
  { quantity: 1, dice: 4, mod: 1, description: "bog mummies (table 92)" },
  { quantity: 1, dice: 2, mod: 0, description: "hydras" },
  { quantity: 1, dice: 1, mod: 0, description: "kraken" },
  { quantity: 1, dice: 4, mod: 1, description: "ghouls" },
  { quantity: 1, dice: 4, mod: 1, description: "mycelids spawns and 1 ooze" },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
  },
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

const iceSheetWeird = [
  { quantity: 2, dice: 6, mod: 0, description: "wolves" },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "wolves and d6 wolves of the ice sheet",
  },
  { quantity: 1, dice: 1, mod: 0, description: "flesh hulk" },
  { quantity: 1, dice: 4, mod: 0, description: "ghouls and a spectre" },
  { quantity: 1, dice: 1, mod: 0, description: "mimic" },
  { quantity: 1, dice: 1, mod: 0, description: "beast of ice and snow" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "beasts of ice and snow, and d6 animated stones",
  },
  { quantity: 1, dice: 1, mod: 0, description: "mimics" },
  { quantity: 1, dice: 1, mod: 0, description: "shoggoth beneath the ice" },
  { quantity: 1, dice: 4, mod: 0, description: "walking swarms" },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "tunneling terrible worm beneath the ice",
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
  },
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

const undergroundWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "shoggoth" },
  { quantity: 1, dice: 4, mod: 1, description: "mycelids" },
  { quantity: 2, dice: 6, mod: 0, description: "ghouls" },
  { quantity: 2, dice: 6, mod: 0, description: "skeletal slaves" },
  { quantity: 1, dice: 1, mod: 0, description: "pile of limbs" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated tools and 1 homunculus",
  },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk" },
  { quantity: 2, dice: 4, mod: 0, description: "giant spiders and their webs" },
  { quantity: 1, dice: 4, mod: 0, description: "vermin swarms (table 92)" },
  { quantity: 1, dice: 4, mod: 1, description: "giant barnacles" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "giant vermin and 1 vermin swarm (table 92)",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "giant vermin and 1 tunneling terrible worm",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "skeletal slaves and 1 tomb guardian",
  },
  { quantity: 1, dice: 4, mod: 0, description: "oozes" },
  { quantity: 1, dice: 4, mod: 0, description: "giant amoebas" },
  { quantity: 1, dice: 1, mod: 0, description: "fungoid plant monster" },
  { quantity: 1, dice: 4, mod: 0, description: "mycelids and 1 shoggoth" },
  { quantity: 1, dice: 4, mod: 0, description: "aquatic vermin and 1 kraken" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description:
      "morlock crawlers, d4 morlock watchers, d4 morlock whispers, morlock lurker",
  },
  { quantity: 1, dice: 4, mod: 0, description: "vargouilles and 1 mimic" },
];

const veryWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "shoggoth" },
  { quantity: 1, dice: 4, mod: 0, description: "mycelids and 1 plant monster" },
  { quantity: 1, dice: 1, mod: 0, description: "giant cave barnacle" },
  { quantity: 1, dice: 4, mod: 0, description: "walking swarms" },
  { quantity: 1, dice: 1, mod: 0, description: "magma beast" },
  { quantity: 1, dice: 1, mod: 0, description: "pain engine" },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "homonculus of blood and sinew",
  },
  { quantity: 1, dice: 6, mod: 1, description: "children and 1 vampire" },
  { quantity: 1, dice: 4, mod: 0, description: "stalkers and vampire spawn" },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "pile of limbs and 1 pain engine",
  },
  { quantity: 1, dice: 1, mod: 0, description: "mimic" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "walking swarms and 1 giant spider",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "shamans and 1 chimera (standard)",
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "crows (ptarmigan) and 1 ghoul",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "Neaderthal survivors and 1 intelligent plant monster",
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated stones and 1 basilisk",
  },
  { quantity: 2, dice: 6, mod: 0, description: "hyenas and 1 spectre" },
  { quantity: 3, dice: 6, mod: 0, description: "ghouls and 1 flesh hulk" },
  { quantity: 1, dice: 4, mod: 1, description: "children and 1 giant amoeba" },
  { quantity: 1, dice: 1, mod: 0, description: "colossus" },
];

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max + 1);
}

function rollD2(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(2);
  }
  return total;
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

function rollD10(count) {
  let total = 0;
  for (var i = 1; i <= count; i++) {
    total += getRandomInt(10);
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
      chooseEncounter(20, plainsAnimals);
      break;
    case 2:
      chooseEncounter(20, forestAnimals);
      break;
    case 3:
      chooseEncounter(20, wetlandAnimals);
      break;
    case 4:
      chooseEncounter(20, highlandAnimals);
      break;
    case 5:
      chooseEncounter(20, coastAnimals);
      break;
    case 6:
      chooseEncounter(12, iceSheetAnimals);
      break;
    case 7:
      chooseEncounter(12, undergroundAnimals);
      break;
    default:

  }
}

function chooseWeirdBasedOnLocation() {
  switch (parseInt(area)) {
    case 1:
      chooseEncounter(12, plainsWeird);
      break;
    case 2:
      chooseEncounter(12, forestsWeird);
      break;
    case 3:
      chooseEncounter(12, wetlandsWeird);
      break;
    case 4:
      chooseEncounter(12, highlandsWeird);
      break;
    case 5:
      chooseEncounter(12, iceSheetWeird);
      break;
    case 6:
      chooseEncounter(12, iceSheetWeird);
      break;
    case 7:
      chooseEncounter(20, undergroundWeird);
      break;
  }
}

function chooseReallyWeird() {
  chooseEncounter(20, veryWeird);
}

function chooseEncounter(rows, table) {
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
    case 2:
      encounterQty = rollD2(encounter.quantity) + encounter.mod;
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
    case 10:
      encounterQty = rollD10(encounter.quantity) + encounter.mod;
      text = encounterQty + " " + encounter.description;
      break;
    case 12:
      encounterQty = rollD12(encounter.quantity) + encounter.mod;
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
      chooseWeirdBasedOnLocation();
    case 20:
      text = encounters[5].description;
      chooseReallyWeird();
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