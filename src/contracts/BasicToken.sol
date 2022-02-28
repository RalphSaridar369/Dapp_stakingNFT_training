pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicToken is ERC20, ERC20Burnable, Ownable {
    
    uint256 public cost;
    constructor() ERC20("BasicToken", "BST"){}

    function burnTokens(uint256 _amount) public onlyOwner {
        _burn(address(msg.sender),_amount);
    }


    function mint(uint256 amount) public onlyOwner returns(uint256){
        _mint(address(msg.sender), amount);
    }

}