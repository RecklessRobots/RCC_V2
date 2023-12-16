import { VStack, Heading, Button, Box,  Tag, Flex, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NftGridL } from '../components/NFTGridL';
import { useMoralis } from 'react-moralis';
import '../App.css';
import AppG from './game/AppG'
import axios from 'axios';


export const Legends = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  const [searchChain, setSearchChain] = useState<string>('0x19');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xf96ec7C11D311920833753FAB9b174B6FD53517E'];
 
  



 
  useEffect(() => {
    if (!address && account) {
      setAddress(account);
    }
  }, [account, address]);

  
  const [data, setData] = useState(null);

      
  const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xf96ec7C11D311920833753FAB9b174B6FD53517E&address="
  const url2= String(address)
  const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
  
  

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url1+url2+url3);
        const json = await response.json();
        setData(json);
      
      };
    // eslint-disable-next-line
      fetchData() .then
    
    }, []);
    

  return (
    
    <VStack alignItems={'center'}>
      

      <Box width="full">
      <Flex wrap="nowrap"  direction= 'row'   justify-content= 'space-between' >
      
      <Tag fontSize={'1vw'} boxSize={'fit-content'} margin= '2em' >{data ? <p>LEGENDS BALANCE:       - {(data)['result']} </p> : <p>Loading...</p>}</Tag>
  
      <Tag  fontSize={'1vw'} boxSize={'fit-content'} margin= '2em'>{data ?  <p>PERCENTAGE OWNED: - {(((data)['result']/3000)*100).toFixed(2)} % </p> : <p>Loading...</p>}</Tag>
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
              UPDATE MY LEGENDS
            </Button>
          </VStack>
        </form>
      </Box>

      {searchAddress && (
        <Box pt={8}>
          <Heading size={'md'} mb={4}>
          <Tag  fontSize='1vw' colorScheme={'whiteAlpha'}>LEGENDS FOR {searchAddress}</Tag> 
       
          </Heading>
          <NftGridL  token_addresses= {tokenaddresses} address={searchAddress} chain={searchChain} />
        
        </Box>
      )}
    </VStack>
  );
};
