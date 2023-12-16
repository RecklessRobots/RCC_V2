/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Box, Container, Text, VStack, Button, HStack, Flex, Spacer } from "@chakra-ui/react";

import Moralis from 'moralis-v1';
import Floor1Image from '../Clicker/Loadingarea_BG.png';
import Floor2Image from '../Clicker/CBG6.webp';
import Floor3Image from '../Clicker/Space_BG.png';
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import '../Game.css'
import { useRef } from 'react';
import Meltdowns from "../meltdowns";
import ClickMusic from './Music.mp3.mp3'
import ClickSound from './ClickSound.mp3'
import Floor1 from '../Clicker/Floor1.png'
import Floor2 from '../Clicker/Floor2.png'
import Floor3 from '../Clicker/Floor3.png'

const initialFloors = [

  {
    background: Floor3,
    isClicked: false, 
    clickCoordinates: { x: 0, y: 0 },
        name: "The Staging",
    Floor_Level:1,
    clickScore: 0.5,
    autoIncrement: 0.0,
    autoIncrementPrice: 10,
    level: 1,
    
  },
  {
    background: Floor2,
    isClicked: false, 
    clickCoordinates: { x: 0, y: 0 },
        name: "Deployment",
    Floor_Level:2,
    clickScore: 1,
    autoIncrement: 0.0,
    autoIncrementPrice: 100,
    level: 1,
  },
  {
    background: Floor1,
    isClicked: false, 
    clickCoordinates: { x: 0, y: 0 },
        name: "The Battle",
    Floor_Level:3,
    clickScore: 2,
    autoIncrement: 0.0,
    autoIncrementPrice: 1000,
    level: 1,
  },
  {
    background: Floor2Image,
    isClicked: false, 
    clickCoordinates: { x: 0, y: 0 },
        name: "The Jump",
    Floor_Level:4,
    clickScore: 4,
    autoIncrement: 0.0,
    autoIncrementPrice: 10000,
    level: 1,
  },
  {
    background: Floor3Image,
    isClicked: false, 
    clickCoordinates: { x: 0, y: 0 },
    name: "After the battle",
    Floor_Level:5,
    clickScore: 8,
    autoIncrement: 0.0,
    autoIncrementPrice: 100000,
    level: 1,
  },
];


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





  interface RampageClicker {
    className: 'ClickerGame';
    player: String;
    armorytokens: number;
    updatedAt: Date;
    floors:{
      background: String,
      icon: String,
      name: String,
      clickScore: Number,
      autoIncrement: Number,
      autoIncrementPrice: Number,
      level: Number,
    }
  }
  



const RampageClicker = Moralis.Object.extend({
  className: 'RampageClickerGames'

});



