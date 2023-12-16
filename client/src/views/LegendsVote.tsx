import React, {useEffect, useState} from 'react';
import "../App.css";
import { useMoralisQuery } from "react-moralis";
import { VStack, Button, Box,  Tag, Text, Spacer, HStack, Flex } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import '../App.css';
import { useNFTBalances } from 'react-moralis';
import { Link } from 'react-router-dom';
import { useNewMoralisObject } from 'react-moralis';



function Vote2() {
 
  // eslint-disable-next-line
  const [data1, setData1]:any = useState();
  const [data2, setData2] = useState('');
  const [data3, setData3]:any = useState();
  const [newdata3, setnewData3] = useState(0);
  const [data4, setData4] = useState('');
  const [data5, setData5]:any = useState();
  const [newdata5, setnewData5] = useState(0);
  const [data6, setData6] = useState('');
  // eslint-disable-next-line
  const [newdata1, setnewData1] = useState(0);
  const Question="How should we distribute our first batch of holder rewards of 20 000 CRO when we hit 25% (750NFTs) minted? "
  const option1="Distribute evenly to all NFT holders -> about 26CRO for all holders / NFT."
  const option2= "Distribute only to FlagBearer NFT holders -> estimated 100 FlagBearers minted at total 750 mints. -> about 200CRO / FlagBearer NFT."
  const option3= "Distribute rewards to all, but give 8 x to FlagBearers -> estimated 100CRO for FlagBearers NFT and about 15CRO for the rest / NFT."
 

  const limitQuery = useMoralisQuery("LegendsVoteOption1", (query) => query.limit(100), [], 
  {autoFetch: false,});


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData1(Number(JSON.stringify(result[result.length-1].attributes.votescore1)), setnewData1(data1))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData2(String(JSON.stringify(result)))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);

  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData3(Number(JSON.stringify(result[result.length-1].attributes.votescore2)), setnewData3(data3))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData4(String(JSON.stringify(result)))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);
  
  
  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData5(Number(JSON.stringify(result[result.length-1].attributes.votescore3)), setnewData5(data5))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData6(String(JSON.stringify(result)))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);
  const  {save}  = useNewMoralisObject("LegendsVoteOption1");
 
const addVotes = async () => {
  
  const data = {
   
  };
  save(data, {
    onSuccess: (LegendsVoteOption1) => {
      LegendsVoteOption1.set("voters",address);
      LegendsVoteOption1.set("votescore1",vote1score);
      LegendsVoteOption1.set("votescore2",data3);
      LegendsVoteOption1.set("votescore3",data5);
 
  
      LegendsVoteOption1.save();

}
});

};


const addVotes2 = async () => {
 
  const data = {
   
  };
  save(data, {
    onSuccess: (LegendsVoteOption1) => {
      LegendsVoteOption1.set("voters",address);
      LegendsVoteOption1.set("votescore1",data1);
      LegendsVoteOption1.set("votescore2",vote2score);
      LegendsVoteOption1.set("votescore3",data5);
  


  
      LegendsVoteOption1.save();

}
});
};


