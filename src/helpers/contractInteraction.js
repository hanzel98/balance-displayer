import { connectWeb3 } from './web3Connection';
import ERC20ABI from '../assets/ABI-ERC20.json';

const getERC20Contract = async tokenAddress => {
    const web3 = await connectWeb3();
    return new web3.eth.Contract(ERC20ABI, tokenAddress);
}

export const getBalance = async (tokenAddress, walletAddress) => {
    const contractInstance = await getERC20Contract(tokenAddress);
    const decimals = await contractInstance.methods.decimals().call();
    const balance = await contractInstance.methods.balanceOf(walletAddress).call();
    const finalBalance = balance/(10 **decimals); // Using correct decimals format
    return finalBalance;
}

export const getSymbol = async (tokenAddress) => {
    const contractInstance = await getERC20Contract(tokenAddress);
    const symbol = await contractInstance.methods.symbol().call();
    return symbol;
}


