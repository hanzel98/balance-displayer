import React, { useState, useRef } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { getBalance, getSymbol } from '../helpers/contractInteraction';
import { isEthereumAddress, getAddressFromENS } from '../helpers/web3Connection';
import { PREPARE_INPUTS, DISPLAY_RESULT } from '../constants/types';
import '../App.css';

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
    const [disabled, setDisabled] = useState(false);
    const formRefWallet = useRef(null);
    const formRefContract = useRef(null);

    const validateWalletFormat = async (event) => {
        const address = event.target.value;
        if(address === '') {
            setWalletAddress(address);
            setWalletClass('');
            setWalletReady(false);

        } else {
            const addressFromENS = await getAddressFromENS(address);
            const isValid = isEthereumAddress(address) || addressFromENS;
            if(isValid){
                addressFromENS ? setWalletAddress(addressFromENS): setWalletAddress(address);
                setWalletClass('text-success');
                setWalletReady(true);
            }else{
                setWalletAddress(address);
                setWalletClass('text-danger');
                setWalletReady(false);
            }
        }
    } 

    const validateTokenFormat = async (event) => {
        const address = event.target.value;
        if(address === '') {
            setContractAddress(address);
            setTokenClass('');
            setTokenReady(false);
        } else {
            const addressFromENS = await getAddressFromENS(address);
            const isValid = isEthereumAddress(address) || addressFromENS;
            if(isValid){
                addressFromENS ? setContractAddress(addressFromENS): setContractAddress(address);
                setTokenClass('text-success');
                setTokenReady(true);
            }else{
                setContractAddress(address);
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
        if(screen === DISPLAY_RESULT) {
            return (
            <Button 
                className="button-selector"
                value={Form}
                disabled={false}
                onClick={(event) => { 
                    event.preventDefault();
                    setDisabled(false);
                    setScreen(PREPARE_INPUTS)
                    setWalletAddress('');
                    setContractAddress('');
                    setWalletReady(false);
                    setTokenReady(false);
                    handleReset();
                }
            }>
                Clear Inputs
            </Button>);
        }
        if(screen === PREPARE_INPUTS) {
            return (
                <Button
                    className="button-selector"
                    value={Form}
                    disabled={!(walletReady && tokenReady) || disabled}
                    onClick={(event) => {
                        event.preventDefault();
                        setDisabled(true);
                        updateBalance();
                    }
                }>
                    Get Balance
                </Button>
            );
        }
    }

    const alert = (type) => {
        if((type === 'Wallet' && walletClass === 'text-danger')||
        (type === 'Token' && tokenClass === 'text-danger')){
            return (
                <Alert className="error-alert" variant={'danger'}>
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
            <Form className="input-form" ref={formRefWallet} validated={validated} onSubmit={e => {submitHandler(e)}}>
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
                {alert('Wallet')}
            </Form>
            <Form className="input-form" ref={formRefContract} validated={validated} onSubmit={e => {submitHandler(e)}}>
                <Form.Group controlId="formContractAddress">
                <Form.Label>Token Contract Address</Form.Label>
                <Form.Control
                    className={tokenClass} 
                    disabled={lockInputs}
                    onChange={(e)=> {validateTokenFormat(e)}} 
                    onInput={(e)=> {validateTokenFormat(e)}}
                    placeholder="0xdAC17F958D2ee523a2206206994597C13D831ec7"
                />
                {alert('Token')}
                </Form.Group>
            </Form>
            {buttonSelector()}
        </Container>
    );
}

export default Request;