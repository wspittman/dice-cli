import chalk from 'chalk';
import { roll } from './Roll.js';
import { closeInput, getInputTokens } from './UserInput.js';

async function main() {
  const tokens = await getInputTokens();
  const command =
    tokens.length === 1 ? tokens[0].text.trim().toLowerCase() : undefined;

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
        const processed = tokens.map((token) =>
          token.isRoll ? roll(token.text) : token.text
        );

        const total = processed
          .map((x) => (x.total ? chalk.bold(x.total) : x))
          .join('');

        const built = processed
          .filter((x) => x.total != undefined)
          .map((x) => x.text)
          .join(' / ');

        console.log(`  ${total} <== ${built}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  main();
}

main();
