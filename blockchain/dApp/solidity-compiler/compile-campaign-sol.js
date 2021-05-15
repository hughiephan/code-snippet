const solc = require('solc');

const fs = require('fs');
// const solc = require('solc');


// const inboxPath = path.resolve(__dirname, 'contracts', 'CampaignFactory.sol');
// const source = fs.readFileSync(inboxPath, 'utf-8');

const source = `pragma solidity ^0.8.3;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign() public {
        Campaign newCampaign = new Campaign();
        
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
    }
    
    // constructor(uint minimum, string creator) public {
        
    // } 
}`

var input = {
    language: 'Solidity',
    sources: {
        'CampaignFactory.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 



const output = JSON.parse(solc.compile(JSON.stringify(input)));



const interfaces = output.contracts['CampaignFactory.sol'].CampaignFactory.abi;
const bytecode = output.contracts['CampaignFactory.sol'].CampaignFactory.evm.bytecode.object;

console.log(interfaces);
fs.writeFile('helloworld.txt', JSON.stringify(interfaces), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});



module.exports = {
    interfaces,
    bytecode,
};