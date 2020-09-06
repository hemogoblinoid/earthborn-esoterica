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
  { quantity: 2, dice: 6, mod: 0, description: "mammoths", subRoll: null },
  {
    quantity: 2,
    dice: 8,
    mod: 0,
    description: "horses (reindeer stats)",
    subRoll: null,
  },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer", subRoll: null },
  {
    quantity: 2,
    dice: 8,
    mod: 0,
    description: "aurochs (boar stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "terror birds (herbivorus)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "wooly rhinos", subRoll: null },
  {
    quantity: 2,
    dice: 8,
    mod: 0,
    description: "bison (rhino stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 4, mod: 0, description: "hares", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "ptarmigan", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "lone mammoth (bigger)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "wolves", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "eagle (bird of prey stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "jackals", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "vultures", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "sabre-toothed tigers",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 1, description: "vipers", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "titanotheriums",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "Glyptodon", subRoll: null },
  {
    quantity: 1,
    dice: 20,
    mod: 20,
    description: "migratory reindeer",
    subRoll: null,
  },
];

const plainsWeird = [
  { quantity: 1, dice: 4, mod: 1, description: "mycelids", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "giant vermin (roll table 92)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vermin swarms",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "walking swarm",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vermin swarms",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "vermin-brood mother",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "weak drake offspring",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "drake mother",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "mated pair of drakes",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk", subRoll: null },
  { quantity: 1, dice: 6, mod: 1, description: "ghouls", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "vargouilles", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "strange feral undead (table 99)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: -1,
    description: "mammoths",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "undead flesh hulk",
      subRoll: null,
    },
  },
];

const forestAnimals = [
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "deer (reindeer stats",
    subRoll: null,
  },
  { quantity: 2, dice: 4, mod: 0, description: "boars", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "owls (bird of prey stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 8, mod: 0, description: "reindeer", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "terror birds (predatory)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "bison (rhino stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "beavers (hare stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "weasels (jackal stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "grouse (ptarmigan stats)",
    subRoll: null,
  },
  {
    quantity: 3,
    dice: 8,
    mod: 0,
    description: "rats (hare stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "wolves", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "gigantopithicus",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "foxes (jackal stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "bear", subRoll: null },
  { quantity: 2, dice: 1, mod: 0, description: "bears", subRoll: null },
  {
    quantity: 1,
    dice: 2,
    mod: 0,
    description: "mountain lions",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine", subRoll: null },
  { quantity: 2, dice: 10, mod: 0, description: "bats", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "megatherium", subRoll: null },
  {
    quantity: 3,
    dice: 10,
    mod: 0,
    description: "antelope (reindeer stats)",
    subRoll: null,
  },
];

const forestsWeird = [
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "huge carnivirous plant",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "carnivorous plants",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "giant spiders and their webs",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "spider offspring",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "spider brood-mother",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "giant vermin (table 92)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "ooze", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "drake", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mycelids",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "plant-monster",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 6, mod: 1, description: "ghouls", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "shambling compost-heap",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "mimic", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
    subRoll: null,
  },
];

const wetlandAnimals = [
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "antelope (reindeer stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "boars", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "osprey (bird of prey stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 0, description: "hippos (rhino stats)" },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "eels (viper stats, aquatic)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "bison (rhino stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 1, description: "mammoths", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "rabbits", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "swans (vulture stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "heron (vulture stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "jackals", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas", subRoll: null },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "foxes (jackal stats)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "pike (wolf stats, aquatic)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "turtle (jackal stats, aquatic",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 2,
    mod: 0,
    description: "saber-toothed tigers",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine", subRoll: null },
  {
    quantity: 2,
    dice: 10,
    mod: 0,
    description: "ducks (ptarmigan stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "mastodon", subRoll: null },
  {
    quantity: 3,
    dice: 10,
    mod: 0,
    description: "elk (reindeer stats)",
    subRoll: null,
  },
];

const wetlandsWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "plant monster", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "aquatic vermin",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 1, description: "giant vermin", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "shambling compost heap",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "ooze", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "giant amoeba", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "bog mummies (table 91)",
    subRoll: null,
  },
  { quantity: 1, dice: 2, mod: 0, description: "hydras", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "hyrda and its young",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 0, description: "mycelids", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mycelids spawns",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "ooze",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
    subRoll: null,
  },
];

const highlandAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "mammoths", subRoll: null },
  {
    quantity: 2,
    dice: 8,
    mod: 0,
    description: "goats (reindeer stats)",
    subRoll: null,
  },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "mastodons", subRoll: null },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "crows (ptarmigan stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "wooly rhinos", subRoll: null },
  {
    quantity: 2,
    dice: 8,
    mod: 1,
    description: "bison (rhino stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 4, mod: 0, description: "hares", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "ptarmigan", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "mammoth (bigger)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "wolves", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "elks", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "lynxes (wolf stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 0, description: "bears", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "vultures", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mountain lions",
    subRoll: null,
  },
  {
    quantity: 3,
    dice: 10,
    mod: 0,
    description: "lemmings (hare stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "antelopes", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "eagle (bird of prey stats)",
    subRoll: null,
  },
  { quantity: 3, dice: 6, mod: 0, description: "bats", subRoll: null },
];

