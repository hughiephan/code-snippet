const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://rinkeby.infura.io/v3/80c6e44bf6904cceb3221b7641c67b30'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Account: ', accounts);

    const result = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: ['Hey there!']})
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to: ', result.options.address);
}

deploy();