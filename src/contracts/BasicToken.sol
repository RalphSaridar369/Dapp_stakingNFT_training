pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicToken is ERC20 {
    
    uint256 public totSupply;
    address private owner;
    uint256 public cost;

    constructor() ERC20("BasicToken", "BST"){
        cost = 2; 
        owner = msg.sender;
    }

    modifier onlyOwner {
       require(msg.sender == owner,"You are not the owner");
       _;
    }

    function burnTokens(uint256 _amount) public onlyOwner() returns (string memory){
        _burn(owner,_amount);
        return "Done Burning";
    }

    function mintTokens(uint256 _amount) public onlyOwner() returns (string memory){
        _mint(owner,_amount);
        return "Done";
    }

    function returnOwnerAddress() public view returns (address){
        return owner;
    }
}