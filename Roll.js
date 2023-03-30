import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import chalk from 'chalk';

export function roll(input) {
  const result = new DiceRoll(input);

  // This is a hack to get the max value of each die
  const expressionSymbol = Object.getOwnPropertySymbols(result).find(
    (x) => x.description === 'expressions'
  );
  const maxes = result[expressionSymbol].map((x) => x.max);

  const text = result.rolls
    .map((roll, index) => {
      const value = roll.value;
      const isMax = value != undefined && value === maxes[index];
      const str = roll.toString();

      if (value === 1) return chalk.red(str);
      if (isMax) return chalk.green(str);
      return str;
    })
    .join('');

  return {
    total: result.total,
    text,
  };
}