const addVotes3 = async () => {
 
  const data = {
   
  };
  save(data, {
    onSuccess: (LegendsVoteOption1) => {
      LegendsVoteOption1.set("voters",address);
      LegendsVoteOption1.set("votescore1",data1);
      LegendsVoteOption1.set("votescore2",data3);
      LegendsVoteOption1.set("votescore3",vote3score);
  


  
      LegendsVoteOption1.save();

}
});
};







     
  const { account } = useMoralis(

  );
  const [address] = useState<string>(account || '');

 

 

  const {data} = useNFTBalances(
    {
      //@ts-ignore
      tokenAddresses:['0xf96ec7C11D311920833753FAB9b174B6FD53517E'],
      chain:'0x19',
      address,
     
     
      

      
      
 
    },
    {
      autoFetch: true,
     
    },
    
   
  );


 

    
    const [isDisabled, setDisabled] = useState(false);
   
 
    
   // eslint-disable-next-line
    const increment1 = () => { (data1 + (1*numberOfVotes));setDisabled(true);addVotes()}
    // eslint-disable-next-line
    const increment2 = () => {(data3 + (1*numberOfVotes));setDisabled(true);addVotes2()}
     // eslint-disable-next-line
     const increment3 = () => {(data5 + (1*numberOfVotes));setDisabled(true);addVotes3()}
      // eslint-disable-next-line
    const numberOfVotes:number=Number(data?.result?.length);
    // eslint-disable-next-line
    const vote1score:number=data1+numberOfVotes;
    const vote2score:number=data3+numberOfVotes;
    const vote3score:number=data5+numberOfVotes;
   
    if (!address) {
      
      return (
      <VStack alignItems={'center'}>
      <Box  alignItems={'center'}>
      <Link to="/">PLEASE LOGIN/REFRESH </Link>
      

      </Box>

      </VStack>
      )
    }

    if (data2.includes(address)){ 
      return (
        <VStack textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>
        <Box  alignItems={'center'}>
       
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}> WELCOME TO THE VOTING ROOM. EACH VOTE WILL BE MULTIPLIED WITH THE AMOUNT OF ROBOTS HELD.  </Text>
        <Spacer padding={3}></Spacer>
        <Text p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>{Question}  </Text>
        <Spacer padding={7}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >OPTION 1: {option1}  </Text>
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >OPTION 2: {option2}   </Text>
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >OPTION 3: {option3}   </Text>
        </Box>
        <Box >
        <Spacer padding={10}></Spacer>
        <Link  to="/">THANKS FOR VOTING!</Link>   <Spacer padding={5}></Spacer>
       
       <Flex direction='row' justifyContent={'center'}>
<HStack alignSelf='inherit' alignItems={'inherit'} alignContent={'inherit'}>
        <Tag  p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='white'>OPTION 1 SCORE: <br></br>  {data1}</Tag>

        <Spacer paddingTop={10}></Spacer>

        <Tag p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='white'>OPTION 2 SCORE: <br></br>  {data3}</Tag>

        <Spacer paddingTop={10}></Spacer>

<Tag p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='white'>OPTION 3 SCORE: <br></br>  {data5}</Tag>
<Spacer paddingTop={10}></Spacer>
</HStack>
</Flex>
<br></br>
<br></br>
<Spacer paddingTop={10}></Spacer>
        <Tag textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='green'>WEIGHTED VOTES IN TOTAL {data1+data3+data5}</Tag>


     
    
        </Box>
    
        </VStack>
    
      )}



      if (!address|| address){
        return (

          <VStack alignItems={'center'}>
            
      
            <Box justifyContent={'center'} alignItems={'center'} >
            <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}> WELCOME TO THE VOTING ROOM. EACH VOTE WILL BE MULTIPLIED WITH THE AMOUNT OF ROBOTS HELD.  </Text>
            <Spacer padding={3}></Spacer>
            <Text p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>{Question}  </Text>
            <Spacer padding={7}></Spacer>
            <Flex  display="flex" direction= 'column' justifyContent="center" >
            <Button colorScheme={'green'}  fontSize={'1vw'} onClick={increment1} isDisabled={isDisabled}>VOTE FOR OPTION 1 ({data1} VOTES SO FAR)</Button>
            <Spacer padding={7}></Spacer>

        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>OPTION 1: {option1}  </Text>
        <Spacer padding={3}></Spacer>
        <Spacer padding={10}></Spacer>
                 
          
                 <Button    display="flex" justifyContent="center"  colorScheme={'green'} textAlign={'center'} fontSize={'1vw'}  onClick={increment2}   isDisabled={isDisabled}>VOTE FOR OPTION 2 ({data3} VOTES SO FAR)</Button>
                 <Spacer padding={10}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>OPTION 2: {option2}  </Text>
        <Spacer padding={10}></Spacer>

        <Button  alignItems={'center'} colorScheme={'green'} textAlign={'center'} fontSize={'1vw'}  onClick={increment3}   isDisabled={isDisabled}>VOTE FOR OPTION 3 ({data5} VOTES SO FAR)</Button>
                 <Spacer padding={10}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>OPTION 3: {option3}  </Text>
        </Flex>
                <VStack>
                  
                 
                <Spacer padding={15}></Spacer>
            
      
           <Tag textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='green'>WEIGHTED VOTES IN TOTAL {data1+data3+data5}</Tag>
            <Text visibility={'hidden'} textAlign={'center'} fontSize={'1vw'} >addresses here...{data2}{data4}{data6}</Text>
            
              
            
          
         
      
                </VStack>
              
            </Box>
      
        
          </VStack>
        );}
        // eslint-disable-next-line
else {

  return (

    <VStack alignItems={'center'}>
        <Box  alignItems={'center'}>
        <Text textAlign={'center'} fontSize={'1vw'}alignItems={'center'}>WELCOME TO THE VOTING ROOM. EACH VOTE WILL BE MULTIPLIED WITH THE AMOUNT OF ROBOTS HELD. </Text>
        <Spacer padding={7}></Spacer>
        <Text p={5} border="1px" borderColor="white" borderRadius="xl" bg="transparent" textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>{Question}  </Text>
        <Spacer padding={7}></Spacer>
        <HStack>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >OPTION 1: {option1}</Text>
        <Button colorScheme={'green'} textAlign={'center'} fontSize={'1vw'} onClick={increment1} isDisabled={isDisabled}>OPTION 1</Button>
            <Spacer padding={7}></Spacer>
            </HStack>

       
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >OPTION 2: {option2}  </Text>
             
        <Button  colorScheme={'red'} textAlign={'center'} fontSize={'1vw'}  onClick={increment2}   isDisabled={isDisabled}>OPTION 2</Button>
        </Box>
        <Spacer padding={10}></Spacer>
             
           
           
 
     
   
        <Spacer padding={5}></Spacer>
        <Tag textAlign={'center'} fontSize={'1vw'} alignItems={'center'} colorScheme='green'>VOTE SCORE {data1+data3}</Tag>
        <Spacer padding={5}></Spacer>
      <Text visibility={'hidden'} textAlign={'center'} fontSize={'1vw'} >addresses here...{data2}</Text>
      
        
      {data1 ? (
        <p>First Data1: {[data1]}</p>
        
      ) : (
        <p>Loading...</p>
      )}
    
   

          </VStack>

     
  );

 
}
}


export default Vote2;



