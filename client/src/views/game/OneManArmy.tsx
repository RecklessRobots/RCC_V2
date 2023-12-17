/*eslint-disable*/
import { VStack, Heading, Button, Box,  Tag, Flex, Spacer, Text, Alert, Table, Thead, Tbody, Tr, Th, Td, Collapse, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, TagLabel, Avatar  } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis';
import { HStack} from '@chakra-ui/react';
import player from "./player.png";
import enemy from "./enemy.png";
import React, { useState, useRef } from "react";
import "./Game.css";
import NftGridG  from  '../../components/NFTGridG';
import Swords from './Swords.png';
import miniguns from './Miniguns.png';
import missiles from './Missilesystem.png';
import Star from './StarGlow.png';
import Melee from './Melee.png';
import chooseLegend from './chooseLegend.png';
import Moralis from 'moralis-v1';
import RampageInfo from './RampageInfo';
import GAMEOVER from './GAMEOVER.gif';
import Audio from './GameAudio';
import GunsSound from './Guns.wav';
import MissileSound from './Missile2.wav';
import LaserSound from './Lasers.wav';
import HealthSound from './HealthAdd.wav';
import MeleeSound from './melee1.wav';
import MissilesExp from './MissilesExp.mp4';
import HealthExp from './HealthExp.mp4';
import GunsExp from './GunsExp2.mp4';
import MeleeExp from './MeleeExp.mp4';
import WinnerExp from './WinnerExp.mp4';
import SkillPic from './Skill.png';
import HealthPic from './health.png';
import ExpPic from './exp.png';
import TokensPic from './tokens.png'
import LaserExp2 from './LaserExp2.mp4';
import RR from './RR.png';
import NFTGridEB from '../../components/NFTGridEB';
import TopHighScores from './PlayerScores';
import Hearts from './hearts';
import Meltdowns from './meltdowns'
import Timer from '../tournamentTimer';
import Frame from './frame.png' 
import Healthbar from './frame1.png' 






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

interface NftProps {
  name: string;
  metadata: {
    image?: string;
    attributes: { trait_type: string; value: string | number }[];
  };
  address: string;
  id: string;
  type: string;
}



enum AttackType {
  Melee="Melee",
  RayOfDeath = "Ray Of Death",
  Missiles = "Missiles",
  Miniguns = "Miniguns",
  repairModule= "Repair Module",
  Reloading = "Reloading"
}


const AppGCrofam = () => 

