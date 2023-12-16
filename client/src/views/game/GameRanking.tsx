import React, {useEffect, useState} from 'react';
import { useMoralisQuery } from "react-moralis";
import { VStack, Button, Box,  Tag, Text, Spacer } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import { useNFTBalances } from 'react-moralis';
import { Link } from 'react-router-dom';
import { useNewMoralisObject } from 'react-moralis';



const Leaderboard = () => {
       
    const { account } = useMoralis(
 
        );
        const [address] = useState<string>(account || '');
      
       
      
        const {data} = useNFTBalances(
          {
            //@ts-ignore
            tokenAddresses:['0xD56AFcdB787e233325757D3ED7A987F11FB3fa08'],
            chain:'0x19',
            address,
           
          },
          {
            autoFetch: true,
          },
        );
      
      

   // eslint-disable-next-line
   const [winsRating, setwinsRating]:any = useState();
   const [data2, setData2] = useState('');
   // eslint-disable-next-line
   const [newwinsRating, setnewwinsRating] = useState(0);
  
   const limitQuery = useMoralisQuery("GameRanking", (query) => query.limit(100), [], 
   {autoFetch: false,});
 
 
   useEffect (() => {
     limitQuery.fetch({
         onSuccess: (result) => {setwinsRating(Number(JSON.stringify(result[result.length-1].attributes.score)), setnewwinsRating(winsRating))}})
         // eslint-disable-next-line
       .catch(error => console.error(error))
     
     
   }, []);
 
 
   useEffect (() => {
     limitQuery.fetch({
         onSuccess: (result) => {setData2(String(JSON.stringify(result)))}})
         // eslint-disable-next-line
       .catch(error  => console.error(error))
     
     
   }, []);
 
 
   
   const  {save}  = useNewMoralisObject("GameRanking");
  
 const addScore = async () => {
   
   const data = {
    
   };
   save(data, {
     onSuccess: (GameRanking) => {
       GameRanking.set("Players",address);
   GameRanking.set("score",nuscore);
 
  
   
 GameRanking.save();
 location.reload();
 }
 });
 
 };
 
 
 const reduceScore = async () => {
  
   const data = {
    
   };
   save(data, {
     onSuccess: (GameRanking) => {
       GameRanking.set("Players",address);
       GameRanking.set("score",nunegscore);
    
   
 GameRanking.save();
 
 }
 });
 };

     const [isDisabled, setDisabled] = useState(false);
      
  
    // eslint-disable-next-line
     const increment = () => { (winsRating + (1*numberOfVotes));setDisabled(true);addScore()}
     // eslint-disable-next-line
     const decrement = () => {(winsRating - (1*numberOfVotes));setDisabled(true);reduceScore()}
       
     // eslint-disable-next-line
     const numberOfVotes:number=Number(data?.result?.length);
     // eslint-disable-next-line
     const nuscore:number=winsRating;
     const nunegscore:number=winsRating;
    
     if (!address) {
       
       return (
       <VStack alignItems={'center'}>
       <Box  alignItems={'center'}>
       <Link to="/">PLEASE LOGIN AND REFRESH</Link>
       
 
       </Box>
 
       </VStack>
       )
     }
 
     if (data2.includes(address)){ 
       return (
         <VStack textAlign={'center'} fontSize={'1vw'} alignItems={'center'}>
         <Box  alignItems={'center'}>
        
       
         <Spacer padding={10}></Spacer>
         <Link  to="/">THANKS FOR PLAYING, STAY VICTORIOUS!</Link>   <Spacer padding={5}></Spacer>
         <Tag textAlign={'center'} fontSize={'1vw'} padding={5} alignItems={'center'} colorScheme='green'>VOTE SCORE {winsRating}</Tag>
      
     
         </Box>
     
         </VStack>
     
       )}
 
 
       interface WinsRating {
        address: string;
        score?: number;
        nuscore:number;
      }
      
   return (
 
     <VStack alignItems={'center'}>
        
     
             <Button colorScheme={'green'} textAlign={'center'} fontSize={'1vw'} onClick={increment} isDisabled={isDisabled}>AGREE</Button>
          
         <Tag textAlign={'center'} fontSize={'1vw'} alignItems={'center'} colorScheme='green'>VOTE SCORE {winsRating}</Tag>
     
       
         
       {winsRating ? (
         <p>First winsRating: {[winsRating]}</p>
         
       ) : (
         <p>Loading...</p>
       )}
     

  <table>
    <thead>
      <tr>
        <th>Address</th>
        <th>Score</th>
       
      </tr>
    </thead>
    <tbody>
    {winsRating?.map(({ address, nuscore }:typeof winsRating) => (
        <tr key={address}>
          <td>{address}</td>
          <td>{nuscore}</td>
</tr>
))}
</tbody>
</table>

</VStack>

   )}
export default Leaderboard;
 




//rankingData[playerAddress] = rankingData[playerAddress] || { wins: 0, losses: 0 };
  //if (isWinner) {
   // rankingData[playerAddress].wins++;
  //} else {
   // rankingData[playerAddress].losses++;
 // }

