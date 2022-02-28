pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicToken is ERC20 {
    
    address private owner;
    uint256 public cost;
    constructor() ERC20("BasicToken", "BST"){
        _mint(msg.sender,10000);
        owner = msg.sender;
    }

    modifier onlyOwner {
       require(msg.sender == owner,"You are not the owner");
       _;
    }

    function burnTokens(uint256 _amount) public onlyOwner() returns (uint256){
        _burn(owner,_amount);
        uint256 totalSupply = totalSupply();
        return totalSupply;
    }

    function mintTokens(uint256 _amount) public onlyOwner() returns (uint256){
        _mint(owner,_amount);
        uint256 totalSupply = totalSupply();
        return totalSupply;
    }

    function returnOwnerAddress() public view returns (address){
        return owner;
    }
}