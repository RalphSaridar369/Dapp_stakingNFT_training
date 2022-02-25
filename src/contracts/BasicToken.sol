pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BasicToken is ERC20 {
    
    address private owner;

    constructor() ERC20("BasicToken", "BST"){
        _mint(msg.sender, 10000);
        owner = msg.sender;
    }

    modifier onlyOwner {
       require(msg.sender == owner,"You are not the owner");
       _;
    }

    function burnTokens(uint256 _amount) public onlyOwner(){
        _burn(owner,_amount);
    }

    function mintTokens(uint256 _amount) public onlyOwner(){
        _mint(owner,_amount);
    }

    function returnOwnerAddress() public view returns (address){
        return owner;
    }
}