import { VStack, Heading, Button, Box,  Tag, Flex, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NftGrid } from '../components/NftGrid';
import { useMoralis } from 'react-moralis';
import '../App.css';




export const Nfts = () => {


  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  const [searchChain, setSearchChain] = useState<string>('0x19');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xD56AFcdB787e233325757D3ED7A987F11FB3fa08'];
 
  
 
  useEffect(() => {
    if (!address && account) {
      setAddress(account);
    }
  }, [account, address]);

  
  const [data, setData] = useState(null);

      
  const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xD56AFcdB787e233325757D3ED7A987F11FB3fa08&address="
  const url2= String(address)
  const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
  
  

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url1+url2+url3);
        const json = await response.json();
        setData(json);
      
      };
    // eslint-disable-next-line
      fetchData();
    
    }, []);
    

  return (
    
    <VStack alignItems={'center'}>
      

      <Box width="full">
      <Flex wrap="nowrap"  direction= 'row'   justify-content= 'space-between' >
      
      <Tag fontSize={'1vw'} boxSize={'fit-content'} margin= '2em' >{data ? <p>RECK BALANCE:       - {(data)['result']} </p> : <p>Loading...</p>}</Tag>
  
      <Tag  fontSize={'1vw'} boxSize={'fit-content'} margin= '2em'>{data ?  <p>PERCENTAGE OWNED: - {(((data)['result']/2100)*100).toFixed(2)} % </p> : <p>Loading...</p>}</Tag>
        <Spacer paddingBottom={5}></Spacer>
        </Flex>
      <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearchAddress(address);
            setSearchChain(chain);
          }}
        >
          <VStack>
            
           
             
           
          <Button padding='1' type="submit" fontSize={'1.3vw'} boxSize='full' minWidth={'-moz-fit-content'} colorScheme="blue">
              UPDATE MY ROBOTS
            </Button>
          </VStack>
        </form>
      </Box>

      {searchAddress && (
        <Box backgroundColor={'transparent'} pt={8}>
          <Heading size={'md'} mb={4}>
          <Tag  fontSize='1vw' colorScheme={'whiteAlpha'}>ROBOTS FOR {searchAddress}</Tag> 
       
          </Heading>
          <NftGrid  token_addresses= {tokenaddresses} address={searchAddress} chain={searchChain} />
          
        </Box>
      )}
    </VStack>
  );
};
