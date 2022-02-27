import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Components/Navbar/Navbar';
import Drawer from './Components/Drawer/Drawer';
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
import Stake from './Components/Stake/Stake';

const App = () => {
  const [account, setAccount] = useState("0x00");
  const [open, setOpen] = useState(false);
  const [ownerAccount, setOwnerAccout] = useState(false);
  const [tokenData, setTokenData] = useState({
    basicToken:null,
    basicTokenBalance: 0,
    yourBalance: 0,
    totalSupply: 0,
    cost: 0,
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
    if (basicTokenData) {
      const basicToken = new web3.eth.Contract(BasicToken.abi, basicTokenData.address);
      let basicTokenBalance = await basicToken.methods.totalSupply().call();
      let yourBalance = await basicToken.methods.balanceOf(accounts[0]).call();
      const address_owner = await basicToken.methods.returnOwnerAddress().call();
      const totalSupply = await basicToken.methods.totSupply().call();
      const cost = await basicToken.methods.cost().call();
      console.log(totalSupply.toString())
      setTokenData({
        ...tokenData,
        basicToken: basicToken,
        basicTokenBalance: basicTokenBalance.toString() || 0,
        yourBalance: yourBalance.toString() || 0,
        totalSupply: totalSupply.toString() || 0,
        cost: parseFloat(cost).toFixed(2).toString() || 0
      });
      setOwnerAccout(accounts[0] == address_owner);
    }
    else {
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
      <AppContext.Provider value={{ tokenData: tokenData, ownerAccount: ownerAccount }}>
        <Navbar account={account} setOpen={() => setOpen(!open)} />
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}>
          <Drawer open={open} />
          <div style={{ width: '100%', marginTop:'100px' }}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Whitelist />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/staking">
                  <Stake />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
