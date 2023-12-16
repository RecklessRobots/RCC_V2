import React from 'react';
import { Container, Spacer, Text, Flex, Img } from '@chakra-ui/react';

import { Connect } from '../components/Connect';

import { Navigation } from './Navigation';
import RR from './RRLOGO.png';
import '../App.css';








const Header = () => {


 
  return (
    <Container maxW="full"  centerContent >
      <Img   width='20%' height= 'auto' src={RR}  alt=''></Img>
          <Flex wrap="nowrap" alignItems={'center'} mr={9} direction= 'row' gap='7' justify-content= 'space-around'>
          
          <Text  fontSize='2vw' fontWeight="100" color="#68738D">  {'RECKLESS COMMAND CENTER'}</Text>
        <Connect   />
        
            </Flex>
 
        
    
        
      <Flex wrap="nowrap" alignItems='center'  direction= 'row' justify-content= 'space-around'>  
        <Navigation  />
        </Flex>
        <Spacer />
       
    
    </Container>
  );
};

export default Header;
