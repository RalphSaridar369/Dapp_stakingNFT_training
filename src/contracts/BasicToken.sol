pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicToken is ERC20, ERC20Burnable, Ownable {
    
    uint256 public cost;

    constructor() ERC20("BasicToken", "BST"){
        cost = 1*10**17;
    }

    function changePriceOfToken(uint256 _price) public onlyOwner{
        require(_price > 5*10**16, "Price must be higher than 0.05");
        cost = _price;
    }

    function burnTokens(uint256 _amount) public onlyOwner {
        require(_amount >0, "Amount must be higher than zero");
        _burn(address(msg.sender),_amount);
    }


    function mint(uint256 _amount) public onlyOwner {
        require(_amount >0, "Amount must be higher than zero");
        _mint(address(msg.sender), _amount);
    }

    
   /*  function buy(uint256 _amount) external payable {
        // e.g. the buyer wants 100 tokens, needs to send 500 wei
        require(msg.value == _amount * cost, 'Need to send exact amount of wei');
        transfer(msg.sender, _amount);
    }
    
    function sell(uint256 _amount) external {
        // decrement the token balance of the seller
        balances[msg.sender] -= _amount;
        balances[address(this)] += _amount;
        payable(msg.sender).transfer(_amount * cost);
    } */

}