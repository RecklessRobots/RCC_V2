/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Flex, Image, Spacer, Text, Box, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, Alert, HStack, AlertIcon, AlertDescription, AlertTitle, Spinner } from '@chakra-ui/react';
import { useMoralis, useNFTBalances } from 'react-moralis';




interface NftProps {
  name: string;
  metadata: {
    image?: string;
    attributes: { trait_type: string; value: string | number }[];
  };
  address: string;
  id: string;
  type: string;
 
}

const options = {
  method: 'GET',
  headers: { accept: 'application/json' },

};

const NFTGridEB = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [Data, setData] = useState<any>(null); // Store the fetched data
  const [data2, setData2] = useState<any>(null); // Store the fetched data
  const [RTVIPdata, setRTVIPdata] = useState<any[]>([]); // Store the fetched data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenId, setChosenId] = useState('');
  const [NftIds, setNftIds] = useState<any[]>([]); // Store the fetched data
  const Team='Ryoshi Tales VIP';
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    
    async function fetchData() {
      if (address){
      try {
        const url = 'https://cronos-graph.ebisusbay.com:8000/subgraphs/name/ebisusbay/staking';
        const query = `
          query AccountsQuery {
            accounts(where: { id: "${address}" }) {
              id
              numberRyoshiStaked
              ryoshiStaked
            }
          }
        `;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        setData(result.data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }}

    async function fetchData2() {
      if (address){
      try {
        const url = 'https://cronos-graph.ebisusbay.com:8000/subgraphs/name/ebisusbay/ryoshi-dynasties';
        const query = `
          query StakedTokensQuery {
            stakedTokens(first: 1000, where: { user: "${address}", contractAddress: "0xe49709a3b59d708f50aa3712f2e5a84b7707664c" }) {
              amount
              contractAddress
              id
              tokenId
              type
              user
            }
          }
        `;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
      //  //console.log(result);
        setData2(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }}

    fetchData();
    fetchData2();
  }, []); // Run when 'address' changes

 // console.log('data:',data, '& data2:', data2);
  useEffect(() => {
    if (Data && Data.accounts && Data.accounts[0]) {
     // console.log(Data.accounts[0].ryoshiStaked);
    }
  },[Data] );

  useEffect(() => {
    if (data2 && data2.stakedTokens) {
      const tokenIds = data2.stakedTokens.map((token: any) => token.tokenId);
      const currentRyoshiStaked = Data && Data.accounts && Data.accounts[0] ? Data.accounts[0].ryoshiStaked || [] : [];
  
      const updatedRyoshiStaked = [...currentRyoshiStaked, ...tokenIds];
      
      setData((prevData: any) => ({
        ...prevData,
        accounts: [
          {
            ...prevData.accounts[0],
            ryoshiStaked: updatedRyoshiStaked,
          },
        ],
      }));
    }
  }, [data2]);

  // Rest of your code remains the same

  interface SingleNftResponse {
    nft: {
      image: string;
      id: string;
      // Other properties specific to your NFT data structure
    };
  }
  
  interface MultipleNftResponse {
    Data: {
      nft: {
        image: string;
        id: string;
        // Other properties specific to your NFT Data structure
      };
    }[];
  }
  
  // ...
  
  useEffect(() => {
    if (Data && Data.accounts && Data.accounts[0]) {
      fetch('https://api.ebisusbay.com/nft?collection=0xE49709A3B59d708f50AA3712F2E5a84b7707664C&tokenId=' + String(Data.accounts[0].ryoshiStaked), options)
        .then((response) => response.json())
        .then((response: SingleNftResponse | MultipleNftResponse) => {
          if (response) {
          //  console.log(response);
            if ('nft' in response) {
              // Single NFT in the response
              const nftImages = [response.nft.image];
              const nftIds = [response.nft.id];
              setRTVIPdata(nftImages);
              setNftIds(nftIds);
              localStorage.setItem('ebvips', JSON.stringify(nftImages));
            } else if ('Data' in response && Array.isArray(response.Data) && response.Data.length > 0) {
              // Multiple NFTs in the response
             // console.log(response);
              const nftImages = response.Data.map((nft) => nft.nft.image);
              const nftIds = response.Data.map((nft) => nft.nft.id);
              setRTVIPdata(nftImages);
              setNftIds(nftIds);
              localStorage.setItem('ebvips', JSON.stringify(nftImages));
            } else {
              console.error('Response does not contain expected Data:', response);
            }
          } else {
            console.error('Empty response received.');
          }
        })
        .catch((error) => {
          console.error('Error fetching Data:', error);
        });
    }
  }, [data2, Data]);
  
  
 // console.log(RTVIPdata);

const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>, image:string) => {
    event.stopPropagation();
   

    setIsModalOpen(true);
   
    if (image){
    localStorage.setItem('NFTimage', image);}

    const imageUrl = image;

// Use a regular expression to extract the number before ".png"
const match = imageUrl.match(/\/(\d+)\.png$/);

// Check if a match was found
if (match && match[1]) {
  const id = match[1];
 // console.log(id); // This will print "5719" for the given URL
  setChosenId(id);
  localStorage.setItem('StoredLegend', id);
} else {
  //console.log('No match found');
}
}



const selected = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsAlertVisible(false);
    }, 2000);
  
  };

