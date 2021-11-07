import React, { useState, useRef } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { getBalance, getSymbol } from '../helpers/contractInteraction';
import { isEthereumAddress } from '../helpers/web3Connection';
import { PREPARE_INPUTS, DISPLAY_RESULT } from '../constants/types';

const Request = ({
    contractAddress,
    setContractAddress, 
    walletAddress,
    setWalletAddress,
    setBalance,
    setSymbol,
    setScreen, 
    screen
}) => {
    const [walletClass, setWalletClass] = useState({});
    const [tokenClass, setTokenClass] = useState({});
    const [walletReady, setWalletReady] = useState(false);
    const [tokenReady, setTokenReady] = useState(false);
    const [validated, setValidated] = useState(false);
    const [lockInputs, setLockInputs] = useState(false);
    const formRefWallet = useRef(null);
    const formRefContract = useRef(null);

    const validateWalletFormat = (event) => {
        const address = event.target.value;
        console.log('Wallet address:', address)
        setWalletAddress(address); // This could be set until GET BALANCE IS CLICKED
        if(isEthereumAddress(address)){
            console.log('THIS WAY1')
            setWalletClass('text-success');
            setWalletReady(true);
        }else{
            console.log('THIS WAY2')
            setWalletClass('text-danger');
            setWalletReady(false);
        }
    } 

    const validateTokenFormat = (event) => {
        const address = event.target.value;
        console.log('token address:', address)
        setContractAddress(address); // This could be set until GET BALANCE IS CLICKED
        if(address === '') {
            setTokenClass('');
            setTokenReady(false);
        } else {
            if(isEthereumAddress(address)){
                setTokenClass('text-success');
                setTokenReady(true);
            }else{
                setTokenClass('text-danger');
                setTokenReady(false);
            }
        }
        
    } 

    const updateBalance = async () => {
        const balance = await getBalance(contractAddress, walletAddress);
        const symbol = await getSymbol(contractAddress, walletAddress);
        setBalance(balance);
        setSymbol(symbol);
        setLockInputs(true);
        setScreen("DISPLAY_RESULT");
    }

    const handleReset = () => {
        formRefWallet.current.reset();
        formRefContract.current.reset();
        setValidated(false);
        setLockInputs(false);
    };

    const buttonSelector = () => {
        const style={'marginTop': '30px'};
        if(screen === DISPLAY_RESULT) {
            return (
            <Button 
                style={style} 
                value={Form}
                onClick={(event) => { 
                    event.preventDefault();
                    setScreen(PREPARE_INPUTS)
                    setWalletAddress('');
                    setContractAddress('');
                    setTokenReady(true);
                    setWalletReady(false);
                    handleReset();
                }
            }>
                Clear Inputs
            </Button>);
        }
        if(screen === PREPARE_INPUTS) {
            return (
                <Button 
                    style={style}
                    value={Form}
                    disabled={!(walletReady && tokenReady)}
                    onClick={(event) => {
                        event.preventDefault();
                        if(walletReady && tokenReady){
                            updateBalance();
                        }
                    }
                }>
                    Get Balance
                </Button>
            );
        }
    }

    const alert = (type) => {
        if((type === 'wallet' || type === 'token') && walletClass === 'text-danger'){
            return (
                <Alert style={{'font-size': '18px', 'padding': '1px'}} variant={'danger'}>
                    Invalid {type} Address
                </Alert>
            );
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }
    return(
        <Container>
            <Form style={{'marginTop': '30px'}} ref={formRefWallet} validated={validated} onSubmit={e => {submitHandler(e)}}>
                <Form.Group controlId="formWalletAddress">
                <Form.Label>Wallet Address - Token owner:</Form.Label>
                <Form.Control
                    className={walletClass}
                    disabled={lockInputs}
                    onChange={(e)=> {validateWalletFormat(e)}}
                    onInput={(e)=> {validateWalletFormat(e)}}
                    placeholder="0xdAC17F958D2ee523a2206206994597C13D831ec7"
                />
                </Form.Group>
                {alert()}
            </Form>
            <Form style={{'marginTop': '30px'}} ref={formRefContract} validated={validated} onSubmit={e => {submitHandler(e)}}>
                <Form.Group controlId="formContractAddress">
                <Form.Label>Token Contract Address</Form.Label>
                <Form.Control
                    className={tokenClass} 
                    disabled={lockInputs}
                    onChange={(e)=> {validateTokenFormat(e)}} 
                    onInput={(e)=> {validateTokenFormat(e)}}
                    placeholder="0xdAC17F958D2ee523a2206206994597C13D831ec7"
                />
                {alert()}
                </Form.Group>
            </Form>
            {buttonSelector()}
        </Container>
    );
}

export default Request;