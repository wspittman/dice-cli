import { roll } from './Roll.js';
import {
  closeInput,
  getMacroNames,
  getTokenLists,
  reloadMacros,
} from './UserInput.js';
import { logProcessedLists } from './UserOutput.js';

function getPotentialCommand(tokenLists) {
  if (tokenLists.length === 1 && tokenLists[0].length === 1) {
    return tokenLists[0][0].text.trim().toLowerCase();
  }
}

function processTokens(tokens) {
  return tokens.map((token) => {
    try {
      return token.isRoll ? roll(token.text) : token;
    } catch (error) {
      return {
        total: 'ERR',
        text: `[ERR: ${token.text}]`,
        err: error.message,
      };
    }
  });
}

function logHelp() {
  console.log('Commands:');
  console.log('  cls, clear: clear the console');
  console.log('  exit: exit the program');
  console.log('  help: show this help message');
  console.log('  list: list all macros');
  console.log('  reload, refresh: reload macros');
  console.log('  [anything else]: roll the dice');
  console.log(
    '    To include context, embed dice in brackets, eg. [1d20+2] fire damage'
  );
}

function logMacroNames() {
  const { custom, standard } = getMacroNames();
  console.log(`Custom macros: ${custom.join(', ')}`);
  console.log(`Default macros: ${standard.join(', ')}`);
}

async function main() {
  const tokenLists = await getTokenLists();
  const command = getPotentialCommand(tokenLists);

  switch (command) {
    case 'clear':
    case 'cls': {
      console.clear();
      break;
    }
    case 'exit': {
      closeInput();
      return;
    }
    case 'help': {
      logHelp();
      break;
    }
    case 'list': {
      logMacroNames();
      break;
    }
    case 'reload':
    case 'refresh': {
      reloadMacros();
      break;
    }
    default: {
      logProcessedLists(tokenLists.map(processTokens));
    }
  }

  main();
}

main();
