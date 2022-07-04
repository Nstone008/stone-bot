const { capitalize } = require('./utils.js'); 
const { getRandomArbitrary } = require('./utils/random');

// Store for in-progress games. In production, you'd want to use a DB
let activeGames = {};

let currentOpponentChoice = '';

//-- Objects

// this is just to figure out winner + verb
const RPSChoices = {
  rock: {
    name: 'rock',
    description: 'sedimentary, igneous, or perhaps even metamorphic',
    virus: 'outwaits',
    computer: 'smashes',
    scissors: 'crushes',
  },
  cowboy: {
    name: 'cowboy',
    description: 'yeehaw~',
    scissors: 'puts away',
    wumpus: 'lassos',
    rock: 'steel-toe kicks',
  },
  scissors: {
    name: 'scissors',
    description: 'careful ! sharp ! edges !!',
    paper: 'cuts',
    computer: 'cuts cord of',
    virus: 'cuts DNA of',
  },
  virus: {
    name: 'virus',
    description: 'genetic mutation, malware, or something inbetween',
    cowboy: 'infects',
    computer: 'corrupts',
    wumpus: 'infects',
  },
  computer: {
    name: 'computer',
    description: 'beep boop beep bzzrrhggggg',
    cowboy: 'overwhelms',
    paper: 'uninstalls firmware for',
    wumpus: 'deletes assets for',
  },
  wumpus: {
    name: 'wumpus',
    description: 'the purple Discord fella',
    paper: 'draws picture on',
    rock: 'paints cute face on',
    scissors: 'admires own reflection in',
  },
  paper: {
    name: 'paper',
    description: 'versatile and iconic',
    virus: 'ignores',
    cowboy: 'gives papercut to',
    rock: 'covers',
  },
};

//-- Functions
const getResult = function (p1, p2) {
  let gameResult;
  if (RPSChoices[p1.objectName] && RPSChoices[p1.objectName][p2.objectName]) {
    // o1 wins
    gameResult = {
      win: p1,
      lose: p2,
      verb: RPSChoices[p1.objectName][p2.objectName],
    };
  } else if (
    RPSChoices[p2.objectName] &&
    RPSChoices[p2.objectName][p1.objectName]
  ) {
    // o2 wins
    gameResult = {
      win: p2,
      lose: p1,
      verb: RPSChoices[p2.objectName][p1.objectName],
    };
  } else {
    // tie -- win/lose don't
    gameResult = { win: p1, lose: p2, verb: 'tie' };
  }

  return formatResult(gameResult);
}

const formatResult = function (result) {
  const { win, lose, verb } = result;
  return verb === 'tie'
    ? `<@${win.id}> and <@${lose.id}> draw with **${win.objectName}**`
    : `<@${win.id}>'s **${win.objectName}** ${verb} <@${lose.id}>'s **${lose.objectName}**`;
}

const getRPSChoices = function () {

  const keys = Object.keys(RPSChoices);

  return keys;
}

const getRandomChoice = function () {
   //Need to figure out how to send the object 
   const allChoices = getRPSChoices();
   const randChoice = allChoices.at(getRandomArbitrary(0,allChoices.length));

   return randChoice;
}

// // Function to fetch shuffled options for select menu
const getShuffledOptions = function () {
  const allChoices = getRPSChoices();
  const options = [];

  for (let c of allChoices) {
    // Formatted for select menus
    // https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure
    options.push({
      label: capitalize(c),
      value: c.toLowerCase(),
      description: RPSChoices[c]['description'],
    });
  }

  return options.sort(() => Math.random() - 0.5);
}

const setOpponentChoice = function (choice) {
  currentOpponentChoice = choice;
}

const getCurrentChoice = function () {
  return currentOpponentChoice
}

module.exports = {
  getResult,
  getShuffledOptions,
  getRandomChoice,
  getCurrentChoice,
  setOpponentChoice
}
