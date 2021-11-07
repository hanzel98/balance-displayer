import Web3 from 'web3';

let web3;

const getWebSocketUrl = () => {
    switch (process.env.REACT_APP_NETWORK){ 
        case 'mainnet':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_MAINNET;
        case 'rinkeby':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_RINKEBY;
        case 'ropsten':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_ROPSTEN;
        case 'kovan':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_KOVAN;
        default:
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_MAINNET;
    }
}

export const connectWeb3 = () => {
    const provider = new Web3.providers.WebsocketProvider(getWebSocketUrl());
    provider.on('error', console.error);
    provider.on('connect', () => console.log('Blockchain Connected ...'));
    provider.on('end', console.error);
    web3 = new Web3(provider);
    return web3;
}

/**
   * Checks the status of connection
   *
   * @return {Boolean} - Resolves to true or false
   */
 const isConnected = () => {
    if (web3) return web3.eth.net.isListening();
    return false;
}

// Takes a text input a returns true if it is an address and false if not
export const isEthereumAddress = textInput => {
    if (!isConnected()) { 
        connectWeb3()
    };
    return web3.utils.isAddress(textInput);

}

export const closeWeb3Connection = () => {
    web3.currentProvider.connection.close();
}
