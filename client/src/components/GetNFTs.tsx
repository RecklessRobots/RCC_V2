import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';



const GetNFTs = async () => {
//console.log('did you click get NFTs?');
    const address = '0x000000000000000000000000000000000000dead';

    const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
    const chain = EvmChain.CRONOS;
    
    await Moralis.start({
        serverUrl: 'https://reckless-command-center.herokuapp.com/server',
        appId: 'RCC001'
    });

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        disableTotal:false

    });
    console.log(response?.toJSON);
    


}

GetNFTs();

export default GetNFTs;