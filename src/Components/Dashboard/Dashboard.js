import React, { useContext, useState } from 'react';
import './Dashboard.css';

import { AppContext } from '../../AppContext';

const Dashboard = () => {

    let { tokenData, ownerAccount } = useContext(AppContext);
    const [input,setInput] = useState({
        mint:'0',
        burn:'0',
    })
    const burnOrMint = async(type) =>{
        if(parseInt(input[type])<1){
            alert("Value must be greater than 0");
        }
        else{
            let test = await tokenData.basicToken.methods[type==="mint"?'mintTokens':'burnTokens'](parseInt(input[type])).call();
            console.log(test)
            let TS = await tokenData.basicToken.methods.totSupply().call()
            console.log(TS.toString())
            // await tokenData.basicToken.methods[type=="burn"?"burnTokens":"mintTokens"](parseInt(input[type])).call();
            // alert(`${type=="burn"?"Burned":"Minted"} Successfully`);
        }
    }

    return (
        <div className='dashboard'>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h2>Tokens left</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.yourBalance}</p>
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
                        <p className='tokens__left'>${tokenData.cost}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            <div className='dashboard__container'>
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
            </div>
            <div className='dashboard__container'>
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
            </div>
        </div>
    )
}

export default Dashboard