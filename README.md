# nft-sticky-bandits
Educational script to show how to retrieve NFT metadata from ERC-721 contracts.

## Getting Started

Clone the repo: <br>
``` 
git clone https://github.com/Ty-Sir/nft-sticky-bandits
```

Move into the correct directory and install dependencies via yarn: <br>
```
cd nft-sticky-bandits
yarn install
```
or npm:
```
cd nft-sticky-bandits
npm install
```
Go to any of these sites to and sign up for a free account to get a custom RPC Node URL.<br>
[Alchemy](https://www.alchemy.com/), [Infura](https://infura.io/), [Moralis](https://moralis.io/), or [Tatum](https://tatum.io/). Or $9 per month (7-day free trial) at [QuickNode](https://www.quicknode.com/).

Open up `/src/config.js` and replace `const RPC` with the URL you now have from any of those sites. <br>

In the same file, set `const address` with the contract address of the ERC-721 NFT collection you would like to learn from.

Then set `const collectionSize` with the amount in that collection that you would like to save locally. (The higher the number the longer the retrieval takes)

Finally set `const rateLimit` with the rate limit for you custom RPC. If you are unsure set it to 1000 or lower so you do not get timed-out.

### Running the script

Once all the variables in `config.js` are set correctly, make sure you're in the `nft-sticky-bandits` directory, and in a terminal run:
```
yarn build
```
or if npm was used to install run:
```
npm build
```

You will see a folder labeled `output` appear and two sub-folder labeled `images` and `json`.<br>
`json` will be executed first having all of the tokens metadata in according to its tokenId.<br>
`images` will have the image respective to the tokenId.

### Enjoy 🕸
