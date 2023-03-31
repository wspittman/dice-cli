import * as fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const macros = JSON.parse(fs.readFileSync('macros.json', 'utf8'));
const rl = readline.createInterface({ input, output });
const bracketSplitterRegex = /(\[.*?\])|([^[]+)/g;

function tokenize(input) {
  const matches = input.matchAll(bracketSplitterRegex);
  const tokens = [];

  for (const match of matches) {
    const isRoll = match[1] != undefined;
    tokens.push({
      text: isRoll ? match[0].slice(1, -1) : match[0],
      isRoll,
    });
  }

  // Special case: if only one token, assume a roll regardless of brackets
  if (tokens.length === 1) {
    tokens[0].isRoll = true;
  }

  return tokens;
}

export async function getTokenLists() {
  const input = await rl.question('>');
  const mixedInput = macros[input] || input;
  const inputStrings = Array.isArray(mixedInput) ? mixedInput : [mixedInput];
  return inputStrings.map(tokenize);
}

export function closeInput() {
  rl.close();
}
