import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Grid,
  GridItem,

  Image,
 
  Tag,
 
  VStack,
  
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNFTBalances, useWeb3Transfer } from 'react-moralis';

interface NftProps {
  name: string;
  metadata?: { image?: string };
  address: string;
  id: string;
  type: string;
}

const Nft = ({ name, id, metadata, type, address }: NftProps) => {
  const [chosenId, setChosenId] = useState(id);
  // eslint-disable-next-line
  const { fetch, error, isFetching } = useWeb3Transfer({
    type: 'erc721',
    
  
    contractAddress: address,
    tokenId: chosenId,
  });



 /* useEffect(() => {
    if (!isFetching && !error) {
       // eslint-disable-next-line
      console.log('NFT transferred');
    }
  }, [isFetching, error]); */

  const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setChosenId(id);
     // eslint-disable-next-line
    console.log(
      'Collection name:  ',
      name,
      'NFT Id: ',
      id,
      'NFT type: ',
      type
    );
  };



  

  return (
    <Box backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
      {metadata?.image && (
        <Image
          onClick={imgClickedHandler}
          src={metadata?.image.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}
        />
      )}
      <Box p={4}>
        <Tag fontSize={'0.8vw'}>
          {name} #{id}
        </Tag>

       

      </Box>
    </Box>
  );
};

interface NftGridProps {
  token_addresses?: string[] | undefined;
  address: string;
  chain: string;
  limit?: number;
}
 // eslint-disable-next-line
export const NftGridF = ({ address }: NftGridProps) => {
  const { data, error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      "tokenAddresses": ['0xD56AFcdB787e233325757D3ED7A987F11FB3fa08'],
      "chain": '0x19',
      "address":"0x000000000000000000000000000000000000dead",
      "limit":10,
     
     
      



      
    },
    {
      autoFetch: true,
      
    }
  );

  if (isLoading) {
    return (
      <Box>
        <Spinner thickness="4px" color="blue.300" size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
       
      </Box>
    );
  }

  if (!data?.result || data.result.length === 0) {
    return (
      <Box>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No results</AlertTitle>
          <AlertDescription>
            There are no NFTs associated with this address.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <VStack alignItems="start">
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {data.result.map((nft) => (
          <GridItem key={`${nft.token_address}${nft.token_id}`}>
            <Nft
              name={nft.name}
              id={nft.token_id}
              address={nft.token_address}
              metadata={nft.metadata}
              type={nft.contract_type}
            />
        
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default NftGridF;