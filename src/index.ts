function runGame() {
  const START_MONEY = 100;
  const BONUS_RATE = 0.2; // in %
  const GAMES = 10000;
  let money = START_MONEY;
  let betSize = 0.7;

  for (let i = 0; i < GAMES; i++) {
    if (Math.random() < 0.5 + BONUS_RATE) {
      money += START_MONEY * betSize;
    } else {
      money -= START_MONEY * betSize;
    }

    if (money <= 0) {
      return { lose: true, on: i };
    }
  }

  return { lose: false };
}

const loseStats = [];
let wins = 0;
const epoche = 10000;
for (let i = 0; i < epoche; i++) {
  const { lose, on } = runGame();

  if (lose && on) {
    loseStats.push(on);
  } else {
    wins++;
  }
}

console.log("win rate", wins / epoche);
console.log(
  "lose game avg",
  loseStats.reduce((prev, next) => {
    return prev + next;
  }, 0) / loseStats.length
);
