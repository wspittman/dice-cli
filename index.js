import chalk from 'chalk';
import { roll } from './Roll.js';
import { closeInput, getInput } from './UserInput.js';

async function main() {
  const input = await getInput();
  const command = input.trim().toLowerCase();

  switch (command) {
    case 'exit': {
      closeInput();
      return;
    }
    case 'cls':
    case 'clear': {
      console.clear();
      break;
    }
    default: {
      try {
        const { total, text } = roll(input);
        console.log(`  ${chalk.bold(total)} <== ${text}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  main();
}

main();