{ 
  const { account } = useMoralis();
 
  const [TokenData, setTokenData]=useState(5);
  const [Tokens, setTokens]=useState(5);

// console.log('AppGCrofam reloaded');
  
    /*
  const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xf96ec7C11D311920833753FAB9b174B6FD53517E&address="
  const url2= account
  const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
  
  useEffect(() => {
    const GettingData = async () => {
    const response = await fetch(url1+url2+url3);
    const json = await response.json();
//console.log(json);
      
   if (json.result !== "Error! Invalid address format" )
   { setTokenData(json.result);}
    }
    GettingData();
  }, [Tokens, account]);

 */
/*
useEffect(() => {

  const SettingData = async () => {
  
    if (account && address){

  // Query the previous Tokens of the user
 if (address){
  const query = await new Moralis.Query(RampageOneManArmy_R3);
  await query.equalTo('player', address);
 
  try {
    const previousTokenObject = await query.first();
  
    if (previousTokenObject) {
      // Compare the new Tokens with the previous Tokens
      const previousTokens = await previousTokenObject.get('tokens');
    // console.log(previousTokens)
       
      if (TokenData > previousTokens) {
        // Save the new Tokens if it's higher
        setTokens(previousTokens);
      
       // previousTokenObject.set('tokens', Tokens);
       // await previousTokenObject.save();
       
       // console.log('tokens after saving previoustokens to Tokens:', previousTokens);
      }
       else  {
        setTokens(Number(TokenData));
        //console.log('tokens after saving TokenData to Tokens:', TokenData);
      }
       
    } else {
      setTokens(TokenData);
   
      // Save the score if it's the first score for the user
      const newScoreObject = new RampageOneManArmy_R3();
      newScoreObject.set('player', address);
      newScoreObject.set('tokens', Number(TokenData));
      newScoreObject.set('exp', 0);
      newScoreObject.set('score', 0);
      await newScoreObject.save();
      //console.log('First Tokens saved:', Number(TokenData))
    }

  } catch (error) {
    console.error('Error querying or saving score:', error);
  };}}}
  
SettingData();

}, [TokenData ])
*/

/*
      const fetchTokenData2 = async () => {
       
        const response = await fetch(url1+url2+url3);
        const json = await response.json();

        localStorage.setItem('Tokens',json.result)
        setTokens(json.result);
      //console.log(json.result);}
      fetchTokenData2();

     

 

  useEffect(() => {
    setTokens(Number(tokens));
  
 
  }, [tokens])
  
  */
  const EnemyTeam = localStorage.getItem('enemyTeam');
  
  const StoredEnemyTeamsData = localStorage.getItem('enemyTeams');
  
  const ParsedEnemyData = StoredEnemyTeamsData ? JSON.parse(StoredEnemyTeamsData) : null;
 // console.log(ParsedEnemyData);
  
  const enemyTeamFind = ParsedEnemyData ? ParsedEnemyData.find((team: any) => team.name === EnemyTeam) : null;
 // console.log(enemyTeamFind);

  const enemyIpfs = enemyTeamFind.ipfs;
 //console.log(enemyIpfs);
 const enemyContract=enemyTeamFind.contract;
//console.log(enemyContract);
const RTVIPdata1 = localStorage.getItem('ebvips');
let RTVIPdata: string[] = []; // Specify the type as an array of strings

if (RTVIPdata1) {
  try {
    RTVIPdata = JSON.parse(RTVIPdata1);
   // console.log(RTVIPdata);
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
  }
} else {
 // console.log('No data found in localStorage.');
}

const Team = localStorage.getItem('playerTeam');

const StoredPlayerTeamsData = localStorage.getItem('playerTeams');

const ParsedPlayerData = StoredPlayerTeamsData ? JSON.parse(StoredPlayerTeamsData) : null;


const playerTeamFind = ParsedPlayerData?.find((team: any) => team.name === Team);


const playerIpfs = playerTeamFind?.ipfs; 

const playerJsonIpfs =playerTeamFind?.json;
const PlayerTeamIcon=playerTeamFind?.icon;


// ADD HERE THE LOGIC OF BRINGING other useful team data
  useEffect(() => {
    const gameDiv = document.getElementById('stage');
    if (gameDiv) {
      gameDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exp1, setExp1] = useState(0);
  const [TeamScore, setTeamScore] = useState(Number);
  const address=String(account);
  const [Score, setScore] = useState<number>(1);
 
  const [LegendFromStorage, setLegendFromStorage] = useState('');
  const paddedLegendFromStorage = LegendFromStorage?.toString().padStart(4, '0');
  const [battleOutcome, setBattleOutcome] = useState<React.ReactNode>(null);
 const [selectedEnemy, setSelectedEnemy] = useState<string>('');



  if (LegendFromStorage !== '' && Team === "Legends") {
  fetch(playerJsonIpfs+LegendFromStorage+'.json')
  .then(response => response.json())
  .then(TokenData => {
    localStorage.setItem('TokenData', JSON.stringify(TokenData));
  })
  .catch(error => console.error(error));
 // const TokenData:any = localStorage.getItem('TokenData');
  //const ParsedTokenData=JSON.parse(TokenData);
 
}

 

 useEffect(() => {
  
  const GettingData = async () => {
    if (address){
      const NFTimage = localStorage?.getItem('NFTimage');
      const SelectedTeam = String(NFTimage)===''||String(NFTimage)===null ? chooseLegend : NFTimage;
       /* Team === 'Legends'
          ? paddedLegendFromStorage !== null
            ? (paddedLegendFromStorage === '0000' || LegendFromStorage === '')
              ? chooseLegend
              : playerIpfs + paddedLegendFromStorage + '.png'.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')
            : ''
          : (Team === "CorgiClub" || Team === 'SpaceCRXillions'|| Team === 'MOA' ) && NFTimage !== null
          ? NFTimage
          : LegendFromStorage !== null
          ? (LegendFromStorage === '0000' || LegendFromStorage === '')
            ? chooseLegend
            : playerIpfs + LegendFromStorage + '.png'.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')
          : ''
      );
*/
    // Query the previous score of the user
    const query = new Moralis.Query(RampageOneManArmy_R3);
     await query.equalTo('player', address);
    
    try {
      const previousScoreObject = await query.first();
      
      if (previousScoreObject) {
        // Compare the new score with the previous score
        const previousScore = previousScoreObject.get('score');
        if (SelectedTeam){
          previousScoreObject.set('team', SelectedTeam)}
        localStorage.setItem('previousScore', previousScore);
        if (previousScore>0)
        setScore(previousScore);
        else {
          setScore(1);
        }
         
        
      } else {/*
        // Save the score if it's the first score for the user
        const newScoreObject = new RampageOneManArmy_R3();
        newScoreObject.set('player', address);
        newScoreObject.set('score', Score);
        await newScoreObject.save();
        setScore(Score+1-1);*/
      }
    } catch (error) {
      console.error('Error querying or saving score:', error);
    }
  
 
  
   }else 
   return 
     <Alert>Sign in and reload</Alert>}
   GettingData();
 
 }, [account, LegendFromStorage])
 
 

//console.log(TeamScore);
useEffect(() => {
    const SettingTeamScore = async () => {
      // Query the previous score of the team
      const query = await new Moralis.Query(Rampage_1MATeams);
      await query.equalTo('TeamScores', 'Round 2');
  
      try {
        const previousTeamObject = await query.first();

        if (!previousTeamObject) {
          // Save the exp if it's the first exp for the user
          const newTeamObject = new Rampage_1MATeams();
          newTeamObject.set('TeamScores', 'Round 2');
          newTeamObject.set(String(Team), 0);
          
        newTeamObject.set('Player', {
          [String(address)]:{ [String(Team)]: { Score: TeamScore }}
         });
          await newTeamObject.save();
          //console.log('new score object created');
        }

        if (previousTeamObject) {
          // Compare the new exp with the previous exp
          const previousTeamScore = await previousTeamObject.get(String(Team));
  
          if (TeamScore === 0) {
            if (previousTeamScore !== undefined) {
              setTeamScore(previousTeamScore);}}
  
          
              if (TeamScore) {
       
                if (previousTeamScore === undefined || TeamScore > previousTeamScore) {
                    // Save the new score if it's higher or if previousExp is undefined
        
      
                    // Save the new score if it's higher or if previousExp is undefined
                    const currentData = previousTeamObject.get('Player') || {}; // Retrieve the current data or an empty object
                    currentData[String(address)] = currentData[String(address)] || {}; // Create an object for the address if it doesn't exist
                    
                    // Increment the Score for a specific address and team
                    currentData[String(address)][String(Team)] = {
                      Score: (currentData[String(address)][String(Team)]?.Score || 0) + 1,
                    };
                    
                    previousTeamObject.set('Player', currentData);
                    previousTeamObject.set(String(Team), TeamScore);
                  /*
                    previousTeamObject.set('Player', {
                     [String(address)]:{ [String(Team)]: { Score: TeamScore }}
                    });*/
    
                    await previousTeamObject.save();
                   // console.log('previous saved');
                  }
                   
               
            else {
              setTeamScore(previousTeamScore);

            }
          }


        } 
      } catch (error) {
        console.error('Error querying or saving team score:', error);
      }
    };
  
    SettingTeamScore();
   
  }, [Team, TeamScore]);
  
  
  //console.log(TeamScore);

useEffect(() => {
  const SettingExp = async () => {
    // Query the previous score of the user
    const query = await new Moralis.Query(RampageOneManArmy_R3);
    await query.equalTo('player', address);

    try {
      const previousExpObject = await query.first();

      if (previousExpObject) {
        // Compare the new exp with the previous exp
        const previousExp = await previousExpObject.get('exp');

        if (exp1 === 0) {
          if (previousExp !== undefined) {
            setExp1(previousExp);}}

        if (exp1 > 0) {
          if (previousExp === undefined || exp1 > previousExp) {
            // Save the new score if it's higher or if previousExp is undefined
            previousExpObject.set('exp', exp1);
            //console.log(exp1);
            await previousExpObject.save();
            setExp1(exp1);
          } else {
            setExp1(previousExp);
          }
        }
      } else {/*
        // Save the exp if it's the first exp for the user
        const newExpObject = new RampageOneManArmy_R3();
        newExpObject.set('player', address);
        newExpObject.set('exp', 0);
        setExp1(0);
        await newExpObject.save();*/
      }
    } catch (error) {
      console.error('Error querying or saving exp:', error);
    }
  };

  SettingExp();
}, [Score, exp1, address]);



useEffect(() => {

  const SettingData = async () => {
  
   
  // Query the previous score of the user
 
  const query = await new Moralis.Query(RampageOneManArmy_R3);
  await query.equalTo('player', address);
  
  try {
    const previousScoreObject = await query.first();
  
    if (previousScoreObject) {
      // Compare the new score with the previous score
      const previousScore = await previousScoreObject.get('score');
     
    
      if (Score>1){
      if (Score > previousScore) {
        // Save the new score if it's higher
        previousScoreObject.set('score', Score);
        await previousScoreObject.save();
        setScore(Score);
      } else  {
        await previousScoreObject.set('score', Score);
        await previousScoreObject.save();
       // console.log('Stage:', Score);
      }
       
       
      }
    } else {/*
      // Save the score if it's the first score for the user
      const newScoreObject = new RampageOneManArmy_R3();
      newScoreObject.set('player', address);
      newScoreObject.set('score', Score);
      await newScoreObject.save();
     // console.log('First score saved:', Score);*/
    }

  } catch (error) {
    console.error('Error querying or saving score:', error);
  };}
  
SettingData();

}, [Score || account || address ])


  
useEffect(() => {

  if (!address){
  location.href='./GameLoader';}
  
}, [])




    
  const [armour, setArmour] = useState('');
  const [headGear, setHeadGear] = useState(''); 
  const [backGear, setBackGear] = useState(''); 
  const [frontGear, setFrontGear] = useState(''); 
  const [glow, setGlow] = useState(''); 
  const [battleFlag, setBattleFlag] = useState(''); 
  const [classType, setClassType] = useState(''); 
  const [background, setBackground] = useState(''); 




const Character = (props: { name: string; image: string; attack: AttackType; isAttacking: boolean; healthLost: number, EnemyAttackType: AttackType, MeltdownsStorage: number, Tokens:number, playerHealth:number; }) => {
 
 



  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  const [searchChain, setSearchChain] = useState<string>('0x19');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xf96ec7C11D311920833753FAB9b174B6FD53517E'];
  useEffect(() => {
 
  const LegendFromStorage1 = localStorage.getItem('StoredLegend') || '';
  setLegendFromStorage(LegendFromStorage1);
  const paddedLegendFromStorage = LegendFromStorage1?.toString().padStart(4, '0');
    const TokenData1:any = localStorage.getItem('TokenData');
    const ParsedTokenData=JSON.parse(TokenData1);
    

  let classType:string, background:string, battleFlag:string, armour:string, headGear:string, backGear:string, glow:string, frontGear:string;
if (ParsedTokenData) {
for (let attribute of ParsedTokenData.attributes) {
  switch(attribute.trait_type) {
    case 'Class':
      setClassType(attribute.value);
      break;
    case 'Background':
      setBackground(attribute.value);
      break;
    case 'BattleFlag':
      setBattleFlag(attribute.value);
      break;
    case 'Armour':
      setArmour(attribute.value);
      break;
    case 'HeadGear':
      setHeadGear(attribute.value);
      break;
      case 'BackGear':
      setBackGear(attribute.value);
      break;
      case 'Glow':
        setGlow(attribute.value);
        break;
        case 'FrontGear':
          setFrontGear(attribute.value);
          break;
    default:
     setBattleFlag('None');
      setArmour('None');
      setHeadGear('None');
      setBackGear('None');
      setGlow('None');
      setFrontGear('None');

      break;
  }
}}
},[] );


 







const videoRef = useRef<HTMLVideoElement | null>(null);
const [videoEnded, setVideoEnded] = useState(false);
const videoElement = videoRef.current;






useEffect(() => {

    
  if (videoElement) {
    // console.log('this is running');
     // Pause and reset the video
     videoElement.pause();
     videoElement.currentTime = 0;
 
     // Conditionally set the video source based on props.attackType
     if (props.EnemyAttackType === 'Missiles') {
       videoElement.src = MissilesExp;} 

   if (props.EnemyAttackType === AttackType.RayOfDeath) {
     videoElement.src = LaserExp2;}
     
     if (props.EnemyAttackType === 'Miniguns') {
       videoElement.src = GunsExp;}

   if (props.EnemyAttackType === 'Melee') {
   videoElement.src = MeleeExp; }
   
   if (props.EnemyAttackType === AttackType.repairModule) {
     videoElement.src = HealthExp; }
  else {
       // Default source if none of the conditions match
       if (props.EnemyAttackType === 'Missiles') {
         videoElement.src = MissilesExp;} 
 
     if (props.EnemyAttackType === AttackType.RayOfDeath) {
       videoElement.src = LaserExp2;}
       
       if (props.EnemyAttackType === 'Miniguns') {
         videoElement.src = GunsExp;}
 
     if (props.EnemyAttackType === 'Melee') {
     videoElement.src = MeleeExp;
   

   
   
   }

  
     
     if (props.attack === AttackType.repairModule) {
       videoElement.src = HealthExp; }
      
     }
   
     // Start playing the video
    
   
       const playPromise = videoElement.play();
     
     playPromise.catch((error) => {
       console.error("Video play error:", error);
     
     });
  

     // Set up a timeout to unmute the video after a delay (e.g., 100ms)
     const unmuteTimeout = setTimeout(() => {
       videoElement.muted = false;
       videoElement.volume = 0.5;
     }, 100);
 
     
     return () => {
       // Clean up video playback and the timeout when the component is unmounted
       videoElement.pause();
       videoElement.currentTime = 0;
       clearTimeout(unmuteTimeout);
     };
   }

 },);

 const handleVideoEnded = () => {

  setVideoEnded(true);
   
   // Set the videoEnded state to true when the video ends
  // console.log('video ended running');
 };

 const handleVideoStart = () => {
  
   setTimeout(() => {

     if (videoRef.current) {
     videoRef.current.muted = false;
     videoRef.current.volume = 0.5;
   }}, 100);};


   const health1=props.playerHealth;
    
  const getHealthColor = (health:any) => {
    if (health > 75) return 'green !important';
    if (health > 50) return 'yellow !important';
    if (health > 25) return 'orange !important';
    return 'red !important';
  };

const NFTimage1=localStorage.getItem('NFTimage');
const NFTimage=NFTimage1?.replace('ipfs://', 'https://ipfs.io/ipfs/') ?NFTimage1?.replace('ipfs://', 'https://ipfs.io/ipfs/') :chooseLegend;
//console.log('NFTimage:',NFTimage);
//console.log(String(NFTimage!).replace('ipfs://', 'https://ipfs.io/ipfs/'));

//Team!=='MOA'? localStorage?.getItem('NFTimage'): localStorage.getItem('NFTimage')!==null ? localStorage.getItem('NFTimage')!.replace('https://bhfiles.mypinata.cloud/ipfs/','https://ipfs.io/ipfs/'):(localStorage.getItem('NFTimage')) ;
//console.log(LegendFromStorage);
return (
  <VStack>
  <div style={{ width: '100%' }} className={`character ${props.isAttacking ? 'attacking' : ''}`}>
    <h3>{Team}</h3>
    <div style={{ position: 'relative' }}>
    <Box  boxShadow={ `0px 0px 5px 3px ${getHealthColor(props.playerHealth)}`} overflow={'visible'}  position="absolute"  left={'1'} bottom='1' width="10vmin" height="10vmin" borderRadius="full" bgImage={`url(${Healthbar})`} backgroundSize="cover">
  <Text 
  fontFamily={'DSEG7'} 
  fontSize="1vmax" 
  color={getHealthColor(props.playerHealth)} 
  textShadow={`5px 5px 5px ${getHealthColor(props.playerHealth)}`}
  position="absolute" 
  top="50%" 
  left="50%" 
  transform="translate(-50%, -50%)"
>
  {props.playerHealth.toFixed(0)}
</Text>
</Box>
      <img
       className={props.healthLost > 0 ? 'health-lost' : props.MeltdownsStorage>4 ? 'fire' :''}
        width='fit-content'
        height="auto"
        src={ String(NFTimage)===''||String(NFTimage)===null ? chooseLegend : NFTimage}
         /* Team === 'Legends'
          ? paddedLegendFromStorage !== null && paddedLegendFromStorage !== '' && paddedLegendFromStorage !== '0000'
            ? playerIpfs + paddedLegendFromStorage + '.png'.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')
            : chooseLegend
          : 
            (Team === "CorgiClub" || Team === 'SpaceCRXillions' || Team === 'MOA') &&
           NFTimage !== null
          ? NFTimage
          : LegendFromStorage !== null && LegendFromStorage !== ''
          ? playerIpfs + LegendFromStorage + '.png'.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')
          : chooseLegend

        }*/
      />
         <Box fontSize={'1vmax'} style={{
    opacity: 0.5, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,}}>
      <Meltdowns tokens={props.MeltdownsStorage}/>
      </Box>
       {props.healthLost > 0 && (
   
      <div id='healthtext' className="BlastNumbers animate">
        <p className="BlastNumbers animate">
          -{props.healthLost.toFixed(0)}
        </p>
      </div>
   

        )}

         {props.healthLost === 0 && props.EnemyAttackType !== 'Reloading' && (
   <div className="BlastNumbers animate">
   <p
     id='healthtext'
  
  
   
   >
     MISS
   </p>
 </div>
)
}

           {props.healthLost > 0 && props.EnemyAttackType === "Missiles"  &&  (
           <video autoPlay playsInline  muted   ref={videoRef} src={MissilesExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded}  />
          )}

{props.healthLost > 0 && props.EnemyAttackType === "Miniguns"  && (
           <video autoPlay playsInline  muted   ref={videoRef} src={GunsExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded}  />
          )}
 
          
{props.healthLost > 0 && props.EnemyAttackType === "Ray Of Death"  && (
           <video autoPlay playsInline  muted   ref={videoRef} src={LaserExp2}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded} />
          )}

{props.healthLost > 0 && props.EnemyAttackType === "Melee"  && (
           <video autoPlay playsInline  muted   ref={videoRef} src={MeleeExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}  onPlay={handleVideoStart}  />
          )}
           {props.attack === 'Repair Module' && (
            <>
        <div   className="BlastNumbers2 animate">
        <video autoPlay playsInline  muted   ref={videoRef} src={HealthExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
        top: 0,
        left: 0,
        width:'fit-content',
        height:"auto",
        pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
      // Specify the animation name and duration
       }}   onPlay={handleVideoStart} onEnded={handleVideoEnded}/> <p id='healthtext2' 
      
   >
     +50
   </p></div></>




      
 
      )}
       {lost && !win && (
        
        <img
          src={GAMEOVER} // Replace with the actual path to your GIF
          alt="gif-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
            animation: 'fadeIn 1s ease-in-out forwards', // Specify the animation name and duration
          }}
        />
      
 
      )}

{win && (
        
        <video autoPlay playsInline  muted   ref={videoRef} src={WinnerExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
        top: 0,
        left: 0,
        width:'fit-content',
        height:"auto",
        pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
      // Specify the animation name and duration
       }}   />
      
 
      )}
   
    </div>
    <Hearts tokens1={props.Tokens}/>

 
  </div>
  </VStack>
);
};




