/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { VStack, Box, Text, Button } from '@chakra-ui/react';
import Moralis from 'moralis-v1';
import { Link } from 'react-router-dom';



interface GamesAttributes {
  className: 'Game';
  player: String;
  score: number;
  exp: number;
}


interface Legacy_attributes {
  className: 'Rampage_LegacyTeams_R3',
  address: {
    teams: [
      { Team: { score: Number } },
    ],
  },}
  

  
interface Rampage_LegacyTeams_R3 extends Moralis.Object<Legacy_attributes> {}


interface RampageLegacy_R3 extends Moralis.Object<GamesAttributes> {
 
}

interface OMA_attributes {
  className: 'Rampage_1MA_Teams',
  address: {
    teams: [
      { Team: { score: Number } },
   
    
    ],
  },}
interface Rampage_1MATeams extends Moralis.Object<OMA_attributes> {
}
const Rampage_1MATeams = Moralis.Object.extend({
  className: 'Rampages_1MA_Teams_R3',

});

const Rampage_LegacyTeams_R3 = Moralis.Object.extend({
    className: 'Rampage_LegacyTeams_R3',
  
  });


  const RampageLegacy_R3 = Moralis.Object.extend({
    className: 'RampageLegacy_R3'  
  });

const RampageOneManArmy_R3 = Moralis.Object.extend({
  className: 'RampageOneManArmy_R3'
});


const RampageClicker = Moralis.Object.extend({
  className: 'RampageClickerGames'

});
  
interface TimerComponentProps {
  address: string;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function TimerComponent({ address, refresh, setRefresh }: TimerComponentProps) {


  
    const [updateTime, setUpdateTime] = useState<Date | null>(null);
    const [timeDifference, setTimeDifference] = useState<number | null>(null);
    const sixHoursInMilliseconds = 1 * 5 * 60 * 1000;
  
    
    const [Reset,setReset]=useState(false);
  
    // Replace 'address' with the actual variable that holds the player address
  
  
    // Function to fetch the update time from MongoDB
    
    
    const fetchUpdateTime = async () => {
      
      
      try {
        const query = new Moralis.Query(RampageLegacy_R3);
        query.equalTo('player', address);
        const previousUpdateObject = await query.first();
  
        if (previousUpdateObject) {
          const TokenReset=previousUpdateObject.get('reset');
          if (TokenReset){
          const previousUpdateTime = previousUpdateObject.get('updatedAt');
          setUpdateTime(previousUpdateTime);
         }
        } else {
          /*/ Save the exp if it's the first exp for the user
          const newExpObject = new RampageLegacy_R3();
          newExpObject.set('player', address);
          newExpObject.set('exp', 0);
          await newExpObject.save(); */
          console.log('');
        }
      } catch (error) {
        console.error('Error querying or saving time:', error);
      }
    };
  
    // Function to calculate the time difference between present time and update time
    const calculateTimeDifference = () => {
      if (updateTime) {
        const currentTime = new Date();
        const differenceInMilliseconds = sixHoursInMilliseconds - (currentTime.getTime() - updateTime.getTime());
        
      
        if (differenceInMilliseconds <= 0) {
          // Timer has run out, set localStorage object "Tokens" to null
       
          setTimeDifference(0); // Set time difference to 0 to stop further countdown
          

          const ResettingTokens = async () => {
            // Query the previous score of the user
            const query = new Moralis.Query(RampageLegacy_R3);
             await query.equalTo('player', address);
            
              const previousScoreObject = await query.first();
              if(previousScoreObject){
                const legendsAmount=previousScoreObject.get('legendsAmount');
              previousScoreObject.set('reset',(false));
              previousScoreObject.set('tokens',legendsAmount);
              await previousScoreObject.save();

        }
          }
         ResettingTokens();



        } else {
          setTimeDifference(differenceInMilliseconds);
          localStorage.setItem('Timer',"initialized")}
         // console.log('should be working now', updateTime, timeDifference)
       
    }
   
    ;}
  
    
    useEffect(() => {
      // Fetch the update time when the component mounts
  
  
      // Set up the timer to update the time difference every second
      const timer = setInterval(calculateTimeDifference, 2000);
  
      // Clear the timer when the component unmounts to avoid memory leaks
      return () => {
        clearInterval(timer);
        setTimeDifference(null);
      };
    }, [Reset]);
    
    useEffect(() => {
      // Update the time difference whenever updateTime changes
      calculateTimeDifference();
    }, [updateTime]);

    
  const handleFetchTimeClick = () => {
    fetchUpdateTime().then
    calculateTimeDifference();
  
  };

  const handleResetClick = () => {
    setReset(true);
  }
 
  
  // Function to format the time in HH:mm:ss format
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
    return (
      <VStack justifyItems='center' alignItems="center">
      <Box fontSize='1vmax' textAlign={'center'} justifyItems='center' alignItems="center">
      <Button fontSize={'1.2vmax'} variant={'outline'} color={'orangered'} onClick={handleFetchTimeClick}>Click to refresh token cooldown time</Button>
        {updateTime && timeDifference !== null ? (
          timeDifference ? (
            <>
              <Text justifySelf={'center'}>COOLDOWN INITIALIZED, TIMER: {formatTime(timeDifference)}</Text>
          
            </>
          ) : (
            <Box justifyItems= 'center' justifySelf={'center'}fontSize={'1vmax'}>
            <Text justifySelf={'center'}>COOLDOWN EXPIRED</Text>
            <Button onClick={() => setRefresh((currentRefresh) => !currentRefresh)} fontSize='1vmax' variant={'outline'} color={'orangered'}> click to refresh tokens</Button>
            </Box>
          )
        ) : (
          <Text> </Text>
        )}
      </Box>
    </VStack>
    );
  };
  


  
  export default TimerComponent;