const ClickerGame: React.FC = () => {
  const { account } = useMoralis();
  const [score, setScore] = useState(0);
  const [autoScore, setAutoScore] = useState(0);
  const [floors, setFloors] = useState(initialFloors ? initialFloors : []);
  const [meltdownStorage, setMeltdownsStorage] = useState(10);
  const [updateTime, setUpdateTime] = useState(Date);
  const [ButtonClicked,  setButtonClicked] = useState(Boolean);
 

  const address:string=String(account);

  useEffect(() => {
    if (account){
const GetMeltdowns = async ()=>{
   
        // Query the previous Tokens of the user
        const query = await new Moralis.Query(RampageLegacy_R3);
        await query.equalTo('player', address);
        const queryO = await new Moralis.Query(RampageOneManArmy_R3);
        await queryO.equalTo('player', address);
  
        try {
          const previousCharacterObject = await query.first();
          const previousCharacterObjectO = await queryO.first();
  
          if (previousCharacterObject ) {
            // Compare the new Tokens with the previous Tokens
     
            const MeltdownsAddon = await previousCharacterObject.get('Meltdowns');
            
     
            setMeltdownsStorage(MeltdownsAddon);

            if (MeltdownsAddon>meltdownStorage){
              setMeltdownsStorage(MeltdownsAddon);} }

            if (previousCharacterObjectO ) {
              // Compare the new Tokens with the previous Tokens
       
              const MeltdownsAddonO = await previousCharacterObjectO.get('Meltdowns');
              
           

       if (MeltdownsAddonO>meltdownStorage){
              setMeltdownsStorage(MeltdownsAddonO);} 
             }
       
           else {
            //console.log('no data in meltdowns:');
          }}
      
        
       catch (error) {
          console.error('Error querying meltdowns:', error);
        }
      
      }
  
  GetMeltdowns();
  //console.log('meltdowns loaded =', meltdownStorage)
  }
  }, [account]);
 
  useEffect(() => {
    if (account){
  const GetUpdateTime = async ()=> {
  
    // Query the previous Tokens of the user
    const query = await new Moralis.Query(RampageClicker);
    await query.equalTo('player', address);

    try {
      const previousClickerObject = await query.first();

      if (previousClickerObject) {
        // Compare the new Tokens with the previous Tokens
 
     
        
        const previousUpdatetime = await previousClickerObject.get('updatedAt');
        const previousFloors = await previousClickerObject.get('floors');
        const previousScore= await previousClickerObject.get('armorytokens');


    setUpdateTime(previousUpdatetime);
    setFloors(previousFloors);
    setScore(previousScore);

      
   
      } else {
        //console.log('no previous data found');
      
        const newClickerObject = new RampageClicker();
        newClickerObject.set('player', address);
        newClickerObject.set('armorytokens', score);
        newClickerObject.set('floors', floors);
        newClickerObject.save();
      }
    } catch (error) {
      console.error('Error querying clicker data:', error);
    }
  
  }

GetUpdateTime();
//console.log('data loaded =', meltdownStorage, score, floors)
}
}, [account]);

const parentRef = useRef<HTMLDivElement | null>(null);

const parentRect = parentRef.current ? parentRef.current.getBoundingClientRect(): null;


const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
const handleClick = (clickScore: number, event: any, index: number) => {
  // Calculate position including scroll offsets
  const clickX = event.clientX + window.scrollX;
  const clickY = event.clientY + window.scrollY;

  // Update only the clicked floor
  const updatedFloors = floors.map((floor, idx) => {
    if (idx === index) {
      return { 
        ...floor, 
        isClicked: true, 
        clickCoordinates: { x: clickX, y: clickY }
      };
    }
    return floor;
  });

  setFloors(updatedFloors);

  // Reset isClicked after the animation
  setTimeout(() => {
    setFloors(floors.map((floor, idx) => {
      if (idx === index) {
        return { ...floor, isClicked: false };
      }
      return floor;
    }));
  }, 500);

  setScore(score + clickScore);
};
  //console.log(ButtonClicked);

  const upgradeAutoIncrement = (index: number) => {
    const updatedFloors = [...floors];
    const floor = updatedFloors[index];
    const upgradeCost = floor.autoIncrementPrice * floor.level;

    if (score >= upgradeCost) {
      setScore(score - upgradeCost);
  
      floor.autoIncrement = ((floor.clickScore) *(0.3));
      floor.autoIncrementPrice *= 2.1;
      floor.clickScore *= 1.5;
      floor.level++;
      updatedFloors[index] = floor;
      setFloors(updatedFloors);
    }
  };

  const [datasaved, setDataSaved]=useState(false);
  const saveProgress = () => {
   /* const progress = {
      score: score,
      floors: floors,
      timestamp: Date.now(),
    };
    localStorage.setItem("clickerProgress", JSON.stringify(progress));

*/

    const SetData = async ()=>{
      const depositPassiveIncome = async ()=> {
        setScore(score+autoScore);
        setAutoScore(0);}
        depositPassiveIncome();

            // Query the previous Tokens of the user
            const query = await new Moralis.Query(RampageClicker);
            await query.equalTo('player', address);
      
            try {
              const previousCharacterObject = await query.first();
      
              if (previousCharacterObject) {
                // Compare the new Tokens with the previous Tokens
                previousCharacterObject.set('armorytokens',score);
                previousCharacterObject.set('floors',floors);
                //console.log(floors);
              previousCharacterObject.save();
           
              } else {
                console.log('requirements not met for skills, lasers, and attack addons:');
              }
            } catch (error) {
              console.error('Error querying or saving score:', error);
            }
            
              
          
          }
      
      SetData();
      setDataSaved(true);
      //console.log('datasaved', floors)
    };
     
/*
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveProgress();
    }, 2 * 60 * 1000); // 2 minutes
    return () => clearInterval(saveInterval);
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem("clickerProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setScore(progress.score);
      setFloors(progress.floors);
    }
  }, []);*/

  useEffect(() => {
    const autoIncrementInterval = setInterval(() => {
      const autoIncrementedGains = floors.reduce((total, floor) => total + floor.autoIncrement, 0);
      setAutoScore(autoScore+autoIncrementedGains);
      //console.log('incremented', autoIncrementedGains);
    }, 500); // Every 0.5 seconds
    return () => clearInterval(autoIncrementInterval);
  }, [floors, autoScore]);



useEffect(() => {
  const now: Date = new Date(); // Current time
  const timeOffline = Math.floor((now.getTime() - new Date(updateTime).getTime()) / 500); // Calculate time offline in 0.5 seconds

  if (timeOffline > 0) {
    const autoIncrementedGainsOffline = floors.reduce((total, floor) => total + floor.autoIncrement, 0) * timeOffline;
    setAutoScore(autoScore + autoIncrementedGainsOffline);
  }
}, [updateTime]);

const depositPassiveIncome = ()=> {
  setScore(score+autoScore);
  setAutoScore(0);}

//console.log(autoScore);

const floorRefs = useRef(floors.map(() => React.createRef<HTMLDivElement>()));

const ClickSoundRef = useRef<HTMLAudioElement | null>(null);
const ClickMusicSoundRef = useRef<HTMLAudioElement | null>(null);


const STANDARD_FLOOR_WIDTH = 3000; // Replace with the actual width of your floors
const STANDARD_FLOOR_HEIGHT = 700; // Replace with the actual height of your floors



  return (
    <Container maxW="container.lg">
      <Text textAlign={'center'} fontSize="2vmax" mb={4}>THE ARMORIES</Text>

      <VStack spacing={4}>
        <Flex justifyContent={'center'} width={'full'} gap={'4vmax'}>
      <Text  color={'green'} fontSize="1vmax">💰 Armory tokens: {score.toFixed(2)}</Text>
      <Text  color={'green'} fontSize="1vmax">💸 Passive income: {(autoScore).toFixed(2)}</Text>  </Flex>
      <Button size={'sm'} fontSize={'1vmax'}  minWidth={'fit-content'} bgColor='black' color="orangered" variant="outline"
              onClick={() => depositPassiveIncome()}
              disabled={autoScore < 0}
            >deposit passive income</Button>
    
    
        {floors.map((floor, index) => {
           if (index <= meltdownStorage ) {
          
           
              // Get the dimensions of the clicked floor
              const floorRect = floorRefs.current[index].current?.getBoundingClientRect();

            return (
              <VStack  boxShadow={'0 0 50px orangered'} justify='space-between' width='full' borderWidth={'0.2vmax'} borderColor={'orangered'} borderRadius='2px' key={index}>
          <HStack padding='0.5vmax'justify='space-between' width='full' borderWidth={'0.2vmax'} borderColor={'orangered'} borderRadius='2px'>
               <Text fontSize="1vmax" fontWeight="bold">
               {floor.name} | Level: {floor.level} 
                </Text>
               

              <Text fontSize="1vmax">
              💰/☝ : {(floor.clickScore).toFixed(2)} </Text>
              <Text fontSize="1vmax">
              💸: {(floor.autoIncrement*2).toFixed(2)} / s
                </Text>
                <Button  fontSize='1vmax' size={'xs'} bgColor='black' color="orangered" variant="outline"
              onClick={() => upgradeAutoIncrement(index)}
              disabled={score < floor.autoIncrementPrice * floor.level}
            >
              🚀 (+{(floor.autoIncrement * 2).toFixed(2)}) ( {(floor.autoIncrementPrice * floor.level).toFixed(0)} )
            </Button>
            </HStack>
   
<Box
  key={index}
  ref={floorRefs.current[index]}
  className={`floor`}
  fontSize={'1vmax'}
  width={'full'}
  color={'white'}
  textAlign={'center'}
  h='11vmax'
  bgImage={`url(${floor.background})`}
  bgSize="100% 100%"
  _hover={{ cursor: 'crosshair' }}
  onClick={(event) => {handleClick(floor.clickScore, event, index); 
    if (ClickSoundRef.current && ClickMusicSoundRef.current) {
      ClickSoundRef.current.currentTime = 0;
      ClickSoundRef.current.play();
      ClickSoundRef.current.currentTime = 0;
      ClickMusicSoundRef.current.play();}}}
     
boxShadow={'0 0 50px orangered'}

> {score>10 || floor.level===1 && ( 'CLICK TO EARN ARMT, UPGRADE TO UNLOCK PASSIVE INCOME')}


<audio ref={ClickMusicSoundRef}>
  <source src={ClickMusic} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

<audio ref={ClickSoundRef}>
 <source src={ClickSound} type="audio/mpeg" />
 Your browser does not support the audio element.
</audio>


{floor.isClicked && floorRect && (
    
     
    <Text
      fontSize={'2vmax'}
      animation="moneybag 2s ease-in-out"
      style={{
        position: 'absolute', // Use absolute positioning
        left: `${floor.clickCoordinates.x}px`,
        top: `${floor.clickCoordinates.y}px`,
        width: '2px',
        height: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifySelf: 'center',
        zIndex:'100',
        boxShadow:'px 0px 15px 30px yellow',
        backgroundColor:'yellow'
      }}
   
    >
      💰
    </Text>
  )}

</Box>
          </VStack>

)}else {
  return (
    <VStack justify='space-between' width='full' borderWidth={'0.2vmax'} borderColor={'orangered'} borderRadius='2px' key={index}>
      <HStack padding='0.5vmax' justify='space-between' width='full' borderWidth={'0.2vmax'} borderColor={'orangered'} borderRadius='2px'>
        <Text fontSize="1vmax" fontWeight="bold">
          LOCATION: ??? | Level: ???
        </Text>
        <Text fontSize="1vmax">
          💰/☝ : ??? 
        </Text>
        <Text fontSize="1vmax">
          💸: ??? / s
        </Text>
        <Button fontSize={'1vmax'} size={'xs'} bgColor='black' color="orangered" variant="outline">
          🚀 MORE MELTDOWNS NEEDED
        </Button>
      </HStack>
      <Box
        key={index}
        className={`floor`}
        width={'full'}
        h='11vmax'
        bgSize="100% 100%"
      ></Box>
    </VStack>
  );
}
})}
    
      <VStack mt={4}>
       

        
<Button boxShadow='0 0 25px orangered' width={'full'} textColor={'black'} variant="outline"  color='orangered' mt={6} fontSize={'1.1vw'}  onClick={() =>{saveProgress()}} hidden={!account} as={Link} to= {datasaved ? '/Rampage/Gameloader':''} >
  SAVE AND EXIT
</Button>
      </VStack>
      </VStack>
    </Container>
  );
};

export default ClickerGame;