const imageUrls1 = localStorage.getItem('enemyTeamsPics');
  const imageUrls = JSON.parse(imageUrls1!);
  
  function getRandomNumber() {
    return Math.floor(Math.random() * 2000); // Generates a number from 0 to 3000
  }

  function getRandomNumberL() {
    return Math.floor(Math.random() * 400); // Generates a number from 0 to 3000
  }
  
  const randomNum=getRandomNumber();
  const randomNumL=getRandomNumberL();

 

  

const EnemyCharacter = (props: { name: string; image: string; attack: AttackType; isAttacking: boolean; healthLost: number, playerAttackType: AttackType; EnemyHeldModules:number; computerHealth:number }) => {
  const [EnemyImage, setEnemyImage] = useState(String);
  const [LegendsEnemyImage, setLegendsEnemyImage] = useState(String);
  let enemypic: string | null | undefined= null;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoElement = videoRef.current;
 
 
 
  useEffect(() => {
    setLegendsEnemyImage(imageUrls[randomNumL]);
    setEnemyImage(imageUrls[randomNum]);
  }, [])
  
   
  

  
 
 
 
  useEffect(() => {
   
   
    
    if (videoElement) {
     // console.log('this is running');
      // Pause and reset the video
      videoElement.pause();
      videoElement.currentTime = 0;
  
      // Conditionally set the video source based on props.attackType
      if (props.playerAttackType === 'Missiles') {
        videoElement.src = MissilesExp;} 

    if (props.playerAttackType === AttackType.RayOfDeath) {
      videoElement.src = LaserExp2;}
      
      if (props.playerAttackType === 'Miniguns') {
        videoElement.src = GunsExp;}

    if (props.playerAttackType === 'Melee') {
    videoElement.src = MeleeExp; }
    
    if (props.playerAttackType === AttackType.repairModule) {
      videoElement.src = HealthExp; }
   else {
        // Default source if none of the conditions match
        if (props.playerAttackType === 'Missiles') {
          videoElement.src = MissilesExp;} 
  
      if (props.playerAttackType === AttackType.RayOfDeath) {
        videoElement.src = LaserExp2;}
        
        if (props.playerAttackType === 'Miniguns') {
          videoElement.src = GunsExp;}
  
      if (props.playerAttackType === 'Melee') {
      videoElement.src = MeleeExp;
    

    
    
    }

   
      
      if (props.attack === AttackType.repairModule) {
        videoElement.src = HealthExp; }
       
      }
    
      // Start playing the video
     
    
        const playPromise = videoElement.play();
      
      playPromise.catch((error) => {
        console.error("Video play error:", error);
      
      });
   

      // Set up a timeout to unmute the video after a delay (e.g., 100ms)
      const unmuteTimeout = setTimeout(() => {
        videoElement.muted = false;
        videoElement.volume = 0.5;
      }, 100);
  
      
      return () => {
        // Clean up video playback and the timeout when the component is unmounted
        videoElement.pause();
        videoElement.currentTime = 0;
        clearTimeout(unmuteTimeout);
      };
    }

  },);

  const handleVideoEnded = () => {
 
   // setVideoEnded(true);
    
    // Set the videoEnded state to true when the video ends
   // console.log('video ended running');
  };

  const handleVideoStart = () => {
   
    setTimeout(() => {

      if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
    }}, 100);};
    
   const health1=props.computerHealth;
    
  const getHealthColor = (health:any) => {
    if (health > 75) return 'green !important';
    if (health > 50) return 'yellow !important';
    if (health > 25) return 'orange !important';
    return 'red !important';
  };

 
    /*
  if (EnemyTeam === 'Legends') {

    enemypic = localStorage.getItem('EnemyPic')?.padStart(4, '0');
  } else {
    enemypic = String(parseInt(String(localStorage.getItem('EnemyPic')), 10));;
  }
*/



 // console.log(EnemyTeam, enemyIpfs);
 
 //console.log(props.healthLost, "healthlost", props.playerAttackType, "player attacktype", String(videoEnded),':video ended');
  return (
    <div className={`character ${props.isAttacking ? 'attacking' : ''}`}>
      <h3>{EnemyTeam}</h3>

      {LegendsEnemyImage !== null && (
        <div style={{ position: 'relative' }}>
        <Box  boxShadow={ `0px 0px 5px 3px ${getHealthColor(props.computerHealth)}`} overflow={'visible'}  position="absolute"  left={'1'} bottom='1' width="10vmin" height="10vmin" borderRadius="full" bgImage={`url(${Healthbar})`} backgroundSize="cover">
  <Text 
  fontFamily={'DSEG7'} 
  fontSize="1vmax" 
  color={getHealthColor(props.computerHealth)} 
  textShadow={`5px 5px 5px ${getHealthColor(props.computerHealth)}`}
  position="absolute" 
  top="50%" 
  left="50%" 
  transform="translate(-50%, -50%)"
>
  {props.computerHealth.toFixed(0)}
</Text>
</Box>
        <img
  className={props.healthLost > 0 ? 'health-lost' : 'somename'}
  width="100%"
  height="auto"

  src={imageUrls[randomNumL]}
  //{EnemyTeam === 'Legends' || EnemyTeam === 'Wyverns'? LegendsEnemyImage : EnemyImage}
/>

             {props.healthLost === 0 && props.playerAttackType !== 'Reloading' && (
  <div className="BlastNumbers animate">
    <p
      id='healthtext'
  
    >
      MISS
    </p>
  </div>
)}

          {props.healthLost > 0 && props.playerAttackType === "Missiles"  && (
            <>
      <div id='healthtext' className="BlastNumbers animate">
        <p className="BlastNumbers animate">
          -{props.healthLost.toFixed(0)}
        </p>
      </div>
   
          <div>
          <video autoPlay playsInline  muted ref={videoRef} src={MissilesExp} style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded}/></div></>
          )} 


{props.healthLost > 0 && props.playerAttackType === AttackType.RayOfDeath  && (
  <>
            <div id='healthtext'  className="BlastNumbers animate">
            <p  className="BlastNumbers animate" >
              -{props.healthLost.toFixed(0)}
            </p></div>
          <div>
           <video autoPlay playsInline  muted   ref={videoRef} src={LaserExp2}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded} /></div></>
          )}
{props.healthLost > 0 && props.playerAttackType === "Miniguns"  && (
             <>
             <div id='healthtext'  className="BlastNumbers animate">
             <p  className="BlastNumbers animate" >
               -{props.healthLost.toFixed(0)}
             </p></div>
           <div>
           <video autoPlay playsInline  muted ref={videoRef}  src={GunsExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}    onPlay={handleVideoStart} onEnded={handleVideoEnded}  /></div></>
          )}

{props.healthLost > 0 && props.playerAttackType === "Melee"  && (
             <>
             <div id='healthtext'  className="BlastNumbers animate">
             <p  className="BlastNumbers animate" >
               -{props.healthLost.toFixed(0)}
             </p></div>
           <div>
           <video autoPlay playsInline  muted  ref={videoRef} src={MeleeExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
           top: 0,
           left: 0,
           width:'fit-content',
           height:"auto",
           pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
         // Specify the animation name and duration
          }}   onPlay={handleVideoStart} onEnded={handleVideoEnded}  /></div></>
          )}
           
           {props.attack === 'Repair Module' && props.EnemyHeldModules>0 && (
<>
         <div className="BlastNumbers2 animate">
        <video autoPlay playsInline  muted  ref={videoRef}  src={HealthExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
        top: 0,
        left: 20,
        width:'fit-content',
        height:"auto",
        pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
      // Specify the animation name and duration
       }}  onPlay={handleVideoStart} onEnded={handleVideoEnded}  /><p id='healthtext2'
      
   >
     +50
   </p></div></>

      
 
      )}
           {win && (
        
        <img
          src={GAMEOVER} // Replace with the actual path to your GIF
          alt="gif-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
            animation: 'fadeIn 1s ease-in-out forwards', // Specify the animation name and duration
          }}
        />
      
 
      )}

