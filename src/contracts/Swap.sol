/**
*  Smart contract enabling funding and exchanging of DevCoin.
*  The rate is defined by the owner of the contract, but it will never be less than ICO price.
*  The price of token in ETH is 1/rate. Eg for 1 Eth the sender will get rate number of tokens.
*/
pragma solidity 0.8.11;

import './BasicToken.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Exchange {
  using SafeMath for uint256;

  address public owner;
  uint public ICO_RATE = 100*1e18; // tokens for 0.1 eth
  uint public rate = 100*1e18; // tokens for 0.1 eth
  BasicToken public token;

  event BuyToken(address user, uint amount, uint costWei, uint balance);
  event SellToken(address user, uint amount, uint costWei, uint balance);


  constructor(BasicToken _token)public{
    token = _token;
  }
  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
  * constructor
  */
  // function Exchange(address tokenContractAddr) public {
  //   token = DevCoin(tokenContractAddr);
  //   owner = msg.sender;
  // }

  /**
  * Fallback function. Used to load the exchange with ether
  */

    receive() external payable {
        // emit Log("receive",msg.sender,msg.value,msg.data)
    }
  /**
  * Sender requests to buy [amount] of tokens from the contract.
  * Sender needs to send enough ether to buy the tokens at a price of amount / rate
  */
  function buyToken(uint amount) payable public returns (bool success) {
    // ensure enough tokens are owned by the depositor
    uint costWei = (amount * 1 ether) / rate;
    require(msg.value >= costWei);
    assert(token.transfer(msg.sender, amount));
    emit BuyToken(msg.sender, amount, costWei, token.balanceOf(msg.sender));
    uint change = msg.value - costWei;
    if (change >= 1) payable(msg.sender).transfer(change);
    return true;
  }

  /**
  *  Sender requests to sell [amount] of tokens to the contract in return of Eth.
  */
  function sellToken(uint amount) public returns (bool success) {
    // ensure enough funds
    uint costWei = (amount * 1 ether) / rate;
    require(address(this).balance >= costWei);
    assert(token.transferFrom(msg.sender, address(this), amount));
    payable(msg.sender).transfer(costWei);
    emit SellToken(msg.sender, amount, costWei, token.balanceOf(msg.sender));
    return true;
  }

  function updateRate(uint newRate) onlyOwner public returns (bool success) {
    // make sure rate is never less than ICO rate
    require(newRate >= ICO_RATE);
    rate = newRate;
    return true;
  }
}