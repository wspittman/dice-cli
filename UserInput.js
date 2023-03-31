import * as fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const macrosName = 'macros.json';
const macrosCustomName = 'macrosCustom.json';

let macros = {};
let macrosCustom = {};
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

/**
 * Reload macros from files
 */
export function reloadMacros() {
  macros = JSON.parse(fs.readFileSync(macrosName, 'utf8'));
  if (fs.existsSync(macrosCustomName)) {
    macrosCustom = JSON.parse(fs.readFileSync(macrosCustomName, 'utf8'));
  }
}

/**
 * Get the names of available macros
 * @returns {{ custom: string[], standard: string[] }}
 */
export function getMacroNames() {
  return {
    custom: Object.keys(macrosCustom),
    standard: Object.keys(macros),
  };
}

/**
 * Takes input from the console, tokenizes it, and returns the token lists
 * @returns {Promise<{ text: string, isRoll: boolean }[][]>}
 */
export async function getTokenLists() {
  const input = await rl.question('>');
  const mixedInput = macrosCustom[input] || macros[input] || input;
  const inputStrings = Array.isArray(mixedInput) ? mixedInput : [mixedInput];
  return inputStrings.map(tokenize);
}

/**
 * Close the input stream
 */
export function closeInput() {
  rl.close();
}

reloadMacros();
