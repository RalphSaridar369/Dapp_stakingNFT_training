import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { AppContext } from './AppContext';

import BasicToken from './abis/BasicToken.json'; 

import Whitelist from './Components/Whitelist/Whitelist';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  const [account, setAccount] = useState("0x00");
  const [ownerAccount, setOwnerAccout] = useState(false);
  const [tokenData, setTokenData] = useState({
    basicTokenBalance:0,
    yourBalance:0,
  });
  //Load the web3 aka metamask
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. you should consider trying Metamask');
    }
  }


  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();
    console.log(networkId)

    //load contract as folllowing
    const basicTokenData = BasicToken.networks[networkId];
    if(basicTokenData){
      const basicToken = new web3.eth.Contract(BasicToken.abi,basicTokenData.address);
      let basicTokenBalance = await basicToken.methods.totalSupply().call();
      // console.log("Balance Dai: ",basicTokenBalance.toString())
      
      if(basicTokenBalance){
        basicTokenBalance = basicTokenBalance.toString();
        console.log("Balance Dai: ",basicTokenBalance.toString())
      }
      else{
        basicTokenBalance = 0;
      }

      let yourBalance = await basicToken.methods.balanceOf(accounts[0]).call();
      // console.log("Balance Dai: ",yourBalance.toString())
      
      if(yourBalance){
        yourBalance = yourBalance.toString();
        console.log("Balance Dai: ",yourBalance.toString())
      }
      else{
        yourBalance = 0;
      }

      let owner = false;
      const address_owner = await basicToken.methods.returnOwnerAddress().call()
      if(accounts[0] == address_owner)
        owner=true;

      setTokenData({...tokenData,basicToken:basicToken,basicTokenBalance:basicTokenBalance.toString(), yourBalance:yourBalance});
      setOwnerAccout(owner);
    }
    else{
      window.alert("DaiToken contract not deployed to detected network");
    }
  }

  const runEffect = async () => {
    await loadWeb3();
    await loadBlockchainData();
  }

  useEffect(() => {
    runEffect();
  }, [])
  return (
    <div>
      <Navbar account={account} />
      <AppContext.Provider value={{tokenData:tokenData, ownerAccount:ownerAccount}}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Whitelist />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Whitelist />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
