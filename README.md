# fetch.mjs (fetch-contract)

Fetch the source code of a verified smart contract from etherscan.io by its address. This can help discover potential vulnerable contracts if used with [Semgrep](https://github.com/Decurity/semgrep-smart-contracts).


## Usage

Create an API key [here](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics#creating-an-api-key), then run:

```bash
$ npm i axios; node --experimental-modules --no-warnings fetch.mjs "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
```
