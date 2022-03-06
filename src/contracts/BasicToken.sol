pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BasicToken is ERC20, ERC20Burnable, Ownable {
    
    uint256 public balance;
    uint256 public initialtotalSupply;
    uint256 public circulating;
    
    // event TransferReceived(address _from, uint _amount);
    // event TransferSent(address _from, address _destAddr, uint _amount);

    constructor() payable ERC20("BasicToken", "BST"){
        // balanceOf[msg.sender] = 1000000000000000000000000;
        mint(1000000000000000000000000);
        initialtotalSupply = 2000000000000000000000000;
        circulating = 0;
    }

    receive() external payable {}

    function sendViaTransfer ( address payable _to ) external payable {
        _to.transfer(1);
    }

    function sendViaCall ( address payable _to ) external payable {
       (bool success, bytes memory data) = _to.call{value:1}("");
       require(success, "Call failed");
    }

    // function changeCirculating (uint256 _amount) external {
    //     circulating = _amount;
    // }

    // receive() external payable {
    //     emit Log("receive",msg.sender,msg.value,msg.data)
    // }


    // receive() payable external {
    //     balance += msg.value;
    //     emit TransferReceived(msg.sender, msg.value);
    // }    

    // function withdraw(uint amount, address payable destAddr) public onlyOwner{
    //     require(amount <= balance, "Insufficient funds");
        
    //     destAddr.transfer(amount);
    //     balance -= amount;
    //     emit TransferSent(msg.sender, destAddr, amount);
    // }
    
    // function transferERC20(IERC20 token, address to, uint256 amount) public {
    //     require(msg.sender == owner, "Only owner can withdraw funds"); 
    //     uint256 erc20balance = token.balanceOf(address(this));
    //     require(amount <= erc20balance, "balance is low");
    //     token.transfer(to, amount);
    //     emit TransferSent(msg.sender, to, amount);
    // }    





    function burnTokens(uint256 _amount) public onlyOwner {
        require(_amount >0, "Amount must be higher than zero");
        _burn(address(msg.sender),_amount);
        initialtotalSupply -= _amount;
    }


    function mint(uint256 _amount) public onlyOwner {
        require(_amount >0, "Amount must be higher than zero");
        _mint(address(msg.sender), _amount);
        initialtotalSupply += _amount;
    }

    
    // function buy(uint256 _amount) external payable {
    //     // e.g. the buyer wants 100 tokens, needs to send 500 wei
    //     // require(msg.value >= _amount * cost, 'Need to send exact amount of wei');
    //     transfer(msg.sender, _amount);
    // }
    
    /* function sell(uint256 _amount) external {
        // decrement the token balance of the seller
        balances[msg.sender] -= _amount;
        balances[address(this)] += _amount;
        payable(msg.sender).transfer(_amount * cost);
    } */

}