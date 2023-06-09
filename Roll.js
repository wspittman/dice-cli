import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import chalk from 'chalk';

/**
 * Roll the dice
 * @param {string} notation The dice notation to roll
 * @returns {{ total: number, text: string }} The total number and the roll result text
 */
export function roll(notation) {
  const result = new DiceRoll(notation);

  // This is a hack to get the max value of each die
  const expressionSymbol = Object.getOwnPropertySymbols(result).find(
    (x) => x.description === 'expressions'
  );
  const maxes = result[expressionSymbol].map((x) => x.max);

  const text = result.rolls
    .map((roll, index) => {
      if (!roll.rolls) return roll.toString();

      const vals = roll.rolls.map((x) => {
        const value = x.value;
        const isMax = value != undefined && value === maxes[index];

        if (value === 1) return chalk.red(value);
        if (isMax) return chalk.green(value);
        return value;
      });
      return `[${vals.join(', ')}]`;
    })
    .join('');

  return {
    total: result.total,
    text,
  };
}
