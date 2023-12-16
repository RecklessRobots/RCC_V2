/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { Flex, Spacer, Text, Box, VStack, HStack, Button, Image, Alert, Avatar, Tag, TagLabel, Wrap, WrapItem, Collapse } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import Moralis from 'moralis-v1';
import RRGEN1 from './game/RRGEN1.webp';
import Chibis from './game/Chibis.png';
import RR from './game/RR.png';
import CROMORPHS from './game/CROMORPHS.webp';
import CorgiClub from './game/CorgiClub.png';
import LadiesSkulls from './game/LadiesSkull.webp';
import CRXillions from './game/CRXillion.png';
import SpaceCRXillion from './game/CRXillionSpace.png';
import Crooks from './game/Crooks.png'
import EBVIP from './game/EBVIP.webp'
import MOA from './game/MOA.webp'
import Wyverns from './game/wyverns.webp'
import Cr00ts from './game/Cr00ts.webp'
import Skully from './game/Skully.webp'
import exp from './game/exp.png'
import './game/GameLoader.css';
import VS from './game/vs.webp';
import TimerComponent from './game/timer';
import ChooseTeams from './game/chooseteams.wav';
import Skilltree from './game/skilltree';
import chooseteamsMusic from './game/chooseteamsMusic.mp3'
import Timer from './tournamentTimer';
import RampageInfo from './game/RampageInfo'
import TopHighScores from './game/PlayerScores';
import TopHighScores1MA from './game/PlayerScores_1MA';




interface Skilltree {
  address: string;
  account: string;
}
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


