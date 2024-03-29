import React, { useState } from 'react';
import RequestForm from './RequestForm';
import ResultScreen from './ResultScreen';
import { connectWeb3 } from '../helpers/web3Connection';
import { PREPARE_INPUTS, DISPLAY_RESULT } from '../constants/types';
import '../App.css';

const MainPage = props => {
    connectWeb3();
    const [walletAddress, setWalletAddress] = useState('');
    const [screen, setScreen] = useState(PREPARE_INPUTS);
    const [contractAddress, setContractAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [symbol, setSymbol] = useState('');
    return(
        <div className="App">
            <header className="App-header">
                {/* Use the appropiate tag */}
                <h1 className="app-title"> Balance Displayer</h1> 
                {screen === DISPLAY_RESULT ?
                <ResultScreen
                    balance={balance}
                    symbol={symbol}
                />:<></>}
                <RequestForm 
                    contractAddress={contractAddress}
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                    setContractAddress={setContractAddress}
                    setBalance={setBalance}
                    setSymbol={setSymbol}
                    setScreen={setScreen}
                    screen={screen}
                />
            </header>
        </div>
    );
}

export default MainPage;