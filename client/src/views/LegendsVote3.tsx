import React, {useEffect, useState} from 'react';
import "../App.css";
import { useMoralisQuery } from "react-moralis";
import { VStack, Button, Box,  Tag, Text, Spacer } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import '../App.css';
import { useNFTBalances } from 'react-moralis';
import { Link } from 'react-router-dom';
import { useNewMoralisObject } from 'react-moralis';



function Vote2() {
  // eslint-disable-next-line
  const [data1, setData1]:any = useState();
  const [data2, setData2] = useState('');
  // eslint-disable-next-line
  const [newdata1, setnewData1] = useState(0);
  const Question="Feeling bullish about the Legends?"
  const Agree="I Feel bullish"
  const Disagree= "Not too bullish"
  const limitQuery = useMoralisQuery("LegendsVote", (query) => query.limit(100), [], 
  {autoFetch: false,});


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData1(Number(JSON.stringify(result[result.length-1].attributes.votescore)), setnewData1(data1))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);


  useEffect (() => {
    limitQuery.fetch({
        onSuccess: (result) => {setData2(String(JSON.stringify(result)))}})
        // eslint-disable-next-line
      .catch(error => console.error(error))
    
    
  }, []);


  
  const  {save}  = useNewMoralisObject("LegendsVote");
 
const addVotes = async () => {
  
  const data = {
   
  };
  save(data, {
    onSuccess: (LegendsVote) => {
      LegendsVote.set("voters",address);
  LegendsVote.set("votescore",nuVotescore);

 
  
LegendsVote.save();

}
});

};


const reduceVotes = async () => {
 
  const data = {
   
  };
  save(data, {
    onSuccess: (LegendsVote) => {
      LegendsVote.set("voters",address);
      LegendsVote.set("votescore",nunegVotescore);
 
  


  
LegendsVote.save();

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
    const increment = () => { (data1 + (1*numberOfVotes));setDisabled(true);addVotes()}
    // eslint-disable-next-line
    const decrement = () => {(data1 - (1*numberOfVotes));setDisabled(true);reduceVotes()}
      // eslint-disable-next-line
    const numberOfVotes:number=Number(data?.result?.length);
    // eslint-disable-next-line
    const nuVotescore:number=data1+numberOfVotes;
    const nunegVotescore:number=data1-numberOfVotes;
   
    if (!address) {
      
      return (
      <VStack alignItems={'center'}>
      <Box  alignItems={'center'}>
      <Link to="/">PLEASE REFRESH</Link>
      

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
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>{Question}  </Text>
        <Spacer padding={7}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >AGREE: {Agree}.  </Text>
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >DISAGREE: {Disagree}   </Text>
     
        </Box>
        <Box >
        <Spacer padding={10}></Spacer>
        <Link  to="/">THANKS FOR VOTING!</Link>   <Spacer padding={5}></Spacer>
        <Tag textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='green'>VOTE SCORE {data1}</Tag>
     
    
        </Box>
    
        </VStack>
    
      )}



      if (!address|| address){
        return (

          <VStack alignItems={'center'}>
            
      
            <Box alignItems={'center'} >
            <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}> WELCOME TO THE VOTING ROOM. EACH VOTE WILL BE MULTIPLIED WITH THE AMOUNT OF ROBOTS HELD.  </Text>
            <Spacer padding={3}></Spacer>
            <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >{Question}  </Text>
            <Spacer padding={7}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>AGREE: {Agree}  </Text>
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>DISAGREE: {Disagree}  </Text>
       
                <VStack>
                  
                 
                   
                <Spacer padding={10}></Spacer>
                 
                 
            <Button colorScheme={'green'} textAlign={'center'} fontSize={'1vw'} onClick={increment} isDisabled={isDisabled}>AGREE</Button>
            <Spacer padding={7}></Spacer>
        <Button  colorScheme={'red'} textAlign={'center'} fontSize={'1vw'}  onClick={decrement}   isDisabled={isDisabled}>DISAGREE</Button>
        <Spacer padding={10}></Spacer>
      
           <Tag textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='green'>VOTE SCORE {data1}</Tag>
            <Text visibility={'hidden'} textAlign={'center'} fontSize={'1vw'} >addresses here...{data2}</Text>
            
              
            
          
         
      
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
        <Text textAlign={'center'} fontSize={'1vw'}alignItems={'center'}>{Question}  </Text>
        <Spacer padding={7}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >AGREE: {Agree}</Text>
        <Spacer padding={3}></Spacer>
        <Text textAlign={'center'} fontSize={'1vw'} alignItems={'center'} >DISAGREE: {Disagree}  </Text>
     
        </Box>
        <Spacer padding={10}></Spacer>
             
           
           
            <Button colorScheme={'green'} textAlign={'center'} fontSize={'1vw'} onClick={increment} isDisabled={isDisabled}>AGREE</Button>
            <Spacer padding={7}></Spacer>
        <Button  colorScheme={'red'} textAlign={'center'} fontSize={'1vw'}  onClick={decrement}   isDisabled={isDisabled}>DISAGREE</Button>
     
   
        <Spacer padding={5}></Spacer>
        <Tag textAlign={'center'} fontSize={'1vw'} alignItems={'center'} colorScheme='green'>VOTE SCORE {data1}</Tag>
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



