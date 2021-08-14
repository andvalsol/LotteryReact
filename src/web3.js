import Web3 from "web3";

// We need to rip the provider from metamask in order to get access to the Rinkeby test network
window.ethereum.request({ method: 'eth_requestAccounts'});

const web3 = new Web3(window.ethereum);

export default web3;