const highlandsWeird = [
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "beast of snow and ice",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated stones",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated tools",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "magma beast within a crack in the ground",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "giant spiders and their webs",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "skeletal slaves",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "tomb guardian",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "drakes",
    subRoll: {
      quantity: 1,
      dice: 6,
      mod: 0,
      description: "drake young (viper stats)",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "hyrda", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "mimic", subRoll: null },
  { quantity: 1, dice: 4, mod: 0, description: "angry fossils", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
    subRoll: null,
  },
];

const coastAnimals = [
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "antelope (reindeer stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "walruses (boar stats, aquatic)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "seals (boar stats, aquatic)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 1,
    description: "storks (vulture stats)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "eels (viper stats, aquatic)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "bison (rhinos stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 1, description: "mammoths", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "lemmings (hare stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "swans (vulture stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "herons (vulture stats)",
    subRoll: null,
  },
  { quantity: 2, dice: 6, mod: 0, description: "jackals", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "foxes (jackal stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 0, description: "bears", subRoll: null },
  { quantity: 2, dice: 6, mod: 0, description: "antelopes", subRoll: null },
  { quantity: 1, dice: 2, mod: 0, description: "cave lions", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine", subRoll: null },
  {
    quantity: 2,
    dice: 10,
    mod: 0,
    description: "gulls (ptarmigan stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "mastodon", subRoll: null },
  {
    quantity: 3,
    dice: 10,
    mod: 0,
    description: "elk (reindeer stats)",
    subRoll: null,
  },
];

const coastWeird = [
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "plant monster (table 93)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "aquatic vermin (table 92)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "giant aquatic vermin (table 92)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "drake", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "drakes",
    subRoll: {
      quantity: 1,
      dice: 6,
      mod: 0,
      description: "drake young (viper stats)",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "bog mummies (table 92)",
    subRoll: null,
  },
  { quantity: 1, dice: 2, mod: 0, description: "hydras", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "kraken", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "ghouls", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "mycelids spawns",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "ooze",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
    subRoll: null,
  },
];

const iceSheetAnimals = [
  { quantity: 2, dice: 6, mod: 0, description: "wolves", subRoll: null },
  { quantity: 2, dice: 8, mod: 0, description: "mammoths", subRoll: null },
  { quantity: 2, dice: 6, mod: 0, description: "reindeer", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "wooly rhinos", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "fox (jackal stats)",
    subRoll: null,
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "walruses (boar stats, aquatic)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "mammoth", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "wolverine", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 1,
    description: "gulls (ptarmigan stats)",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "bear", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "jackals", subRoll: null },
  { quantity: 3, dice: 8, mod: 0, description: "reindeer", subRoll: null },
];

const iceSheetWeird = [
  { quantity: 2, dice: 6, mod: 0, description: "wolves", subRoll: null },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "wolves",
    subRoll: {
      quantity: 1,
      dice: 6,
      mod: 0,
      description: "wolves of the ice sheet",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "flesh hulk", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "ghouls",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "spectre",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "mimic", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "beast of ice and snow",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "beasts of ice and snow",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "animated stones",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "shoggoth beneath the ice",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "walking swarms",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "tunneling terrible worm beneath the ice",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "strange feral undeads (table 99)",
    subRoll: null,
  },
];

const undergroundAnimals = [
  { quantity: 1, dice: 4, mod: 1, description: "cave lions", subRoll: null },
  { quantity: 1, dice: 6, mod: 1, description: "jackals", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "bear", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "bears", subRoll: null },
  { quantity: 3, dice: 10, mod: 0, description: "rats", subRoll: null },
  { quantity: 2, dice: 12, mod: 0, description: "bats", subRoll: null },
  { quantity: 2, dice: 4, mod: 0, description: "hyenas", subRoll: null },
  { quantity: 1, dice: 6, mod: 1, description: "goats", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "gygantaoputhecuses",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 6,
    mod: 1,
    description: "moles (use hares)",
    subRoll: null,
  },
  { quantity: 1, dice: 4, mod: 0, description: "vipers", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "owls (birds of prey stats)",
    subRoll: null,
  },
];

const undergroundWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "shoggoth", subRoll: null },
  { quantity: 1, dice: 4, mod: 1, description: "mycelids", subRoll: null },
  { quantity: 2, dice: 6, mod: 0, description: "ghouls", subRoll: null },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "skeletal slaves",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "pile of limbs", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated tools",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "homunculus",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "basilisk", subRoll: null },
  {
    quantity: 2,
    dice: 4,
    mod: 0,
    description: "giant spiders and their webs",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vermin swarms (table 92)",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "giant barnacles",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "giant vermin",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "vermin swarm (table 92)",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "giant vermin",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "tunneling terrible worm",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "skeletal slaves",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "tomb guardian",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 4, mod: 0, description: "oozes", subRoll: null },
  { quantity: 1, dice: 4, mod: 0, description: "giant amoebas", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "fungoid plant monster",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mycelids",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "shoggoth",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "aquatic vermin",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "kraken",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "morlock crawlers",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "morlock watchers",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "morlock whispers",
        subRoll: {
          quantity: 1,
          dice: 1,
          mod: 0,
          description: "morlock lurker",
          subRoll: null,
        },
      },
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "vargouilles",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "mimic",
      subRoll: null,
    },
  },
];

