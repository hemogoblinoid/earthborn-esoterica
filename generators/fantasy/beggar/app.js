const peopleProfession = [
  "a farmer.",
  "a blacksmith.",
  "a noble.",
  "a soldier.",
  "a priest.",
  "a gambler.",
  "an adventurer.",
  "a barkeep."
];

const features = [
  "are blind.",
  "are missing a limb.",
  "have a large scar across their face.",
  "are wearing bloodstained clothes.",
  "are covered in sores.",
  "have a distinguishing tattoo."
];

function presentText(text) {
  var mainContainer = document.getElementById("beggarText");
  mainContainer.innerHTML = text;
}

function generateBeggar () {
  let text = "";
  var randProfession = peopleProfession[Math.floor(Math.random() * peopleProfession.length)];
  var randFeature = features[Math.floor(Math.random() * features.length)];
  text = "They used to be " + randProfession + " You notice they " + randFeature;
  presentText(text);
}