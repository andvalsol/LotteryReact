import web3 from "./web3";

// Setup a local copy of the contract and also add the contract address

const LotteryContractAddress = '0xAEd421761BAe4041B20Cb2f811C71D041F2877cF';
const LotteryABI = '[{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'

// Create a new local contract instance (since this will function as the representation of the contract, so that it represents
// what is located on the blockchain
export default new web3.eth.Contract(JSON.parse(LotteryABI), LotteryContractAddress);
