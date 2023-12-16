/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Text, Box, VStack, Img, HStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import RampageFront from './game/RampageFront.png'
import { Link } from 'react-router-dom';
import Timer from './tournamentTimer';
import eb from './game/eb.png'
import RampageStart from './game/RAMPAGE.png';




const Home = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [data, setData] = useState<any>(null); // Store the fetched data
  const [data2, setData2] = useState<any>(null); // Store the fetched data
  const [RTVIPdata, setRTVIPdata] = useState<any[]>([]); // Store the fetched data

  
  useEffect(() => {
    setTimeout(() => {
      
   
    const PlayDiv2 = document.getElementById('RampageStart');
    if (PlayDiv2) {
      PlayDiv2.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 500);
  },[] ); 

  return (
    <VStack  alignContent={'center'}>
       
          <Link  id='RampageStart' style={{textAlign:'center', color:'orangered', margin:'0.5vmax'}} to='./Rampage/Gameloader'> <img  className='modal' style={{boxShadow:'0 0 100px orangered', width:'40vmax'}}src={RampageStart}></img>CLICK TO ENTER THE BATTLEFIELD</Link>
          <Spacer paddingBottom={'2vmax'}></Spacer>
          <Timer />
        
          <Spacer paddingBottom={'2vmax'}></Spacer>
          <Wrap  borderWidth='10px' fontSize={'1vmax'}  justifyContent='space-between' width='80%' className='modal' flexDirection={'row'}>
     
          <WrapItem  justifyContent='space-evenly'>
      
             <img  width={'7%'} height={'7%'} src={eb}></img> 
         
            <Box textAlign={'center'}>
        
             <Link  to='https://app.ebisusbay.com/drops/reckless-robots-legends'> Mint your Legends NFTs (rampage tokens) <br></br> at EBISU'S BAY</Link>
             </Box>
             <img width={'7%'} height={'7%'} src={eb}></img> </WrapItem>
          </Wrap>
      <Flex flexDirection='column' alignContent={'center'} justifyContent='center'>
    
     
  <Spacer paddingBottom={'10vw'}></Spacer>
<Text textAlign={'center'} fontSize={'1vw'}>WELCOME TO THE RECKLESS COMMAND CENTER, FLEET COMMANDER! </Text>

<Spacer paddingBottom={10}/>
<Box justifyItems={'center'} textAlign='center'>
<Text textAlign={'center'} fontSize={'1vw'}> IN HERE YOU CAN: </Text><br></br><Text textAlign={'center'} fontSize={'1vw'}>
- CONTROL AND INSPECT YOUR GEN1 ROBOT AND LEGENDS FLEET AND SEE HOW THEY COMPARE TO THE TOTAL SUPPLY<br></br>
- HONOR THE FALLEN ONES AND INSPECT THE STATISTICS OF GEN 1<br></br>
- TAKE PART IN THE DECISION MAKING THROUGH VOTES  </Text> 
</Box>
<Spacer  paddingBottom={5}/>

<Text textAlign={'center'} fontSize={'1vw'} >PLEASE NOTE THAT ONLY THE CHAMBER OF FALLEN CAN BE <br></br>USED WITHOUT SIGNING IN WITH YOUR WALLET.</Text>
</Flex></VStack>
      );
    };
  
   
                
           



   

export default Home;


