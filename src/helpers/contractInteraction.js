import { connectWeb3 } from './web3Connection';
import ERC20ABI from '../assets/ABI-ERC20.json';

const getERC20Contract = async tokenAddress => {
    const web3 = await connectWeb3();
    return new web3.eth.Contract(ERC20ABI, tokenAddress);
}

export const getBalance = async (tokenAddress, walletAddress) => {
    // DAI RINKEBY= 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea
    // LINK RINKEBY= 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    // WALLET ADDRES = 0x0E7519Ac25115E8C0ab8CB73eB4cFa503E0E6a26
    // const contractInstance = await getERC20Contract('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');
    const contractInstance = await getERC20Contract(tokenAddress);
    console.log('contractInstance:', contractInstance)
    const decimals = await contractInstance.methods.decimals().call();
    // const balance = await contractInstance.methods.balanceOf("0x0E7519Ac25115E8C0ab8CB73eB4cFa503E0E6a26").call();
    const balance = await contractInstance.methods.balanceOf(walletAddress).call();
    const finalBalance = balance/(10 **decimals); // Move to the correct decimals format
    console.log('finalBalance:', finalBalance)
    return finalBalance;
}

export const getSymbol = async (tokenAddress) => {
    // DAI RINKEBY= 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea
    // LINK RINKEBY= 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    // WALLET ADDRES = 0x0E7519Ac25115E8C0ab8CB73eB4cFa503E0E6a26
    // const contractInstance = await getERC20Contract('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');
    const contractInstance = await getERC20Contract(tokenAddress);
    console.log('contractInstance:', contractInstance)
    const symbol = await contractInstance.methods.symbol().call();
    console.log('symbol:', symbol)
    return symbol;
}