interface EbfromWallet   { 

  token_address?: string;
  token_id?: string;
  contract_type?: string;
  owner_of?: string;
  block_number?: string;
  block_number_minted?: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  amount?: string | undefined;
  name?: string;
  symbol?: string;
  token_hash?: string;
  last_token_uri_sync?: string;
  last_metadata_sync?: string;
} ;

  const [EbfromWallet, setEbfromWallet]=useState<EbfromWallet[]  | undefined>([]);
  

  const { data , error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      tokenAddresses: ["0xe49709a3b59d708f50aa3712f2e5a84b7707664c"] ,
      chain: '0x19',
      address,
    },
    {
      autoFetch: true,
    }
  );

  console.log(data);

console.log(RTVIPdata);
  
 





  return (
    <VStack>
   
{data && Data && data2 && RTVIPdata &&(

    <VStack alignContent={'center'}>
      <Flex flexDirection='column' alignContent={'center'} justifyContent='center'>
      <Text>select legend by clicking the image</Text>
        {RTVIPdata && RTVIPdata.length > 0 ? (
          RTVIPdata.map((image: string, index: number) => (
            <VStack key={index}>
                <HStack>
             
             
            
          
              </HStack>
              <Box textColor={'black'} backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
              <img
                style={{ width: '100%', height: 'auto' }}
                src={image}
                alt={`NFT ${index}`}
                onLoad={() => console.log(`Image ${index} loaded`)} // Log when image is loaded
                onClick={(event) => {imgClickedHandler(event, image); selected();}}
              /> 
              <Text textColor='black' padding={'0.5vmax'}>Ebisus bay VIPs</Text> <Text textColor='black' padding={'0.5vmax'}> ID: {image.slice(80,84)}</Text></Box>
            </VStack>
          )) 
        )  : 
        
        data && data.result?.length ? (
          data.result.map((nft,index:any) => (
            <VStack key={index}>
             
      {nft.metadata?.image && (
        <Image width={'50vw'} height='auto'
        onClick={(event) => {imgClickedHandler(event, nft.metadata.image); selected(); }}
        src={nft.metadata?.image.replace('ipfs://','https://ipfs.io/ipfs/').replace('https://bhfiles.mypinata.cloud/ipfs/', 'https://ipfs.io/ipfs/')}
          loading="lazy"
        />
      )}
      <Box textColor={'white'} p={4} alignSelf='center'>
       
          {nft.metadata.name} #{nft.metadata.id}
            
            {/* Chakra UI Alert */}
            {isAlertVisible && (
              <Alert textColor={'black'} status="success" mt={4}>
                <AlertIcon />
                Legend selected!
              </Alert>
            )}
    
  </Box>
              <Text textColor='black' padding={'0.5vmax'}>Ebisus bay VIPs</Text> <Text textColor='black' padding={'0.5vmax'}> ID: {}</Text>
            </VStack>
          )) 
        )
        
        : (
          <Text>No NFT images available</Text> 
        )} 
        {isAlertVisible && (
          <Alert textColor={'black'} position={'absolute'} status="success" mt={4}>
            <AlertIcon />
            Legend selected!
          </Alert>
        )}
        
        </Flex></VStack>
 )}


</VStack>
  )}
           



   

export default NFTGridEB;
