import { DiceRoller } from '@dice-roller/rpg-dice-roller';
import { closeInput, getInput } from './UserInput.js';

const roller = new DiceRoller();
let input = '';

async function main() {
  input = await getInput();

  if (input !== 'exit') {
    try {
      roller.roll(input);
      console.log(roller.output);
    } catch (error) {
      console.log(error.message);
    }
    main();
  } else {
    closeInput();
  }
}

main();
