import { DiceRoller } from '@dice-roller/rpg-dice-roller';

const roller = new DiceRoller();
roller.roll('2d6 + 4d8 + 10');
console.log(roller.output);
