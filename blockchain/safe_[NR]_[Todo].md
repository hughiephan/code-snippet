# Safety
## Reference
https://ethereum.org/en/developers/tutorials/erc20-with-safety-rails/
## Content
- Do not: Send the tokens to the contract's own address
- Do not: Send the tokens to an empty address
- Do: Check if address is a contract
- Do: have an administrator that can undo mistakes, and using multisig so multiple people have to agree on that action
## Code
```
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SafetyRailsToken is ERC20, Ownable {
    constructor() ERC20("SafetyRailsToken", "SAFE") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
    require(to != address(this), "Can't send tokens to the contract address");
    bool isToContract;
    assembly {
      isToContract := gt(extcodesize(to), 0)
    }
    require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
    todo....
}
```