{!win && lost &&(
        
        <video autoPlay playsInline  muted  ref={videoRef}  src={WinnerExp}  style={{
    opacity: 0.35, // Adjust the opacity value
    filter: 'brightness(2)',   position: 'absolute',
        top: 0,
        left: 0,
        width:'fit-content',
        height:"auto",
        pointerEvents: 'none', // Ensure the GIF doesn't interfere with interactions
      // Specify the animation name and duration
       }}   />
      
 
      )}
      
        </div>
      )}
  <Text textAlign={'center'}>💀</Text>
    </div>
  );
};

const storedLegendData:any = localStorage.getItem('LegendsData') ?? '[]';
const data=JSON.parse(storedLegendData);
const NumberOfLegends = data.result ? data.result.length : 0;




const [lost, setLost]=useState(false);
const [win, setWin]=useState(false);
const [Remcomphealth, setRemcomphealth]=useState(0)
const [gameOver, setGameOver] = useState(true);
//console.log(win);
//console.log(lost);
 const Game = () => {
  //console.log(win);
//console.log(lost);
 
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  const [searchChain, setSearchChain] = useState<string>('0x19');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xf96ec7C11D311920833753FAB9b174B6FD53517E'];

  const [data1, setData1]:any = useState();
  
  const [data2, setData2] = useState(0);
  const [newData1,setnewData1]= useState(0);
  const [winsRating, setwinsRating] = useState(0);
  

 const previousScore=localStorage.getItem('previousScore');
 const [Skill, setSkill]=useState(0);
 const [Lasers, setLasers]=useState(0);
 const [AttackRating,setAttackRating]=useState(0)
 const [HealthMultiply, setHealthMultiply]=useState(0);

 const [LasersStorage, setLasersStorage]=useState(0);
 const [SkillsStorage, setSkillsStorage]=useState(0);
 const [AttackStorage, setAttackStorage]=useState(0);
 const [HealthStorage, setHealthStorage]=useState(0);
 const [HealthLevelStorage, setHealthLevelStorage]=useState(0);
 const [MeltdownsStorage, setMeltdownsStorage]=useState(0);
 const [RepairModulesStorage,  setRepairModulesStorage]=useState(0);


 
 useEffect(() => {
   const GettingCharacterData = async () => {
     if (account && address) {
       // Query the previous Tokens of the user
       const query = await new Moralis.Query(RampageOneManArmy_R3);
       await query.equalTo('player', address);
 
       try {
         const previousCharacterObject = await query.first();
 
         if (previousCharacterObject) {
           // Compare the new Tokens with the previous Tokens
           const skillAddon = await previousCharacterObject.get('skillLevel') ;
           const attackAddon = await previousCharacterObject.get('attackLevel');
           const lasersAddon = await previousCharacterObject.get('lasersLevel');
           const HealthAddon = await previousCharacterObject.get('legendsAmount');
           const HealthLevelAddon = await previousCharacterObject.get('healthLevel');
           const MeltdownsAddon = await previousCharacterObject.get('Meltdowns');
           const RepairModulesAddon = await previousCharacterObject.get('repairmodules');

          // //console.log('skill: ', skillAddon, 'attack: ', attackAddon, 'added lasers : ', lasersAddon);
           setLasersStorage(lasersAddon);
           setSkillsStorage(skillAddon);
           setAttackStorage(attackAddon);
           setHealthStorage(HealthAddon);
           setHealthLevelStorage(HealthLevelAddon);
           setMeltdownsStorage(MeltdownsAddon);
           setRepairModulesStorage(RepairModulesAddon);
      
         } else {
           console.log('requirements not met for skills, lasers, and attack addons:');
         }
       } catch (error) {
         console.error('Error querying or saving score:', error);
       }
     }
   };
 
   GettingCharacterData();
 
 }, [Score]);



 
 useEffect(() => {
  setSkill(SkillsStorage);
  setLasers(LasersStorage);
  setAttackRating(AttackStorage);
  setPlayerHealth((((80 + (TokenData*2 * 10))*(HealthLevelStorage>0 ? HealthLevelStorage : 1))));
  
  
}, [SkillsStorage])



  
  
  useEffect(() => {
    localStorage.setItem("Tokens", String(Tokens))
 }, [Tokens]);


  const storedLegendData:any = localStorage.getItem('LegendsData') ?? '[]';
  const data=JSON.parse(storedLegendData);

  const TokenData2:any = localStorage.getItem('TokenData');
  const ParsedTokenData=JSON.parse(TokenData2);
 
const [StatsScore,setStatsScore]=useState(Score*1.5);
  const [playerAttack, setPlayerAttack] = useState<AttackType>(AttackType.Reloading);
const [computerAttack, setComputerAttack] = useState<AttackType>(AttackType.Reloading);
const TokensOrg=Tokens;
const [playerHealth, setPlayerHealth] = useState(0);


const [isAttacking, setIsAttacking] = useState(false);


const [gameOverMessage, setgameOverMessage] = useState("");
const [playerHealthLost, setPlayerHealthLost] = useState(0);
const [computerHealthLost, setComputerHealthLost] = useState(0);
const [HeldModules, setHeldModules] = useState(0);


const [EnemySkill, setEnemySkill] = useState(0.4 + ((StatsScore || 1) * 0.01));
const [EnemyHeldModules, setEnemyHeldModules] = useState(((StatsScore || 1) / 4));

const [computerHealth, setComputerHealth] = useState(0);


useEffect(() => {
if (!win && Remcomphealth>0){
setComputerHealth(Remcomphealth);} 

}, [lost]);


useEffect(() => {
  if (win){
    setComputerHealth((100 + ((StatsScore || 1) * (Math.random() * 4 + 8))));}

  }, [win]);
  
useEffect(() => {
  if (Remcomphealth===0){
    setComputerHealth((100 + ((StatsScore || 1) * (Math.random() * 4 + 8))));}

  }, [win]);
/*
useEffect(() => {
  setStatsScore(EnemyScore);
  setComputerHealth(100 + ((90 + (ChosenEnemyHealth * 10))));
  setEnemyHeldModules(3);
  setEnemySkill(0.5 + ((EnemyScore || 1) * 0.015));
}, [ChosenEnemyHealth, EnemyScore]);
*/
  useEffect(() => {
   // if (battleFlag && battleFlag.startsWith("Battle")) {
      setHeldModules(RepairModulesStorage);
    //}
   
    /*
    else 
      setHeldModules(1);
  */
  }, [RepairModulesStorage]);


  
  useEffect(() => {
    if ((headGear && headGear.includes("Skull"))||headGear.includes('Laser') ){
      setLasers(LasersStorage+1);
    }
  }, [headGear]);

   
  


 
  
 useEffect(() => {
    if (armour && armour.includes("Camo")) {
      setSkill(Skill+0.1);
    }
    else {
      setSkill(Skill);
    } 
  }, [armour]);
  console.log(paddedLegendFromStorage);
  /*
  useEffect(() => {
    if (paddedLegendFromStorage === "0000") {setPlayerHealth(1)
    }
  else {
    setPlayerHealth(((80 + (TokenData*2 * 10))*(HealthLevelStorage>0 ? HealthLevelStorage : 1)));
  }
  }, [gameOver]);*/

 // const [minPlayerAttack, setMinPlayerAttack] = useState(0);
//const [maxPlayerAttack, setMaxPlayerAttack] = useState(0);  
//const [minComputerAttack, setMinComputerAttack] = useState(0);
//const [maxComputerAttack, setMaxComputerAttack] = useState(0);
const [exp, setExp] = useState(0);

//console.log('beforeattacl--playerhealth:',playerHealth, 'Tokens', Tokens);
  const attack = (attackType: AttackType) => {
  
    setIsAttacking(true);
    
    setTimeout(() => {

      setPlayerAttack(attackType);
     
      setComputerAttack(
        Object.values(AttackType)[
          Math.floor(Math.random() * Object.values(AttackType).length)
        ]
      );
      let playerLost = 0;
      let computerLost = 0;
      

      // Player Attacks min max values
/*
if (attackType === AttackType.Missiles) {
  setMinPlayerAttack ((0.1 + Math.random() * 0.4) * 30 + (1 * Score)+(1*(exp1/100)));
  setMaxPlayerAttack ((0.5 + Math.random() * 0.4) * 30 + (1 * Score)+(1*(exp1/100)));
} else if (attackType === AttackType.Miniguns) {
  setMinPlayerAttack((0.1 + Math.random() * 0.4) * 50 + (1 * Score)+(1*(exp1/100)));
  setMaxPlayerAttack((0.5 + Math.random() * 0.4) * 50 + (1 * Score)+(1*(exp1/100)));
} else if (attackType === AttackType.RayOfDeath && Lasers > 0) {
  setMinPlayerAttack(computerHealthPercent * 0.35);
  setMaxPlayerAttack(computerHealthPercent * 0.35);
} else if (attackType === AttackType.Melee && computerAttack !== AttackType.Melee) {
  setMinPlayerAttack((0.1 + Math.random() * 0.4) * 10 + (1 * Score)+(1*(exp1/100)));
  setMaxPlayerAttack((0.5 + Math.random() * 0.4) * 10 + (1 * Score)+(1*(exp1/100)));
}

// Computer Attacks min max values

if (computerAttack !== AttackType.repairModule && computerAttack !== AttackType.Melee && computerAttack !== playerAttack) {
  setMinComputerAttack((0.1 + Math.random() * 0.4) * 50 + (1.3 * StatsScore));
  setMaxComputerAttack((0.5 + Math.random() * 0.4) * 50 + (1.3 * StatsScore));
} else if (computerAttack === AttackType.Melee && playerAttack !== AttackType.Melee) {
  setMinComputerAttack((0.1 + Math.random() * 0.4) * 10 + (1.3 * StatsScore));
  setMaxComputerAttack((0.5 + Math.random() * 0.4) * 10 + (1.3 * StatsScore));
}
*/
// Output the results

// PLAYER ATTACKS
if (attackType === AttackType.repairModule && HeldModules > 0) {
  RepairModules();
  setHeldModules(-1);

}

if (computerAttack===AttackType.repairModule && EnemyHeldModules>0){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  EnemyRepairModules();
  setEnemyHeldModules(-1);
}

if (attackType === AttackType.Missiles) {
  if (Math.random() < (Skill + 0.1)) {
    computerLost =  Math.floor((30 + Score * 1.5) * (0.9 + Math.random() * 0.2) * (1 + AttackRating * 2) * 0.5);
   // console.log(computerLost);
    setExp(exp+(computerLost/3));
    setComputerHealth(computerHealth - computerLost);
  
  } 
}

if (attackType === AttackType.Miniguns) {
  if (Math.random() < (Skill - 0.1)) {
    computerLost =  Math.floor((30 + Score * 2) * (0.9 + Math.random() * 0.2) * (1 + AttackRating * 2) * 0.5);
   // console.log(computerLost);
    setExp(exp+(computerLost/3));
    setComputerHealth(computerHealth - computerLost);
   
  }
}

if (attackType === AttackType.Melee) {
  if (Math.random() < (Skill + 0.3)) {
    computerLost =  Math.floor((30 + Score ) * (0.9 + Math.random() * 0.2) * (1 + AttackRating * 2) * 0.5);
    setExp(exp+(computerLost/3));
    setComputerHealth(computerHealth - computerLost);
} }

if (attackType === AttackType.RayOfDeath && Lasers > 0) {
  computerLost = computerHealth * 0.40;
  setExp(exp+(computerLost/3));
  setComputerHealth(computerHealth - computerLost);
  setLasers(Lasers-1);
} 

// ENEMY ATTACKS
// ENEMY REPAIR MODULES
/*
if (computerAttack === AttackType.repairModule && EnemyHeldModules > 0) {
  setComputerHealth(computerHealth + 20 + StatsScore);
  setEnemyHeldModules(EnemyHeldModules-1);

}*/

// OTHER ENEMY ATTACKS
if (computerAttack !== AttackType.repairModule && computerAttack !== AttackType.Melee && computerAttack !== AttackType.Reloading) {
  if (Math.random() < EnemySkill) {
    playerLost = ((0.1 + Math.random() * 0.4) * 50 + (1.35 * StatsScore));
    setPlayerHealth(playerHealth - playerLost);
   
  } 
}

// ENEMY MELEE ATTACKS
if (computerAttack === AttackType.Melee) {
  if (Math.random() < (EnemySkill + 0.3)) {
    playerLost = ((0.1 + Math.random() * 0.4) * 20 + (1.35 * StatsScore));
    setPlayerHealth(playerHealth - playerLost);
  
  }
   
   
  }

  
setComputerHealthLost(computerLost);
setPlayerHealthLost(playerLost);
setIsAttacking(false);

//console.log('before--playerhealth:',playerHealth, 'playerLost', playerLost);

 if ((playerHealth-playerLost)<0){
 // console.log('should end here');

    setDisabled(true);

 




    setScore(Score);
   
//console.log('player health below')
//console.log('inside--playerhealth:',playerHealth, 'playerLost', playerLost);
    
  const SettingData = async () => {
    // Query the previous score of the user
    const query = new Moralis.Query(RampageOneManArmy_R3);
     await query.equalTo('player', address);
    
      const previousScoreObject = await query.first();
      if(previousScoreObject){
      previousScoreObject.set('tokens',(Tokens-1));
      await previousScoreObject.save();
//console.log('database tokens updated:',(Tokens-1));
}
  }
 SettingData();
  
 
 

 
 

   
   setTokens(Tokens-1);
  
   setRemcomphealth(computerHealth);

  setLost(true);

 
      
   

    setGameOver(true);
 

  setBattleOutcome(
    <VStack>
     
    <Tag className='modal'
    fontSize={'3vw'}
    color={'red'}
    animation= 'result-animation 4s ease-in-out'
  background= 'black'
  position= 'absolute'
  top={'55vmax'}
 
  zIndex= '300'

    opacity='0' 
  
      textAlign={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      padding={'1vw'}
     
      >
          You lose,<br></br>
           rest in pieces,
           <br></br> legend!
        </Tag>

          
             </VStack>
  );






  if (Tokens <= 1) {
   
   
   /*
      localStorage.setItem("Tokens", String(Tokens-1));
      localStorage.setItem('Timer',"initialized");


      const SettingTimer = async () => {
        // Query the previous score of the user
        const query = new Moralis.Query(RampageOneManArmy_R3);
         await query.equalTo('player', address);
         const previousScoreObject = await query.first();
        if(previousScoreObject){
       
          previousScoreObject.set('reset',true);
    //console.log('TokensReset initialized');
    await previousScoreObject.save();
      }}
     SettingTimer();
     */ 
     

   //WRITE IN HERE THE CODE THAT SAVES TOKENS 0 TO MONGODB. ALSO WRITE IN THE RETURN STATEMENT (TOKENS LESS THAN ZERO) THAT THE CODE CHECKS UPDATE TIME OF TOKENS 0.IF THE TIME IS LESS THAN 6 HRS, SHOW TIMER, IF NOT REVERT BACK TO NUMBER OF LEGENDS.
   //IF THE CODE DOESN'T WORK, ADD SETTOKENS(NUMBEROFLEGENDS). 
 
/*
    if(Score<10){
    setScore(1);}
   else if (Score >= 10 && Score < 20) {
    setScore(10);
  } else if (Score >= 20 && Score < 30) {
    setScore(20);
    // You can continue adding more milestones and conditions here.
  } else if (Score >= 30 && Score < 40) {
    setScore(30);
  } else if (Score >= 40 && Score < 50) {
    setScore(40);
  } else if (Score >= 50 && Score < 60) {
    setScore(50);
  } else if (Score >= 60 && Score < 70) {
    setScore(60);
  } else if (Score >= 70 && Score < 80) {
    setScore(70);
  } else if (Score >= 80 && Score < 90) {
    setScore(80);
  } else if (Score >= 90 && Score < 100) {
    setScore(90);
  } else if (Score >= 100 && Score < 150) {
    setScore(100);
  } else if (Score >= 150 && Score < 200) {
    setScore(150);
  } else if (Score >= 200) {
    setScore(200);
  }*/
    setLost(false);

     
 
   

    return (
     
      setBattleOutcome(
        <>
        
       <Tag className='modal'
       fontSize={'3vw'}
       color={'red'}
       animation= 'result-animation 4s ease-in-out'
     background= 'black'
     position= 'absolute'
     top={'55vmax'}
     zIndex= '300'
       opacity='0' 
     
         textAlign={'center'}
         justifyContent={'center'}
         flexDirection={'column'}
         padding={'1vw'}
        
         >
          
              YOU RUN OUT OF TOKENS! regroup and come back stronger
            </Tag>
            </>
    ));
  }
  


}

else if ((computerHealth-computerLost)<0) {
  setDisabled(true);
  setLost(false);
  setWin(true);
  setTeamScore(TeamScore+1);
  setRemcomphealth(0);

  setExp1(exp1 + (exp===0 ? (computerHealth/2) : ((exp/2)>=10 ? (exp/2) : 10)));
  console.log(exp1 + (exp===0 ? (computerHealth/2) : ((exp/2)>=10 ? (exp/2) : 10)));
    //setExp(0);
    setScore(Score + 1);
   

    
  const SettingNFTwin = async () => {
    // Query the previous score of the user
    const currentTime = new Date();
    const query = new Moralis.Query(RampageOneManArmy_R3);
     await query.equalTo('player', address);
    
      const previousScoreObject = await query.first();
      if(previousScoreObject){
      previousScoreObject.set('NFTwinner',currentTime);
      await previousScoreObject.save();
      }
      return(
console.log(''));
  }
   
   
   
 
   
    
  setGameOver(true);

  setBattleOutcome(
    <Tag className='modal'
    fontSize={'3vw'}

    animation= 'result-animation 4s ease-in-out'
  background= 'black'
  position= 'absolute'
  top={'55vmax'}
  zIndex= '300'
    opacity='0' 
  
      textAlign={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      padding={'1vw'}
     
      >
       
        <Tag  fontSize={'1.5vw'} backgroundColor={'transparent'}     color={'green.700'}>
    You are victorious Legend!
    </Tag>
    <Tag          color={'green.700'} fontSize={'1.5vw'} padding={'1vw'} backgroundColor={'transparent'}>
    <Avatar
    src={ExpPic}
    size='md'
    name='exp'
    ml='5'
    mr='auto'
    
    
  />
  <TagLabel  >{(exp===0 ? (computerHealth/2) : ((exp/2)>=10 ? (exp/2) : 10)).toFixed(0)} gained</TagLabel></Tag>
  
   {/*change to state variable*/}
    {Math.random() > 0.999999999999999999999999999999999999 &&(
      <Tag    fontSize={'1.5vw'} backgroundColor={'transparent'} >
 <Avatar
 src={RR}
 size='md'
 name='RR'
 ml='5'
 mr='auto'
/>
<TagLabel>Legends NFT gained</TagLabel></Tag> 
    ) }
  </Tag> 

  
  );
}

    }, 500);};
  
  
  
  
//    if (gameOver===true){
  //    useEffect(() => {
    //    setIsModalOpen(true);
      
      //}, [])
      
    //}
/*
    useEffect(() => {
      localStorage.setItem(String(Team),String(TeamScore));
    
      return () => {
          <Alert>team score updated {TeamScore}</Alert>
      }
    }, [TeamScore])

    useEffect(() => {
      localStorage.setItem(String(Team),String(TeamScore));
    
      return () => {
          <Alert>team score updated {TeamScore}</Alert>
      }
    }, [TeamScore])
    
*/
  const rematch =  ()  => {
    
    setPlayerAttack(AttackType.Reloading);
    setComputerAttack(AttackType.Reloading);
    setGameOver(false);
  
   setLost(false);
    setWin(false);
   
   

};

const RepairModules = () => {
  if (HeldModules<=0) 
  {console.log("OUT OF REPAIR MODULES")
}

else { 
const newHealth = playerHealth + 50;
setPlayerHealth(newHealth);
setHeldModules(HeldModules - 1);
setPlayerAttack(AttackType.repairModule);}}


const EnemyRepairModules = () => {
  if (EnemyHeldModules<=0) 
  {console.log("enemy OUT OF REPAIR MODULES")
}

else { 
const newEnemyHealth = computerHealth + 50;
setComputerHealth(newEnemyHealth);
setEnemyHeldModules(EnemyHeldModules - 1);
//setComputerAttack(AttackType.repairModule);
}}

const [isDisabled, setDisabled] = useState(false);
 
const playerHealthPercent = (playerHealth / 100) * 100;
const computerHealthPercent = (computerHealth / 100) * 100;

const squareStyle = {
  height: '1vw',
  width: '1.5vw',
  borderRadius: '0.1vw',
  margin: '0.3vw',
  padding:'0.5vw'

}
if (!address){
    
  return (
  <VStack alignItems={'center'}>
  <Box  alignItems={'center'}>
  <Text> PLEASE LOGIN AND REFRESH</Text>
  </Box>
  </VStack>)}



  

const [showRampageInfo, setShowRampageInfo] = useState(false);




/*
const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
function Timer() {
 

  useEffect(() => {
    // Calculate the time remaining until October 14, 2023, at 18:00 GMT
    const targetDate = new Date('2023-11-14T18:00:00Z');
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();

    // Check if the target date has passed
    if (timeDifference <= 0) {
      setTimeRemaining('Tournament round 2 has begun, Join the fight!!');
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeRemaining(
      `PREP and training phase initiated. Round 2 will begin in ${days} days, ${hours} hours and  ${minutes} minutes`
    );
  
  }, []);

  return (
    <Box textAlign={'center'} justifyContent={'center'} fontWeight={'bold'} borderWidth='0.2vw' borderRadius='5px' borderColor='green' width={'90%'} textColor={'green'} mt={6} fontSize={'1vmax'}>
     
      {timeRemaining}
    </Box>
  )};*/





//console.log(Lasers, Skill);


const RobotHealthUI = () => {
  const [health, setHealth] = useState(playerHealth); // Initial health

 /* useEffect(() => {
    // Decrease health for demonstration
    const interval = setInterval(() => {
      setHealth((prevHealth) => (prevHealth > 0 ? prevHealth - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
*/
  const getHealthColor = (health:any) => {
    if (health > 75) return 'green';
    if (health > 50) return 'yellow';
    if (health > 25) return 'orange';
    return 'red';
  };

  return (
    <div style={{
      fontFamily: 'DSEG7',
      fontSize: '1vmax',
      color: getHealthColor(health),
      textShadow: `5px 5px 5px ${getHealthColor(health)}`,
     
      textAlign: 'center', 
      zIndex:'500'

    }}>
      {health.toFixed(0)}
    </div>
  );
};

const calculatePosition = (index:any, totalItems:any) => {
  const angle = (2 * Math.PI) / totalItems * index; // angle in radians
  const radius = 15; // radius of the circle in 'vmin' units, increased to position buttons correctly
  const left = 7 + radius * Math.cos(angle); // adjust 50 to move the circle horizontally
  const top = 7 + radius * Math.sin(angle); // adjust 50 to move the circle vertically
  return { left: `${left}vmin`, top: `${top}vmin` };
};

// Component to render each button

type AttackButtonProps = {
  index: number;
  totalItems: number;
  children: ReactNode;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const AttackButton: React.FC<AttackButtonProps> = ({ index, totalItems, children, disabled, onClick }) => {
    const position = calculatePosition(index, totalItems);
  return (
    <button style={{ 
      position: 'relative', 
    
      width: '15vmin', 
      height: '15vmin', 
      borderRadius: '50%', 
      borderColor: 'transparent',
      ...buttonCommonStyles 
    }} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

// Common styles for buttons to avoid repetition
const buttonCommonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};


const MissileSoundRef = useRef<HTMLAudioElement | null>(null);
const LaserSoundRef = useRef<HTMLAudioElement | null>(null);
const GunsSoundRef = useRef<HTMLAudioElement | null>(null);
const HealthSoundRef = useRef<HTMLAudioElement | null>(null);
const MeleeSoundRef = useRef<HTMLAudioElement | null>(null); // Declare the ref for the sound
// Main component
const AttackUI = () => {
  const totalItems = 5; // Corrected to match the number of buttons

  
  return (
    <Flex direction={'row'} justifyContent="center" alignItems="center" position="relative" height="fit-content" width="full"> {/* Increased size */}
      {/* Central health frame */}
     

      {/* Position buttons in a circle */}
      <AttackButton index={1} totalItems={totalItems} disabled={isAttacking || Lasers <= 0} onClick={() => { attack(AttackType.RayOfDeath);  if (LaserSoundRef.current) {
        LaserSoundRef.current.currentTime = 0;
        LaserSoundRef.current.play().then(() => {
          // Playback started successfully
        })
        .catch(error => {
          console.error('Playback failed:', error);
        });;;
      }}}>
        <img src={Swords} alt='RayOfDeath' />
  
      </AttackButton>
   
      <AttackButton index={2} totalItems={totalItems} disabled={isAttacking || Skill < 0.61} onClick={() => { attack(AttackType.Missiles);  if (MissileSoundRef.current) {
        MissileSoundRef.current.currentTime = 0;
        MissileSoundRef.current.play().then(() => {
          // Playback started successfully
        })
        .catch(error => {
          console.error('Playback failed:', error);
        });;;
      } }}>
        <img src={missiles} alt='Missiles' />
      
      </AttackButton>
  
      <AttackButton index={3} totalItems={totalItems} disabled={isAttacking || AttackRating < 0.16} onClick={() => { attack(AttackType.Miniguns);  if (GunsSoundRef.current) {
        GunsSoundRef.current.currentTime = 0;
        GunsSoundRef.current.play().then(() => {
          // Playback started successfully
        })
        .catch(error => {
          console.error('Playback failed:', error);
        });;
      } }}>
        <img src={miniguns} alt='Miniguns' />
      
      </AttackButton>
  
      <AttackButton index={4} totalItems={totalItems} disabled={isAttacking} onClick={() => { attack(AttackType.Melee);
        if (MeleeSoundRef.current) {
          MeleeSoundRef.current.currentTime = 0;
          MeleeSoundRef.current.play().then(() => {
            // Playback started successfully
          })
          .catch(error => {
            console.error('Playback failed:', error);
          });
        } }}>
        <img src={Melee} alt='Melee' />
     
      </AttackButton>
   
      <AttackButton index={5} totalItems={totalItems} disabled={isAttacking || HeldModules < 1} onClick={() => { RepairModules(); }}>
        <img src={Star} alt='RepairModules' />
       
      </AttackButton>
 

     
    </Flex>
    
  );
};

return (

  <VStack className='modal' id='game' alignItems={'center'}>

  {searchAddress && (
   
    <Box pt={1} >
   
      <Heading size={'md'} >
      <Tag  fontSize='1vw' colorScheme={'whiteAlpha'}>PLAYER ADDRESS: {address}</Tag> 
      <Timer />
    
      </Heading>
     
    </Box>
  )}
 
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
<ModalOverlay />

<ModalContent backgroundColor={'black'} textColor={'white'} className='modal'>
<Box paddingBottom={'2vmax'}>
<ModalCloseButton />
</Box>
<ModalHeader padding={'1vmax'}>Choose your Legend</ModalHeader>

<ModalBody>
{Team === 'Ryoshi Tales VIP' ? (
  <NFTGridEB />
) : (
  <NftGridG address={address} chain="0x19" />
)}
</ModalBody>
</ModalContent>
</Modal>
   
<div className="game" id='game'  style={{ width: '100%', height: '100vh', overflow: 'auto', zoom: '100%' }}>
  <VStack  width='95%' fontSize='1vw' padding='0vw'>
    <Tag id='stage' justifyContent={'center '} height={'1.1vh'} width={'full'} size='lg'  textAlign='center' fontSize='1vw' textColor={'grey'} backgroundColor={'black'}>stage {Score}</Tag>
   <HStack >

     
<VStack width={'50%'}>



<Character
  name="Player"
  image={player}
  attack={playerAttack}
  isAttacking={isAttacking}
  healthLost={playerHealthLost}
  EnemyAttackType={computerAttack}
  MeltdownsStorage={MeltdownsStorage}
  Tokens={Tokens}
  playerHealth={playerHealth}
/>



  
<Box  borderRadius={'20%'} className='characterStats' backgroundColor={'black'} width={'full'}>
<VStack spacing={2} align="center" >
 
    <Text fontSize="0.8vw" fontWeight="bold">
      PLAYER
    
    </Text>
  
    <HStack  justifyContent={'space-evenly'} width='100%' padding={'1vmax'} >
  
  
<Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={SkillPic}
    size='xs'
    name='skill'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{(Skill ? (Skill.toFixed(1)):0.1)}</TagLabel>
</Tag>
<Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={Star}
    size='xs'
    name='health'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{HeldModules //add LAsers also here if needed
  }</TagLabel>
</Tag>
  
   <Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={Melee}
    size='xs'
    name='attack'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{computerHealthLost>0 ? playerHealthLost.toFixed(0):'MISS'}</TagLabel>
</Tag>

<Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={ExpPic}
    size='xs'
    name='exp'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{exp1.toFixed(0)}</TagLabel>
</Tag>


    </HStack>
 

  </VStack>
</Box>

      </VStack>
      
      <VStack width={'50%'}>
      <EnemyCharacter name="Enemy" image={enemy} attack={computerAttack} isAttacking={isAttacking} healthLost={computerHealthLost} playerAttackType={playerAttack} EnemyHeldModules={EnemyHeldModules} computerHealth={Number(computerHealth.toFixed(0))}/>
      <Box  borderRadius={'20%'} className='characterStats' backgroundColor={'black'} width={'full'}>
  <VStack  spacing={2} align="center">
    <Text fontSize="0.8vw" fontWeight="bold">
      Enemy
    </Text>
    <HStack justifyContent={'space-evenly'} width='100%' padding={'1vmax'}>

<Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={SkillPic}
    size='xs'
    name='skill'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{EnemySkill.toFixed(1)}</TagLabel>
</Tag>
<Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={Star}
    size='xs'
    name='health'
      ml={-2}
    mr='auto'
  />
  <TagLabel>{EnemyHeldModules>0 ? EnemyHeldModules.toFixed(0) : 0}</TagLabel>
</Tag>
  


  
   <Tag width='auto' fontSize={'1vmax'} size='lg' colorScheme='white'  >
  <Avatar
    src={Melee}
    size='xs'
    name='attack'
    ml={-2}
    mr='auto'
  />
  <TagLabel>{playerHealthLost>0 ? playerHealthLost.toFixed(0):'MISS'}</TagLabel>
</Tag>
    </HStack>
  </VStack>
</Box>



      </VStack>
    
 
      
    </HStack>
    <HStack justifyContent='center'>
     
     
    </HStack>
    {!gameOver && (
      <VStack>
     <AttackUI />
     <audio preload="none" ref={MeleeSoundRef}>
     <source src={MeleeSound} type="audio/mpeg" />
     Your browser does not support the audio element.
   </audio>
   <audio ref={LaserSoundRef}>
   <source src={LaserSound} type="audio/mpeg" />
   Your browser does not support the audio element.
 </audio>
 <audio ref={MissileSoundRef}>
 <source src={MissileSound} type="audio/mpeg" />
 Your browser does not support the audio element.
</audio>
<audio preload="none" ref={GunsSoundRef}>
<source src={GunsSound} type="audio/mpeg" />
Your browser does not support the audio element.
</audio>
<audio preload="none" ref={HealthSoundRef}>
<source src={HealthSound} type="audio/mpeg" />
Your browser does not support the audio element.
</audio>
<Button variant="outline" textColor={'black'} color='orangered' width={'-moz-fit-content'} fontSize={'1vw'} onClick={() => setGameOver(true)}>Quit round</Button>
   </VStack>
    )}
    
    
    // Common styles for buttons to avoid repetition
   
    
  {gameOver && (
    <>
    

    <Box width="full">
  
    <Box fontSize='1vw' marginTop='1vw'>
  
    </Box>

    <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsModalOpen(true)
         
        }}
      >
       <VStack>
  {battleOutcome}
  <Button padding='1' type="submit" fontSize={'1.3vw'} boxSize='full' minWidth={'-moz-fit-content'} bgColor='black' color="orangered" variant="outline">
    CHOOSE YOUR LEGEND
  </Button>
</VStack>
      </form>
    </Box>
<HStack>

{Tokens > 0 && paddedLegendFromStorage !== '0000'?  (
  <HStack>
      <Button fontSize={'1vw'} onClick={() => {
        setPlayerAttack(AttackType.Reloading);
        setComputerAttack(AttackType.Reloading);
        setGameOver(false);
      
       setLost(false);
        setWin(false);
        }} bgColor='black' color="orangered" variant="outline">
     TO BATTLE
    </Button> <Spacer padding={'0.3vw'}></Spacer>
     <Button fontSize={'1vw'} bgColor='black' color="orangered" variant="outline"><Spacer padding={'0.3vw'}></Spacer>
     <Link to='../Rampage/Gameloader'> Quit game</Link>
   </Button>
   </HStack>
      ) : (
        <HStack>
        {Tokens === 0 &&(
        <Button fontSize={'1vw'}bgColor='black' color="orangered" variant="outline" isDisabled>
        No Tokens left
                </Button>)}

                {paddedLegendFromStorage === '0000' &&(
                  <Button fontSize={'1vw'}bgColor='black' color="orangered" variant="outline" isDisabled>
                  Choose a Legend 
                          </Button>)}


         <Button fontSize={'1vw'} bgColor='black' color="orangered" variant="outline">
         <Link to='../Rampage/Gameloader'> Quit game</Link>
       </Button>
       </HStack>
      )}<Spacer padding={'0.3vw'}></Spacer>
    <Button fontSize={'1vw'} bgColor='black' color="orangered" variant="outline" onClick={() => setShowRampageInfo(true)} >how to play </Button>
    {showRampageInfo && <RampageInfo />}
   </HStack>
    

    </>

  )}
  </VStack>
  
</div>

     <TopHighScores />
</VStack>

);
  };


return (
  <VStack>
  <Game />
  <Audio />
  </VStack>
  
 
  )};
export default AppGCrofam;


 
 