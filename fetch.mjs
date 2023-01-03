/**
 * @author: Demetrius Ford
 * @date: 14 April 2022
 **/

import axios from 'axios';
import path from 'path';
import process from 'process';

const ETHERSCAN_API_KEY = '';
const ETHERSCAN_API_URL = 'https://api.etherscan.io';

(async () => {
  const args = process.argv.slice(2);
  const good = args.length === 1 && args[0].match(/^0x[a-fA-F0-9]{40}$/);

  if (!good) {
    console.error(`Usage: ${path.basename(process.argv[1])} [contract]`);
    process.exit(2);
  }

  const configured = ETHERSCAN_API_KEY.match(/^[A-Z0-9]{34}$/);

  if (!configured) {
    console.error('Error: API key is not configured.');
    process.exit(1);
  }

  let sourceCode = null;

  try {
    const response = await axios.get(`${ETHERSCAN_API_URL}/api?module=contract&action=getsourcecode&address=${args[0]}&apikey=${ETHERSCAN_API_KEY}`);
    sourceCode = response.data.result[0].SourceCode;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  if (!sourceCode) {
    console.error('Error: source code was not found.');
    process.exit(1);
  }

  if (sourceCode.slice(0, 2) !== '{{') {
    console.log(sourceCode);
    return;
  }

  sourceCode = sourceCode.replace('{{', '{');
  sourceCode = sourceCode.slice(0, -1);

  const fugly = JSON.parse(sourceCode);

  for (const [file, code] of Object.entries(fugly.sources)) {
    process.stdout.write('\x1b[4m');
    console.log(`${path.basename(file)}\n`);
    process.stdout.write('\x1b[0m');
    console.log(code.content.endsWith('\n') ? code.content : `${code.content}\n`);
  }
})();
