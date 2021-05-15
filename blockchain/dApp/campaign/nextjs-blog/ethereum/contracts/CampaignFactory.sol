pragma solidity ^0.8.3;

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
}