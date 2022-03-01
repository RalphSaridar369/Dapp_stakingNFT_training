import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';

import { AppContext } from '../../AppContext';

const Dashboard = () => {
    let { tokenData, ownerAccount, account, decimals } = useContext(AppContext);

    const [input,setInput] = useState({
        mint:'',
        burn:'',
    })
    const [buysell,setBuysell] = useState({
        buy:'',
        sell:'',
    })
    const [price,setPrice] = useState("");

    const burnOrMint = async(type) =>{
        if(parseInt(input[type])<1){
            alert("Value must be greater than 0");
        }
        else{
            await tokenData.basicToken.methods[type==="mint"?'mint':'burnTokens'](parseInt(input[type])).send({from:account});
            await tokenData.basicToken.methods.balanceOf(account).call()
        }
    }

    const buyOrSell = async(type) =>{
        if(parseInt(buysell[type])<1){
            alert("Value must be greater than 0");
        }
        else{
            if(type=="buy"){
                await tokenData.basicToken.methods.transfer(tokenData.address_owner,parseInt(buysell[type])).send({from:account});
            }
        }
    }

    const changeTokenPrice = async() =>{
        console.log(price===1*10**18)
        console.log(price.toString().length,"\n",(1*10**18).toString().length)
        console.log(typeof price, "\n", typeof(1*10**18))
        if(price==1*10**18){
            alert(true)
        }
        if((price*10**18)<5 * 10**16){
            alert("Value must be greater than 0.01");
        }
        else{
            await tokenData.basicToken.methods.changePriceOfToken(price*10**18+"").send({from:account})
        }
    }
    return (
        <div className='dashboard'>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h5>Tokens left</h5>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.basicTokenBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h5>Your Tokens</h5>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.yourBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h5>Total Supply</h5>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.totalSupply}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h5>Price</h5>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>ETH {tokenData.cost}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            {ownerAccount && <div className='dashboard__container'>
                <div className='dashboard__info'>
                    <h5>Mint</h5>
                    <div className='dashboard__info__inner'>
                        <input placeholder="0" type="text" onChange={(e) => setInput({...input,mint:e.target.value})}
                        value={input.mint} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>burnOrMint("mint")}>Mint</button>
                    </div>
                </div>
                <div className='dashboard__info'>
                    <h5>Burn</h5>
                    <div className='dashboard__info__inner'>
                        <input placeholder="0" type="text" onChange={(e) => setInput({...input,burn:e.target.value})}
                        value={input.burn} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>burnOrMint("burn")}>Burn</button>
                    </div>
                </div>
            </div>}
            <div className='dashboard__container'>
                <div className='dashboard__info'>
                    <h5>Buy</h5>
                    <div className='dashboard__info__inner'>
                        <input placeholder="0" type="text" onChange={(e) => setBuysell({...buysell,buy:e.target.value})}
                        value={buysell.buy} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>buyOrSell("buy")}>Buy</button>
                    </div>
                </div>
                <div className='dashboard__info'>
                    <h5>Sell</h5>
                    <div className='dashboard__info__inner'>
                        <input placeholder="0" type="text" onChange={(e) => setBuysell({...buysell,sell:e.target.value})}
                        value={buysell.sell} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>buyOrSell("sell")}>Sell</button>
                    </div>
                </div>
            </div>
            {ownerAccount && <div className='dashboard__container'>
                <div className='dashboard__info'>
                    <h5>Change Price</h5>
                    <div className='dashboard__info__inner'>
                        <input placeholder="0" type="text" onChange={(e) => setPrice(e.target.value)}
                        value={price} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>changeTokenPrice()}>Change</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Dashboard