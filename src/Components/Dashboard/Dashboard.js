import React, { useContext, useState } from 'react';
import './Dashboard.css';

import { AppContext } from '../../AppContext';

const Dashboard = () => {

    let { tokenData, ownerAccount, account, decimals } = useContext(AppContext);
    const [input,setInput] = useState({
        mint:'0',
        burn:'0',
    })
    const [buysell,setBuysell] = useState({
        buy:'0',
        sell:'0',
    })

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
                await tokenData.basicToken.methods.transfer(tokenData.address_owner,parseInt(buysell[type])).send({from:account})
            }
        }
    }

    return (
        <div className='dashboard'>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h2>Tokens left</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.basicTokenBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h2>Your Tokens</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.yourBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h2>Total Supply</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.totalSupply}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h2>Price</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>ETH {tokenData.cost/decimals}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            {ownerAccount && <div className='dashboard__container'>
                <div className='dashboard__info'>
                    <h2>Mint</h2>
                    <div className='dashboard__info__inner'>
                        <input type="text" onChange={(e) => setInput({...input,mint:e.target.value})}
                        value={input.mint} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>burnOrMint("mint")}>Mint</button>
                    </div>
                </div>
                <div className='dashboard__info'>
                    <h2>Burn</h2>
                    <div className='dashboard__info__inner'>
                        <input type="text" onChange={(e) => setInput({...input,burn:e.target.value})}
                        value={input.burn} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>burnOrMint("burn")}>Burn</button>
                    </div>
                </div>
            </div>}
            <div className='dashboard__container'>
                <div className='dashboard__info'>
                    <h2>Buy</h2>
                    <div className='dashboard__info__inner'>
                        <input type="text" onChange={(e) => setBuysell({...buysell,buy:e.target.value})}
                        value={buysell.buy} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>buyOrSell("buy")}>Buy</button>
                    </div>
                </div>
                <div className='dashboard__info'>
                    <h2>Sell</h2>
                    <div className='dashboard__info__inner'>
                        <input type="text" onChange={(e) => setBuysell({...buysell,sell:e.target.value})}
                        value={buysell.sell} />
                        <img src="./token_img.png" className='img__token' />
                        <button onClick={()=>buyOrSell("sell")}>Sell</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard