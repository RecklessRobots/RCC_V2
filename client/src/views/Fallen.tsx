import { VStack, Button, Box,  Tag, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NftGridF } from '../components/NftGridF';
import { useMoralis } from 'react-moralis';
import '../App.css';





export const Fallen = () => {

  




  
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  // eslint-disable-next-line
  const [searchChain, setSearchChain] = useState<string>('0x19');
  // eslint-disable-next-line
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xD56AFcdB787e233325757D3ED7A987F11FB3fa08'];
 
  
 
  useEffect(() => {
    if (!address && account) {
      setAddress(account);
    }
  }, [account, address]);

  const [data, setData] = useState(null);

      
  const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xD56AFcdB787e233325757D3ED7A987F11FB3fa08&address="
  const url2= "0x000000000000000000000000000000000000dead"
  const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url1+url2+url3);
        const json = await response.json();
        setData(json);
      
      };
  //eslint-disable-next-line
      fetchData();
     
    }, []);
  
   
   



 return (
    
    <VStack alignContent={'center'} >
     
      <Box width="full">
      <Flex wrap="nowrap"  direction= 'row'   justify-content= 'center' alignContent={'center'} >
      
      <Tag fontSize={'1vw'} boxSize={'fit-content'} margin= '1em'>{data ? <p>FALLEN SO FAR:       - {(data)['result']} </p> : <p>Loading...</p>}</Tag>
      <Tag fontSize={'1vw'} boxSize={'fit-content'} margin= '1em'> {data ? <p>REMAINING SUPPLY:    - {2100-(data)['result']} </p> : <p>Loading...</p>}</Tag>
      <Tag fontSize={'1vw'} boxSize={'fit-content'} margin= '1em'>{data ?  <p>PERCENTAGE BURNED: - {(((data)['result']/2100)*100).toFixed(2)} % </p> : <p>Loading...</p>}</Tag>
  
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
              UPDATE FALLEN
            </Button>
          </VStack>
        </form>
      </Box>

      
    
      
    </VStack>
  );
        };

export default Fallen;