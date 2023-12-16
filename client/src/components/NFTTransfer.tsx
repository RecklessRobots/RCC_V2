import {
  
    Box,
    Alert,
 
    Button,
    
 
  } from '@chakra-ui/react';
  import { useWeb3Transfer } from "react-moralis";
  
  
  
  
  
  
  
  
  
  
    export let imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
      const name='';
      const id='';
      const type='';

      event.stopPropagation();
      
      const img = event.currentTarget;
      console.log(
        "Collection name: ",
        name,
        "NFT Id: ",
        id,
        "NFT type: ",
        type
      );
      };
  
    
  
  export const TransferNFT= ()  => {
    const { fetch, error, isFetching } = useWeb3Transfer({
      type: "erc721",
      receiver: "0x000000000000000000000000000000000000dead",
      contractAddress: "0xD56AFcdB787e233325757D3ED7A987F11FB3fa08",
      tokenId: '401',
    });
  
//console.log('testing trasfer');

    return (
  
    
  <Alert>
            <Button onClick={() => fetch()} disabled={isFetching}>Transfer</Button>
      </Alert>
    );
  
    };
  
   
   
  
  export default TransferNFT;
  
  