import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input, output });

export function getInput() {
  return rl.question('>');
}

export function closeInput() {
  rl.close();
}
