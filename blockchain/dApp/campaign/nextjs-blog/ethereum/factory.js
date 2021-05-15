import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/80c6e44bf6904cceb3221b7641c67b30"
);
const web3 = new Web3(provider);

const factory = new web3.eth.Contract(
    JSON.parse(`[{"inputs":[],"name":"createCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedCampaigns","outputs":[{"internalType":"contract Campaign","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeployedCampaigns","outputs":[{"internalType":"contract Campaign[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}]`),
    "0xe4D1D5c7AD4892ba334F484D00C82162157387f6"
);

export default factory;