const GameLoader = () => {

  const [refresh, setRefresh]=useState(false);

useEffect(() => {
  localStorage.clear();

 
  
}, [])


  const [TokenData, setTokenData] = useState(null || String);
  const { account } = useMoralis();
  const address:string=String(account);
  const [Tokens, setTokens]=useState(0);
  const [TokensLoaded, setTokensLoaded]=useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [RCRO, setRCRO]=useState(0);
  const [OneManArmyRCRO, setOneManArmyRCRO]=useState(0);
  const [ARMT, setARMT]=useState(0);
  const [EXP,setEXP]=useState(0);
  const [OneManArmyEXP,setOneManArmyEXP]=useState(0);
  const [showRampageInfo, setShowRampageInfo] = useState(false);
  const [gameMode, setGameMode]=useState('Legacy');


  const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xf96ec7C11D311920833753FAB9b174B6FD53517E&address="
  const url2= account
  const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
  

  useEffect(() => {
    const GettingData = async () => {
    const response = await fetch(url1+url2+url3);
    const json = await response.json();
//console.log(json);
      
   if (json.result !== "Error! Invalid address format" && gameMode==='Legacy')
   { setTokenData(json.result);} if(gameMode==='One Man Army' && json.result!=='0') {setTokenData('5')}
    }
    
    GettingData();
  }, [account, gameMode]);
  
useEffect(() => {

  const SettingData = async () => {
  
    if (account && address){

   
  // Query the previous Tokens of the user
 if (address){
  const query = await new Moralis.Query(RampageLegacy_R3);
  await query.equalTo('player', address);
  const queryC = await new Moralis.Query(RampageClicker);
  await queryC.equalTo('player', address);
  const queryO = await new Moralis.Query(RampageOneManArmy_R3);
  await queryO.equalTo('player', address);

  try {
    const previousTokenObject = await query.first();
    const previousClickerObject = await queryC.first();
    const previousOneManArmyObject = await queryO.first();

    if (gameMode==='Legacy' && !previousTokenObject){
      const newScoreObject = new RampageLegacy_R3();
      newScoreObject.set('player', address);
      newScoreObject.set('tokens', Number(TokenData));
      newScoreObject.set('legendsAmount', Number(TokenData));
      newScoreObject.set('exp', 50);
      newScoreObject.set('score', 0);
      newScoreObject.set('reset', false);
      newScoreObject.set('skillLevel',0.6);
      newScoreObject.set('lasersLevel',0);
      newScoreObject.set('attackLevel',0.15);
      newScoreObject.set('Meltdowns',0);
      newScoreObject.set('healthLevel',1);
      newScoreObject.set('armorytokens',0);
      newScoreObject.set('repairmodules',0);

 
      await newScoreObject.save();
      console.log('First Tokens saved to Legacy:', Number(TokenData))}

      else{
        if (!previousOneManArmyObject){
      const newOneManArmyScoreObject = new RampageOneManArmy_R3();
      newOneManArmyScoreObject.set('player', address);
      newOneManArmyScoreObject.set('tokens', Number(5));
      newOneManArmyScoreObject.set('legendsAmount', Number(5));
      newOneManArmyScoreObject.set('exp', 50);
      newOneManArmyScoreObject.set('score', 0);
      newOneManArmyScoreObject.set('reset', false);
      newOneManArmyScoreObject.set('skillLevel',0.6);
      newOneManArmyScoreObject.set('lasersLevel',0);
      newOneManArmyScoreObject.set('attackLevel',0.15);
      newOneManArmyScoreObject.set('Meltdowns',0);
      newOneManArmyScoreObject.set('healthLevel',1);
      newOneManArmyScoreObject.set('armorytokens',0);
      newOneManArmyScoreObject.set('repairmodules',0);
      await newOneManArmyScoreObject.save();
      console.log('First Tokens saved to one man army:', Number(5))}
    }

  
    if (previousTokenObject && previousOneManArmyObject) {
      const previousTokens = await previousTokenObject.get('tokens');
      const previousOneManArmyTokens = await previousOneManArmyObject.get('tokens');
      const previousLegends = await previousTokenObject.get('legendsAmount');
      const timerComponentRunning = previousTokenObject.get('reset'); 
      const previousScore = await previousTokenObject.get('score');
      const previousOneManArmyScore = await previousOneManArmyObject.get('score');
      const Exp = previousTokenObject.get('exp'); 
      const previousOneManArmyEXP=previousOneManArmyObject.get('exp');
      if (previousClickerObject){
      const previousARMT=previousClickerObject.get('armorytokens');
    setARMT(previousARMT); 
    }

      setEXP(Exp);
      setOneManArmyEXP(previousOneManArmyEXP);
setRCRO(previousScore);
setOneManArmyRCRO(previousOneManArmyScore);


      if ((gameMode==='Legacy' && previousTokens===0) && Exp>0 && (!isTimerRunning && timerComponentRunning===false)){
        setIsTimerRunning(true);
        previousTokenObject.set('reset',true);
        await previousTokenObject.save();

      }
      
      if (((gameMode==='Legacy' && previousTokens===0)) && Exp===0 && (!isTimerRunning && timerComponentRunning===false)){
        setTokens(Number(TokenData));
        previousTokenObject.set('tokens', Number(TokenData));
        await previousTokenObject.save();

      }


      if (gameMode==='Legacy' && previousLegends<TokenData){
        previousTokenObject.set('legendsAmount', Number(TokenData));
        previousTokenObject.save();
        //console.log('tokens updated as per chain data');
      }

    
      setIsTimerRunning(timerComponentRunning);
      // Compare the new Tokens with the previous Tokens
    
     
     //console.log(previousTokens);
     //console.log(isTimerRunning);
       
   
    
      if (gameMode==='Legacy' && Number(TokenData) > previousTokens ) {
        // Save the new Tokens if it's higher
        setTokens(previousTokens);
        setTokensLoaded(true);
       
       
       
        //console.log('tokens after saving previoustokens to Tokens:', previousTokens);
      }
       else  {
        setTokens(Number(TokenData));
        //console.log('tokens after saving TokenData to Tokens:', TokenData);
      
      } 
    } else {
      setTokens(Number(TokenData));
      setTokensLoaded(true);
      // Save the score if it's the first score for the user
     
     }} catch (error) {
    console.error('Error querying or saving score:', error);
  };}}}
  
SettingData();

}, [TokenData, Tokens, refresh, gameMode])



const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<string>('');
const [selectedEnemyTeam, setSelectedEnemyTeam] = useState<string>('');

useEffect(() => {
  const TeamsDiv = document.getElementById('Rampage');
  if (TeamsDiv && (selectedEnemyTeam ==='' && selectedPlayerTeam ==='')) {
    TeamsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 
}, ); 



    const [previousScoreAttributes, setPreviousScoreAttributes] = useState<any>(null);
    const [previousScoreAttributes1MA, setPreviousScoreAttributes1MA] = useState<any>(null);
   
  interface Nft {
    id: string;
    address: string;
    slug: string | null;
    market: {
      uri: string;
    };
    // Add other properties as needed
    image: string;
    // Add other properties as needed
  }

  const enemyTeams = [
    { name: 'Legends', icon: RR , route: '/Rampage/Legacy' , ipfs:"" , json:'https://recklessrobots.mypinata.cloud/ipfs/QmUPfPrzpNmT4vYewhNG2qkergtHHBaMpvu1JNsgPKCapA/' , contract: "0xf96ec7C11D311920833753FAB9b174B6FD53517E" },
    { name: 'Chibis', icon: Chibis , route: '/Rampage/Legacy', ipfs: "", json: 'https://recklessrobots.mypinata.cloud/ipfs/QmaankFtqYMWMkCqPYnp8dcvN7aDzhzwhNSweugeYgi9iz/' , contract:"0x84Fda8563E6556a7Fb1578E10e114dB56d64638d"  },
    { name: 'RecklessRobots', icon: RRGEN1 , route: '/Rampage/Legacy' , ipfs:"" , json:"https://recklessrobots.mypinata.cloud/ipfs/QmXULW4NEaHe3SELWLMHGBQy7MwVN14CRMXAtV2ipLmnpw/", contract:"0xD56AFcdB787e233325757D3ED7A987F11FB3fa08" },
    { name: 'CROMorphs', icon: CROMORPHS , route: '/Rampage/Legacy', ipfs:"", json:'"https://cdn.ltsglxy.network/ipfs/QmTBEBdLcZe9xbKE57SLJ1Dwqg9q264JTh1xF15BA5J99J/' , contract:"0x4684619abcd81dBBfAa19438E9570F28008e180F" },
   { name: 'CorgiClub', icon: CorgiClub , route: '/Rampage/Legacy', ipfs:'',  json: '', contract:"0xa506b3938377635Fa9C091E9af8748Fa1C9A2424" },
    // Add more player team options here
    { name: 'LadiesSKULLS', icon: LadiesSkulls , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0xb33c03c551018E6c14F137003160067795667C8a" },
    { name: 'CRXillions', icon: CRXillions , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0xE1bAa24525B5f48F9B9df54802E44E85c0D81099" },
    { name: 'SpaceCRXillions', icon: SpaceCRXillion , route: '/Rampage/Legacy', ipfs:'' ,json: '', contract:"0xB6782F208ABe10E8962407d139f6698Bfc4FD13F" },
    { name: 'CrooksLegends', icon: Crooks , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0x44102B7AB3e2B8edF77D188cd2B173ECBDA60967" },
    { name: 'EBisusBayVIPs', icon: EBVIP , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0xE49709A3B59d708f50AA3712F2E5a84b7707664C" },
    { name: 'MOA', icon: MOA , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0x903B9a9d58742d0699fbd5b0AC7C9C4000B7ce43" },
    { name: 'Wyverns', icon: Wyverns , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0x13Eb301c0AC03D777dE915423B34195D56C14a21" },
    { name: 'Cr00ts', icon: Cr00ts , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0xca00aba7689e3c0f9f74e1f8d82e61c04c787734" },
    { name: 'Skully-X', icon: Skully , route: '/Rampage/Legacy', ipfs:"",  json: '', contract:"0x08FB1f6625d034019f2F6a3E70bab2FaA55CA068" },

  ];

  
  function getRandomNumber() {
    return Math.floor(Math.random() * 2000); // Generates a number from 0 to 3000
  }

  function getRandomNumberL() {
    return Math.floor(Math.random() * 400); // Generates a number from 0 to 3000
  }
  
  // Your existing code to fetch imageUrls
  useEffect(() => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    

    if (selectedEnemyTeam && selectedEnemyTeam==='CrooksLegends'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0x44102B7AB3e2B8edF77D188cd2B173ECBDA60967&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'CrooksLegends')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
     // console.log('crooks',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}
    
    if (selectedEnemyTeam && selectedEnemyTeam==='CRXillions'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0xE1bAa24525B5f48F9B9df54802E44E85c0D81099&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'CRXillions')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
     // console.log('crx',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}
 
    if (selectedEnemyTeam && selectedEnemyTeam==='LadiesSKULLS'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0xb33c03c551018E6c14F137003160067795667C8a&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'LadiesSKULLS')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
    //  console.log('skulls',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}

    if (selectedEnemyTeam && selectedEnemyTeam==='CROMorphs'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0x4684619abcd81dBBfAa19438E9570F28008e180F&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'CROMorphs')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
    //  console.log('cromorphs',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}
    
    
    if (selectedEnemyTeam && selectedEnemyTeam==='MOA'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0x903B9a9d58742d0699fbd5b0AC7C9C4000B7ce43&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'MOA')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
      //  console.log('cromorphs',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}

      
    if (selectedEnemyTeam && selectedEnemyTeam==='Cr00ts'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0xca00aba7689e3c0f9f74e1f8d82e61c04c787734&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'Cr00ts')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
      //  console.log('cromorphs',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}

      
    if (selectedEnemyTeam && selectedEnemyTeam==='Skully-X'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0x08FB1f6625d034019f2F6a3E70bab2FaA55CA068&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'Skully-X')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
      //  console.log('cromorphs',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}


      
    if (selectedEnemyTeam && selectedEnemyTeam==='Wyverns'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0x13Eb301c0AC03D777dE915423B34195D56C14a21&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'Wyverns')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
      //  console.log('cromorphs',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}

    

    if (selectedEnemyTeam && selectedEnemyTeam==='Chibis'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0x84Fda8563E6556a7Fb1578E10e114dB56d64638d&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'Chibis')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
    //  console.log('chibis',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}

    
    if (selectedEnemyTeam && selectedEnemyTeam==='EBisusBayVIPs'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0xE49709A3B59d708f50AA3712F2E5a84b7707664C&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'EBisusBayVIPs')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
     //   console.log('chibis',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}
    
    if (selectedEnemyTeam && selectedEnemyTeam==='Legends'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0xf96ec7C11D311920833753FAB9b174B6FD53517E&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });
// console.log(response.nfts);

      // Generate a random number
      const randomNum = getRandomNumberL();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'Legends')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
     
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
    //  console.log('Legends',imageUrls[randomNum]);
  
    })
    .catch(err => console.error(err));}
    
    if (selectedEnemyTeam && selectedEnemyTeam==='RecklessRobots'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0xD56AFcdB787e233325757D3ED7A987F11FB3fa08&pageSize=6000', options)
    .then(response => response.json())
    .then(response => {
      const imageUrls: string[] = [];
      response.nfts.forEach((nft: Nft) => {
        imageUrls.push(nft.image);
      });

      // Generate a random number
      const randomNum = getRandomNumber();

      // Update the "SpaceCRXillions" object's json property with the random image URL
     enemyTeams.find(team => team.name === 'RecklessRobots')!.ipfs = String(imageUrls[randomNum]);
     localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
     //console.log(response);
    
    // console.log(enemyTeams);
      // Log the updated enemyTeams array
     // console.log('rr',imageUrls);
  
    })
    .catch(err => console.error(err));}
   
    if (selectedEnemyTeam && selectedEnemyTeam==='SpaceCRXillions'){
    fetch('https://api.ebisusbay.com/fullcollections?address=0xB6782F208ABe10E8962407d139f6698Bfc4FD13F&pageSize=6000', options)
      .then(response => response.json())
      .then(response => {
        const imageUrls: string[] = [];
        response.nfts.forEach((nft: Nft) => {
          imageUrls.push(nft.image);
        });
  
        // Generate a random number
        const randomNum = getRandomNumber();
  
        // Update the "SpaceCRXillions" object's json property with the random image URL
       enemyTeams.find(team => team.name === 'SpaceCRXillions')!.ipfs = String(imageUrls[randomNum]);
       localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
      // console.log(enemyTeams);
        // Log the updated enemyTeams array
      //  console.log('space',imageUrls[randomNum]);
    
      })
      .catch(err => console.error(err));}

      if (selectedEnemyTeam && selectedEnemyTeam==='CorgiClub'){
      fetch('https://api.ebisusbay.com/fullcollections?address=0xa506b3938377635Fa9C091E9af8748Fa1C9A2424&pageSize=6000', options)
        .then(response => response.json())
        .then(response => {
          const imageUrls: string[] = [];
          response.nfts.forEach((nft: Nft) => {
            imageUrls.push(nft.image);
          });
    
          // Generate a random number
          const randomNum = getRandomNumber();
    
          // Update the "SpaceCRXillions" object's json property with the random image URL
         enemyTeams.find(team => team.name === 'CorgiClub')!.ipfs = String(imageUrls[randomNum]);
         localStorage.setItem('enemyTeamsPics',JSON.stringify(imageUrls));
        // console.log(enemyTeams);
          // Log the updated enemyTeams array
      
        })
        .catch(err => console.error(err));}

  }, [selectedEnemyTeam , selectedPlayerTeam]);
   

  
  
  
  
    const playerTeams = [
      { name: 'Legends', icon: RR , route: '/Rampage/Legacy' , ipfs:"https://recklessrobots.mypinata.cloud/ipfs/Qmbf4ETyj5aH7ZDrQJde8ZmRZGxsepTufRM7DT9XqKaSRC/" , json:'https://recklessrobots.mypinata.cloud/ipfs/QmUPfPrzpNmT4vYewhNG2qkergtHHBaMpvu1JNsgPKCapA/' , contract: "0xf96ec7C11D311920833753FAB9b174B6FD53517E" },
      { name: 'Chibis', icon: Chibis , route: '/Rampage/Legacy', ipfs: "https://recklessrobots.mypinata.cloud/ipfs/QmTKu16wVpRgNifCFRhtfLf73KxoaJHE1j15RvurfgTe4c/", json: 'https://recklessrobots.mypinata.cloud/ipfs/QmaankFtqYMWMkCqPYnp8dcvN7aDzhzwhNSweugeYgi9iz/' , contract:"0x84Fda8563E6556a7Fb1578E10e114dB56d64638d"  },
      { name: 'RecklessRobots', icon: RRGEN1 , route: '/Rampage/Legacy' , ipfs:"https://recklessrobots.mypinata.cloud/ipfs/QmZ7L1GAnp5VFrHT4ayvG33x8HS5LHr3p2DxdHy3Qwgs4K/" , json:"https://recklessrobots.mypinata.cloud/ipfs/QmXULW4NEaHe3SELWLMHGBQy7MwVN14CRMXAtV2ipLmnpw/", contract:"0xD56AFcdB787e233325757D3ED7A987F11FB3fa08" },
      { name: 'CROMorphs', icon: CROMORPHS , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/QmbjeR7dYWxRg9ys7JHVMqgd1QzAudjXcxbxG4nmkKpGSQ/", json:"https://cdn.ltsglxy.network/ipfs/QmTBEBdLcZe9xbKE57SLJ1Dwqg9q264JTh1xF15BA5J99J/" , contract:"0x4684619abcd81dBBfAa19438E9570F28008e180F" },
     { name: 'CorgiClub', icon: CorgiClub , route: '/Rampage/Legacy', ipfs:localStorage.getItem('NFTimage'),  json: 'https://ipfs.io/ipfs/QmbwZLzYV6NfxNf811p7JJtugH3bdpnG8tbjNg8GfX1Sk5/', contract:"0xa506b3938377635Fa9C091E9af8748Fa1C9A2424" },
      // Add more player team options here
      { name: 'LadiesSKULLS', icon: LadiesSkulls , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/bafybeidwhkix7yyiyck5ptmt7jlhkgeqlwfcdhr2ehcbz3it6fmtdtimiu/",  json: 'https://ipfs.io/ipfs/bafybeigvhjthoir6garptu2vtfo2gvnzuv34o7c44vhboiimgkvmaxhizgyq/', contract:"0xb33c03c551018E6c14F137003160067795667C8a" },
      { name: 'CRXillions', icon: CRXillions , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/QmPMKJxS5dDTU77RpAsTycxdFTDfpZQ333aAQkacaVFGCD/",  json: '//', contract:"0xE1bAa24525B5f48F9B9df54802E44E85c0D81099" },
      { name: 'SpaceCRXillions', icon: SpaceCRXillion , route: '/Rampage/Legacy', ipfs:localStorage.getItem('NFTimage'),  json: '//', contract:"0xB6782F208ABe10E8962407d139f6698Bfc4FD13F" },
      { name: 'CrooksLegends', icon: Crooks , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/bafybeifrdavsclduxekxoaxso6fiinoiyzlyozyqe7p57xdwm4tysfh6vi/",  json: '', contract:"0x44102B7AB3e2B8edF77D188cd2B173ECBDA60967" },
      { name: 'EBisusBayVIPs', icon: EBVIP , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/QmXgyW7qLGy2iGX8EGSiNdSsgnei57HLrY24bZJHsHAJfx/",  json: '', contract:"0xE49709A3B59d708f50AA3712F2E5a84b7707664C" },
      { name: 'MOA', icon: MOA , route: '/Rampage/Legacy', ipfs:localStorage.getItem('NFTimage'),  json: '', contract:"0x903B9a9d58742d0699fbd5b0AC7C9C4000B7ce43" },
      { name: 'Wyverns', icon: Wyverns , route: '/Rampage/Legacy', ipfs:" https://cdn.ltsglxy.network/ipfs/bafybeiefxitaeyibws7f7e7n3ekqknk4idjjel7mbaevxqp65wd4cr74b4/",  json: '', contract:"0x13Eb301c0AC03D777dE915423B34195D56C14a21" },
      { name: 'Cr00ts', icon: Cr00ts , route: '/Rampage/Legacy', ipfs:" https://cdn.ltsglxy.network/ipfs/bafybeiele2aqjavbyloohjupcwovj5g4qcx5rge3c2tietq7cyhtl4qebq/",  json: '', contract:"0xca00aba7689e3c0f9f74e1f8d82e61c04c787734" },
      { name: 'Skully-X', icon: Skully , route: '/Rampage/Legacy', ipfs:"https://cdn.ltsglxy.network/ipfs/bafybeihqzzvab2ahfj2zsdl6z5pylyi5cy25652gs4efn5lucsxwoikofi/",  json: '', contract:"0x08FB1f6625d034019f2F6a3E70bab2FaA55CA068" },

     

    ];
  
  
  
  


  const handlePlayerTeamSelect = (teamName: string) => {
    setSelectedPlayerTeam(teamName);
    localStorage.setItem('playerTeam',teamName);
    localStorage.setItem('playerTeams', JSON.stringify(playerTeams));
 
  };

  const [enemyDataLoaded, setEnemyDataLoaded] = useState(false);
  const handleEnemyTeamSelect = (teamName: string) => {
    setSelectedEnemyTeam(teamName);
    localStorage.setItem('enemyTeam',teamName);
    localStorage.setItem('enemyTeams',JSON.stringify(enemyTeams));

   
      setTimeout(() => {
        // Set enemyDataLoaded to true when the data is loaded
        setEnemyDataLoaded(true);
      }, 5000); // Replace with your actual data loading code
  
  };
  
  useEffect(() => {
    const PlayDiv = document.getElementById('play');
    if (PlayDiv) {
      PlayDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },[selectedEnemyTeam && selectedPlayerTeam] ); 

  
  useEffect(() => {
    const PlayDiv2 = document.getElementById('enemies');
    if (PlayDiv2) {
      PlayDiv2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },[selectedPlayerTeam] ); 
 
  useEffect(() => {
    
 
  
  const handlePlayClick = () => {
    if (selectedPlayerTeam && selectedEnemyTeam) {
      // Logic for starting the game with the selected player and enemy teams
      // For now, let's just log the selected teams.
     // console.log('Selected Player Team:', selectedPlayerTeam);
     // console.log('Selected Enemy Team:', selectedEnemyTeam);
  

// Simulate loading enemy data (you should replace this with your actual data loading logic)

    } else {
      // Handle the case when the player hasn't selected both teams yet.
      <Alert>('Please select both your team and the enemy team before starting the game.')</Alert>;
    }
  };




//const TeamIcon= playerTeams.find((team) => team.name === selectedPlayerTeam);

}, [selectedPlayerTeam, selectedEnemyTeam])



useEffect(() => {
  if (address && account) {
const fetchPreviousScore = async () => {
  const query = new Moralis.Query(Rampage_LegacyTeams_R3);
  query.equalTo('TeamScores', 'Round 2');

  try {
    const previousScoreObject = await query.first();
//console.log(address);
//console.log(account);
    
    if (address!==null && !previousScoreObject) {
     
      // Save the exp if it's the first exp for the user
      const newTeamObject = new Rampage_LegacyTeams_R3();
      newTeamObject.set('TeamScores', 'Round 2');
     
      await newTeamObject.save();
      //console.log('new score object created');
    }
    if (previousScoreObject) {
      const attributes = previousScoreObject.attributes;
      setPreviousScoreAttributes(attributes);
    }
    
  } catch (error) {
    console.error('Error querying or saving score:', error);
  }
};

fetchPreviousScore();}
}, [account, address])


useEffect(() => {
  if (address && account) {
  const fetchPreviousScore1MA = async () => {
  //console.log('1MA running fetch team score');
    const query = new Moralis.Query(Rampage_1MATeams);
    query.equalTo('TeamScores', 'Round 2');
  
    try {
      const previousScoreObject1MA = await query.first();
  
      
      if (address &&account && !previousScoreObject1MA) {
        const playerData = [`{${selectedPlayerTeam}:0`];
        // Save the exp if it's the first exp for the user
        const newTeamObject = new Rampage_1MATeams();
        newTeamObject.set('TeamScores', 'Round 2');
      newTeamObject.set(selectedPlayerTeam, 0);
      newTeamObject.set(address,playerData);
      await newTeamObject.save();
      //console.log('new score object created');
      }
      if (previousScoreObject1MA) {
        const attributes = previousScoreObject1MA.attributes;
        setPreviousScoreAttributes1MA(attributes);
      }
    } catch (error) {
      console.error('Error querying or saving score:', error);
    }
  };
  
  fetchPreviousScore1MA();}
  }, [account, address])

const TeamSelectSoundRef = useRef<HTMLAudioElement | null>(null);
const TeamSelectMusicSoundRef = useRef<HTMLAudioElement | null>(null);

/*
const videoRef = useRef<HTMLVideoElement | null>(null);
const [videoEnded, setVideoEnded] = useState(false);






useEffect(() => {
const videoElement = videoRef.current;

if (videoElement) {
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
}, [videoRef, videoEnded]);

const handleVideoEnded = () => {
  setVideoEnded(true); // Set the videoEnded state to true when the video ends
  
};
const handleVideoStart = () => {
setTimeout(() => {
  if (videoRef.current) {
  videoRef.current.muted = false;
  videoRef.current.volume = 0.5;
}}, 100);};

*/

const [showHighScores, setShowHighScores] = useState(false);
const [showHighScores1MA, setShowHighScores1MA] = useState(false);
const handleToggle = () => {
  setShowHighScores(!showHighScores);


};

const handleToggle1MA = () => {
  setShowHighScores1MA(!showHighScores1MA);


};




const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
function Timer() {
 

  useEffect(() => {
  
    const targetDate = new Date('2023-11-28T18:00:00Z');
    const targetDate2 = new Date('2023-11-21T18:00:00Z');
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
    const timeDifference2 = targetDate2.getTime() - now.getTime();
   

    //This is for the tournament begin
    if (timeDifference <= 0 ) {

      const days = Math.floor(timeDifference2 / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference2 % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference2 % (1000 * 60)) / 1000);


      setTimeRemaining(`Tournament round 2 has begun, Join the fight! Round 2 ends in ${days} days, ${hours} hours and  ${minutes} minutes`);
      return;
    }
//This is for Prep phase (or tounament end)
    if (timeDifference > 0 && timeDifference2 < 0) {

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeRemaining(
      `Round 2 has ended! PREP and training phase for round 3 will begin in ${days} days, ${hours} hours,  ${minutes} minutes and ${seconds} seconds `
    );}
  }, []);

  return (
    <Box textAlign={'center'} justifyContent={'center'} fontWeight={'bold'} borderWidth='0.2vmax' borderRadius='5px' borderColor='green' width={'90%'} textColor={'green'} mt={6} fontSize={'1vmax'}>
     
      {timeRemaining}
    </Box>
  );
}

const handleGameMode=()=>{
  if (gameMode!=='One Man Army'){
setGameMode('One Man Army')}
else{
  setGameMode('Legacy')
}
//console.log('game mode set to :   ',gameMode)
//console.log('RCRO 1MA :   ',OneManArmyRCRO)
}



return (
  <VStack className='modal' alignContent={'center'}>
        <Text id='Rampage' textDecoration={'underline'} textAlign={'center'} fontSize={'2vmax'}>
        RECKLESS RAMPAGE
      </Text>
      <Spacer paddingBottom={'1vmax'}></Spacer>
      <HStack gap={'1vmax'} width='full' justifyContent={'left'}>
      <Button paddingRight={'2vmax'}   fontSize={'1vmax'} bgColor='black' color="orangered" variant="outline" onClick={() => setShowRampageInfo(true)} > info </Button>
      <Button  fontSize={'1vmax'} bgColor='black' color="orangered" variant="outline" onClick={() => handleGameMode()} > Game mode: {gameMode} </Button><Text></Text>
    {showRampageInfo && <RampageInfo />}</HStack>
      <HStack>
        
      <Text textAlign={'center'} fontSize={'1vmax'}>
        YOUR TOKENS 🪙 = {Tokens} / {TokenData} </Text> 
        <Button color={'orangered'} border={'none'} background='transparent' onClick={() => setRefresh((currentRefresh) => !currentRefresh)}><RepeatIcon boxSize={'1.5vmax'}/></Button>
        </HStack>
<Spacer paddingLeft={'2vmax'}></Spacer>
<Flex gap={'3vmax'} justifyContent={'center'} textAlign={'center'} fontSize={'1vmax'} flexDirection={'row'} height={'1vmax'} width='full' >
<Text>
        RCRO 💎 = {gameMode==='Legacy' ? RCRO : OneManArmyRCRO}</Text>
       
        <Flex height={'3vmax'}>
        <Text> EXP </Text> 
        <img style={{paddingBottom:'1.5vmax'}} src={exp} alt="exp"/>
        <Text> = {gameMode==='Legacy' ? EXP.toFixed(0) : OneManArmyEXP.toFixed(0)}</Text></Flex>
        <Text>ARMT 💰 = {ARMT.toFixed(0)}   </Text> </Flex>
     


        {address && account && TokensLoaded && (Tokens===0) && gameMode==='Legacy' ? (
       <TimerComponent address={address} refresh={refresh} setRefresh={setRefresh} />):'' }
        <Spacer paddingBottom='1vmax' />
     
     
    <Flex flexDirection='column' alignContent={'center'} justifyContent='center'>
      <Spacer paddingBottom='1vmax' />
   

      

      <Box alignSelf={'center'} width='100%' justifyItems={'center'} textAlign='center'>
        <VStack>
          <VStack alignItems="center">
            <Text  fontSize="1.2vmax" fontWeight="bold">
              Select Your Team:
            </Text>
            <Spacer paddingBottom='1vmax' />
          
            <Wrap justify="center" spacing={'-10'} width="100%">
      {playerTeams.map((team) => (
        <WrapItem key={team.name}>
          <Box
            boxSize={'7vmax'} // Adjust as needed
            cursor="crosshair"
            className={`team-box ${selectedPlayerTeam === team.name ? 'selected' : ''}`}
          
            onClick={() => {
              handlePlayerTeamSelect(team.name);
              if (TeamSelectSoundRef.current && TeamSelectMusicSoundRef.current) {
                TeamSelectSoundRef.current.currentTime = 0;
                TeamSelectSoundRef.current.play();
                TeamSelectSoundRef.current.currentTime = 0;
                TeamSelectMusicSoundRef.current.play();
              }
            }}
          >
      
            
                    <audio ref={TeamSelectMusicSoundRef}>
                   <source src={chooseteamsMusic} type="audio/mpeg" />
                   Your browser does not support the audio element.
                 </audio>

                <audio ref={TeamSelectSoundRef}>
                  <source src={ChooseTeams} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
          
              
              
                <VStack alignItems="center">
                <Box borderRadius="50%"  // Use borderRadius to make it round (50% of width/height)
      overflow="hidden"  // Hide anything that goes outside the rounded frame
      boxShadow="md"alignItems="center" boxSize='100%' display="flex" flexDirection="column">
                  <Image  src={team.icon} alt={team.name} boxSize="full" />
               
                 </Box>
                </VStack>
                </Box>
        </WrapItem>
      ))}
    </Wrap>
            
           
          
         
          </VStack>
          


{selectedPlayerTeam && selectedEnemyTeam && (
   <Box   className='modalBlue' alignSelf={'center'} padding={'1vmax'} paddingBottom={'2vmax'}>
  <HStack spacing={'-1'}>
   <VStack>
    <VStack borderRadius="50%"  // Use borderRadius to make it round (50% of width/height)
      overflow="hidden"  // Hide anything that goes outside the rounded frame
      boxShadow="md" boxSize="12vmax" >
   
        <Image id= 'chosenTeams' src={playerTeams.find((team) => team.name === selectedPlayerTeam)?.icon} alt={selectedPlayerTeam} boxSize="15vmax" />
       
        </VStack>
        <Spacer paddingBottom={'1vmax'}></Spacer>
        <Text fontWeight={'bold'}  fontSize={'1vmax'} textAlign="center">{selectedPlayerTeam}</Text>
        </VStack>
   
  
    <Image id='play' src={VS} alt={VS} boxSize="12vmax" />
    

  <VStack>
    <VStack  borderRadius="50%"  // Use borderRadius to make it round (50% of width/height)
      overflow="hidden"  // Hide anything that goes outside the rounded frame
      boxShadow="md" boxSize="12vmax" >
    
        <Image  id= 'chosenTeams' src={enemyTeams.find((team) => team.name === selectedEnemyTeam)?.icon} alt={selectedEnemyTeam} boxSize="15vmax" />
    
        
 
    </VStack>
    <Spacer paddingBottom={'1vmax'}></Spacer>
    <Text fontWeight={'bold'} fontSize={'1vmax'} textAlign="center">{selectedEnemyTeam}</Text>
    </VStack>
    </HStack>
    </Box>
 
)}



      
      {selectedPlayerTeam && selectedEnemyTeam && TokenData!=="0" && timeRemaining?.includes("Round 2 has ended!") &&(
        <VStack>
          {enemyDataLoaded  && (
        <Button width={'full'} textColor={'black'} variant="outline"  color='orangered' mt={6} fontSize={'1.1vmax'}  isDisabled={isTimerRunning && Tokens===0} as={Link} to={gameMode==='Legacy' ? '/Rampage/Legacy' :'/Rampage/One-Man-Army'} >
          Play
        </Button>)}
       <Timer /> </VStack>
      )}:   <Text  alignSelf='center' width={'full'} textColor={'white'} colorScheme='gray' mt={6} fontSize={'1.1vmax'} hidden={Tokens>0}>
     CHOOSE TEAMS OR await TOKEN RESET 
    </Text>
      

      <Spacer paddingBottom='1.5vmax' />

          <VStack alignItems="center">
            <Text id='enemies'fontSize="1.2vmax" fontWeight="bold">
              Select Enemy Team:
            </Text>
            <Spacer paddingBottom='1vmax' />

            <Wrap  justify="center" spacing={'-10'} width="100%">
            {enemyTeams.map((team) => (
                <WrapItem key={team.name}>
               <Box borderRadius="50%"  // Use borderRadius to make it round (50% of width/height)
      overflow="hidden"  // Hide anything that goes outside the rounded frame
      boxShadow="md" 
               boxSize={'7vmax'}
                 key={team.name}
                 cursor="crosshair"
                 className={`enemyteam-box ${selectedEnemyTeam === team.name ? 'selected' : ''}`}
              
                 onClick={() => { handleEnemyTeamSelect(team.name); if (TeamSelectSoundRef.current) {
                   TeamSelectSoundRef.current.currentTime = 0;
                   TeamSelectSoundRef.current.play();
                 }
               }}
             >   
                 
 
                 <audio ref={TeamSelectSoundRef}>
                   <source src={ChooseTeams} type="audio/mpeg" />
                   Your browser does not support the audio element.
                 </audio>
           
               
               
                 <VStack alignItems="center">
                <Box alignItems="center" boxSize='100%' display="flex" flexDirection="column">
                  <Image src={team.icon} alt={team.name} boxSize="full" />
               
                 </Box>
                </VStack>
                </Box>
        </WrapItem>
      ))}
    </Wrap>


          </VStack>
       
        
        </VStack>
        <Spacer paddingBottom='4vmax' />
      
        <Skilltree gamemode={gameMode} />
           <TopHighScores />
           <TopHighScores1MA />
        <Box width={'full'}  borderColor={'white'} borderWidth={'0.1vmax'} borderRadius={'1vmax'}>
        <Button  variant='outline' color='orangered' width={'full'} fontSize={'1vmax'} onClick={handleToggle}>
          {showHighScores ? 'Hide Legacy TEAM Scores' : 'Show Legacy TEAM Scores'}
        </Button>
        <Collapse in={showHighScores}>
  <Text textAlign="center" fontSize="2vmax" textDecorationLine={'underline'}>
    Legacy TEAM RANKING
  </Text>
  <Spacer paddingBottom='0.5vmax' />
  {previousScoreAttributes && (
  <VStack fontSize={'2vm'} alignContent="center">
    {playerTeams
      .map((team) => ({
        icon: team.icon,
        name: team.name,
        score: previousScoreAttributes[team.name] || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .map((team, index) => (
        <Box fontSize={'2vmin'}
          width="60%"
          paddingBottom={'2vmax'}
          key={team.name}
          display="flex"
          alignItems="center" // Center align items vertically
        >
          <span style={{ marginRight: '1vmax' }}>{index + 1}</span>
          <Avatar
            src={team.icon}
            size="md"
            name="rank"
            style={{ marginLeft: '1vmax', marginRight: '1vmax' }}
          />
          <span style={{ flex: 1, textAlign: 'center' }}>{team.name}</span>
          <span style={{ marginLeft: '4vmax' }}>{team.score}</span>
        </Box>
      ))}
  </VStack>
)}  </Collapse>
  
</Box>

<Box width={'full'}  borderColor={'white'} borderWidth={'0.1vmax'} borderRadius={'1vmax'}>
        <Button  variant='outline' color='orangered' width={'full'} fontSize={'1vmax'} onClick={handleToggle1MA}>
          {showHighScores1MA ? 'Hide One Man Army TEAM Scores' : 'Show One Man Army Team Scores'}
        </Button>
        <Collapse in={showHighScores1MA}>
  <Text textAlign="center" fontSize="2vmax" textDecorationLine={'underline'}>
    One man Army TEAM RANKING
  </Text>
  <Spacer paddingBottom='0.5vmax' />
  {previousScoreAttributes1MA && (
  <VStack fontSize={'2vm'} alignContent="center">
    {playerTeams
      .map((team) => ({
        icon: team.icon,
        name: team.name,
        score: previousScoreAttributes1MA[team.name] || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .map((team, index) => (
        <Box fontSize={'2vmin'}
          width="60%"
          paddingBottom={'2vmax'}
          key={team.name}
          display="flex"
          alignItems="center" // Center align items vertically
        >
          <span style={{ marginRight: '1vmax' }}>{index + 1}</span>
          <Avatar
            src={team.icon}
            size="md"
            name="rank"
            style={{ marginLeft: '1vmax', marginRight: '1vmax' }}
          />
          <span style={{ flex: 1, textAlign: 'center' }}>{team.name}</span>
          <span style={{ marginLeft: '4vmax' }}>{team.score}</span>
        </Box>
      ))}
  </VStack>
)}  </Collapse>
  
</Box>


       
      </Box>


    </Flex>
  </VStack>
);

};

export default GameLoader;
