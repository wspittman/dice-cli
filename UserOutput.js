import chalk from 'chalk';

/**
 * Log the processed tokens
 * @param {{ total: number, text: string, err: string }[]} processed The processed tokens
 */
function logProccessed(processed) {
  const total = processed
    .map((token) => (token.total ? chalk.bold(token.total) : token.text))
    .join('');

  const built = processed
    .filter((token) => token.total != undefined)
    .map((token) => token.text)
    .join(' / ');

  const errs = processed.filter((token) => token.err).map((token) => token.err);

  console.log(`  ${total} <== ${built}`);

  errs.forEach((err) => console.log(chalk.yellow(`  ${err}`)));
}

/**
 * Log the processed lists
 * @param {{ total: number, text: string, err: string }[][]} processedLists The processed lists
 */
export function logProcessedLists(processedLists) {
  processedLists.map(logProccessed);
}
