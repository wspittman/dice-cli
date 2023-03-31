import { roll } from './Roll.js';
import { closeInput, getTokenLists, reloadMacros } from './UserInput.js';
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

async function main() {
  const tokenLists = await getTokenLists();
  const command = getPotentialCommand(tokenLists);

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