const veryWeird = [
  { quantity: 1, dice: 1, mod: 0, description: "shoggoth", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "mycelids",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "plant monster",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "giant cave barnacle",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "walking swarms",
    subRoll: null,
  },
  { quantity: 1, dice: 1, mod: 0, description: "magma beast", subRoll: null },
  { quantity: 1, dice: 1, mod: 0, description: "pain engine", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "homonculus of blood and sinew",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 6,
    mod: 1,
    description: "children",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "vampire",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "stalkers",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "vampire spawn",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "pile of limbs",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "pain engine",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "mimic", subRoll: null },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "walking swarms",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "giant spider",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "shamans",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "chimera (standard)",
      subRoll: null,
    },
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "crows (ptarmigan)",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "ghoul",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "Neaderthal survivors",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "intelligent plant monster",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "animated stones",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "basilisk",
      subRoll: null,
    },
  },
  {
    quantity: 2,
    dice: 6,
    mod: 0,
    description: "hyenas",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "spectre",
      subRoll: null,
    },
  },
  {
    quantity: 3,
    dice: 6,
    mod: 0,
    description: "ghouls",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "flesh hulk",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 1,
    description: "children",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "giant amoeba",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 1, mod: 0, description: "colossus", subRoll: null },
];

const people = [
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "stalkers",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "gatherers making up a hunting party",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "stalkers",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "trap-builders making up a scouting party",
      subRoll: null,
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "gatherers",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "river dwellers",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "trap-builders",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "warlord",
    subRoll: {
      quantity: 1,
      dice: 8,
      mod: 0,
      description: "mammoth hunters",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "stalkers making up a war-party",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "mammoth hunter",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "crafter",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "children",
        subRoll: {
          quantity: 1,
          dice: 4,
          mod: 0,
          description: "elders making up a family",
          subRoll: null,
        },
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "neanderthal fighter",
    subRoll: {
      quantity: 1,
      dice: 1,
      mod: 0,
      description: "neanderthal survivor",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "children",
        subRoll: {
          quantity: 1,
          dice: 4,
          mod: 0,
          description: "sickly ones making up a family",
          subRoll: null,
        },
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "hermit or an elder",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "flame initiates or elders making up a strange cult",
    subRoll: null,
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "cannibals",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "scavengers",
      subRoll: null,
    },
  },
  { quantity: 1, dice: 6, mod: 0, description: "lost children", subRoll: null },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "flame initiate",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "children",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "elders",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "Neanderthal survivor",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "Neanderthal fighters",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "Neanderthal brutes making up a hunting party",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "mammoth hunter",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "stalkers",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "trap-makers",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "merrows",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "gargoyles",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "gremlins",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "Neanderthal chief",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "Neanderthal survivors",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "Neanderthal brutes",
        subRoll: {
          quantity: 1,
          dice: 6,
          mod: 0,
          description: "Neanderthal fighters making up a war-party",
          subRoll: null,
        },
      },
    },
  },
  {
    quantity: 1,
    dice: 4,
    mod: 0,
    description: "gatherers",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "trap-builders",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "Neanderthal survivors",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 6,
    mod: 0,
    description: "sickly ones",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "children",
      subRoll: {
        quantity: 1,
        dice: 1,
        mod: 0,
        description: "Neanderthal survivor",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "zealot",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "thralls",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "mammoth hunters",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "inner flame mage",
    subRoll: {
      quantity: 1,
      dice: 4,
      mod: 0,
      description: "flame initiates",
      subRoll: {
        quantity: 1,
        dice: 4,
        mod: 0,
        description: "mystery cultists",
        subRoll: null,
      },
    },
  },
  {
    quantity: 1,
    dice: 1,
    mod: 0,
    description: "Warlord",
    subRoll: {
      quantity: 1,
      dice: 8,
      mod: 1,
      description: "children",
      subRoll: {
        quantity: 1,
        dice: 6,
        mod: 0,
        description: "elders",
        subRoll: {
          quantity: 1,
          dice: 4,
          mod: 0,
          description: "crafters",
          subRoll: {
            quantity: 1,
            dice: 4,
            mod: 0,
            description: "stalkers",
            subRoll: {
              quantity: 1,
              dice: 4,
              mod: 0,
              description: "river-dwellers",
              subRoll: {
                quantity: 1,
                dice: 4,
                mod: 0,
                description: "gatherers",
                subRoll: null,
              },
            },
          },
        },
      },
    },
  },
];

