const ethers = require('ethers')

const RPC = "YOUR_CUSTOM_RPCNODE_URL";

//erc-721 compliant token contract address
const address = "";

//set how many you would like to have locally
const collectionSize = 10;

//set your ratelimit per min for custom rpc node so you do not get timedout
const rateLimit = 2000;

const abi = [
  "function tokenURI(uint256 tokenId) external view returns (string)"
];

const provider = new ethers.providers.JsonRpcProvider(RPC);

const instance = new ethers.Contract(address, abi, provider);

module.exports = { collectionSize, instance, rateLimit };