const peopleActivities = [
  "preparing for a hunt or skirmish.",
  "recovering from an attack where some were injured.",
  "butchering a dead animal.",
  "taking a dead companion to be buried.",
  "fleeing some horrible danger.",
  "preparing for a religious ceremony.",
  "in the middle of some ominous rite.",
  "setting up a camp.",
  "breaking up a camp.",
  "eating and chatting around a campfire.",
  "scavenging for equipment.",
  "in the middle of a furious argument.",
  "lost and confused.",
  "lying low after doing something they shouldn't have.",
  "looking to trade valuable items.",
  "dangerously ill.",
  "returning home after a long journey.",
  "looking for a lost companion.",
  "celebrating a recent victory, and probably intoxicated.",
  "looking for somewhere safe and stable to make their home."
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

function choosePeople() {
  chooseEncounter(20, people);
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

  if (encounter.subRoll != null) {
    chooseSubEncounter(encounter.subRoll);
  }
}

function chooseSubEncounter(subEncounter) {
  let subQty = 0;
  switch (subEncounter.dice) {
    case 1:
      subQty = 1 + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 2:
      subQty = rollD2(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 4:
      subQty = rollD4(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 6:
      subQty = rollD6(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 8:
      subQty = rollD8(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 10:
      subQty = rollD10(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 12:
      subQty = rollD12(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
    case 20:
      subQty += rollD20(subEncounter.quantity) + subEncounter.mod;
      text += ", " + subQty + " " + subEncounter.description;
      break;
  }

  if (subEncounter.subRoll != null) {
    chooseSubEncounter(subEncounter.subRoll);
  }
}

function chooseEncounterType(roll) {
  let activityRoll = null;
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
      chooseAnimalBasedOnLocation();
      break;
    case 11:
    case 12:
      choosePeople();
      activityRoll = rollD20(1);
      text += "<br/>They are " + peopleActivities[activityRoll - 1];
      break;
    case 13:
    case 14:
      chooseAnimalBasedOnLocation();
      text = text + "<br/>The creatures in this encounter are intelligent.";
      break;
    case 15:
    case 16:
    case 17:
      chooseAnimalBasedOnLocation();
      text = text + "<br/>The creatures in this encounter are chimeras.";
      break;
    case 18:
    case 19:
      chooseWeirdBasedOnLocation();
    case 20:
      chooseReallyWeird();
      break;
    default:
      text = "error";
  }

  presentText(text);
}

function presentText(text) {
  var mainContainer = document.getElementById("encounterText");
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
