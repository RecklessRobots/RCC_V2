/*eslint-disable*/
import { VStack, Heading, Button, Box,  Tag, Flex, Spacer, Link, Text, Alert, Table, Thead, Tbody, Tr, Th, Td, Collapse, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay  } from '@chakra-ui/react';
import { useEffect} from 'react';
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis';
import { HStack} from '@chakra-ui/react';
import player from "./player.png";
import enemy from "./enemy.png";
import React, { useState } from "react";
import "./Game.css";
import axios from "axios"
import NftGridG  from  '../../components/NFTGridG';
import Swords from './Swords.png';
import miniguns from './Miniguns.png';
import missiles from './Missilesystem.png';
import Star from './StarGlow.png';
import Melee from './Melee.png';
import chooseLegend from './chooseLegend.png';
import Moralis from 'moralis-v1';
import RampageInfo from './RampageInfo';








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
}


const AppG = () => 



{ 
 
 

  useEffect(() => {
    const gameDiv = document.getElementById('level');
    if (gameDiv) {
      gameDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, );
  
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [exp1, setExp1] = useState(0);
  const { account } = useMoralis();
  const address=account;
  const [Score, setScore] = useState<number>(1);
  const [EnemyPic, setEnemyPic] = useState("166");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Rerun, setRerun] = useState(false);
  const [LegendFromStorage, setLegendFromStorage] = useState('');
  const paddedLegendFromStorage = LegendFromStorage?.toString().padStart(4, '0');
  const [battleOutcome, setBattleOutcome] = useState<React.ReactNode>(null);
  const [selectedEnemy, setSelectedEnemy] = useState<string>('');



  if (LegendFromStorage !== '') {
  fetch('https://recklessrobots.mypinata.cloud/ipfs/QmUPfPrzpNmT4vYewhNG2qkergtHHBaMpvu1JNsgPKCapA/'+LegendFromStorage+'.json')
  .then(response => response.json())
  .then(TokenData => {
    localStorage.setItem('TokenData', JSON.stringify(TokenData));
  })
  .catch(error => console.error(error));
  const TokenData:any = localStorage.getItem('TokenData');
  const ParsedTokenData=JSON.parse(TokenData);
 
}

  useEffect(() => {
  setEnemyPic((Math.random()*100).toFixed(0));
  localStorage.setItem('EnemyPic',EnemyPic);
  }, [Score]);

 useEffect(() => {
  
  const GettingData = async () => {
    if (address){
    // Query the previous score of the user
    const query = new Moralis.Query(GameTeams2);
     await query.equalTo('player', address);
    
    try {
      const previousScoreObject = await query.first();
      
      if (previousScoreObject) {
        // Compare the new score with the previous score
        const previousScore = previousScoreObject.get('score');
        localStorage.setItem('previousScore', previousScore);
        if (previousScore>0)
        setScore(previousScore);
        else {
          setScore(1);
        }
         
        
      } else {
        // Save the score if it's the first score for the user
        const newScoreObject = new GameTeams2();
        newScoreObject.set('player', address);
        newScoreObject.set('score', Score);
        await newScoreObject.save();
        setScore(Score+1-1);
      }
    } catch (error) {
      console.error('Error querying or saving score:', error);
    }
  
 
  
   }else 
   return 
     <Alert>Sign in and reload</Alert>}
   GettingData();
 
 }, [account])
 
 

 
  
interface GamesAttributes {
  className: 'Game';
  player: String;
  score: number;
  exp: number;
}


interface GameTeams2 extends Moralis.Object<GamesAttributes> {
 
}

const GameTeams2 = Moralis.Object.extend({
  className: 'Games'

});

useEffect(() => {
  const SettingExp = async () => {
    // Query the previous score of the user
    const query = await new Moralis.Query(GameTeams2);
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
            await previousExpObject.save();
            setExp1(exp1);
          } else {
            setExp1(previousExp);
          }
        }
      } else {
        // Save the exp if it's the first exp for the user
        const newExpObject = new GameTeams2();
        newExpObject.set('player', address);
        newExpObject.set('exp', 0);
        setExp1(0);
        await newExpObject.save();
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
 
  const query = await new Moralis.Query(GameTeams2);
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
        console.log('Level:', Score);}
       
       
      }
    } else {
      // Save the score if it's the first score for the user
      const newScoreObject = new GameTeams2();
      newScoreObject.set('player', address);
      newScoreObject.set('score', Score);
      await newScoreObject.save();
      console.log('First score saved:', Score);
    }

  } catch (error) {
    console.error('Error querying or saving score:', error);
  };}
  
SettingData();

}, [Score || account || address ])


  
useEffect(() => {

  if (!address){
  location.href='https://reckless-command-center.web.app/';}
  return 
    <Alert>Sign in and reload</Alert>
  

  
}, [])

const [ChosenEnemyHealth, setChosenEnemyHealth]=useState(0);
const [EnemyScore,setEnemyScore]=useState(0);
const [ChosenEnemyExp,setChosenEnemyExp]=useState(0);

const fetchTopHighScores = async () => {
  const query = new Moralis.Query(GameTeams2);
  query.descending('score');
  query.limit(10);

  try {
    const highScoreObjects = await query.find();
    return highScoreObjects.map((scoreObject) => ({
      player: scoreObject.get('player'),
      score: scoreObject.get('score')
    }));
  } catch (error) {
    console.error('Error fetching top high scores:', error);
    return [];
  }
};

const TopHighScores = () => {
  const [highScores, setHighScores] = useState<{ player: string; score: number }[]>([]);
  const [showHighScores, setShowHighScores] = useState(false);

  useEffect(() => {
    fetchTopHighScores().then(setHighScores);
  }, []);


  const formatAddress = (address:string) => {
    if (!address) {
      return '';
    }
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const handleToggle = () => {
    setShowHighScores(!showHighScores);


  };
  // const handleEnemy = async (player: string) => {
   // setSelectedEnemy(player);
  //};
  
  /*
  useEffect(() => {
    const GettingEnemyData = async () => {
      if (selectedEnemy) {
        const query = new Moralis.Query(GameTeams2);
        await query.equalTo('player', selectedEnemy);
  
        try {
          const EnemyObject = await query.first();
  
          if (EnemyObject) {
            const EnemyExp = await EnemyObject.get('exp');
            const EnemyScore = await EnemyObject.get('score');
            console.log(EnemyExp);
            console.log(EnemyScore);
            setEnemyScore(EnemyScore);
            setChosenEnemyExp(EnemyExp);
  
            const url1 = "https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xf96ec7C11D311920833753FAB9b174B6FD53517E&address=";
            const url2 = selectedEnemy;
            const url3 = "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC";
  
            const response = await axios.get(url1 + url2 + url3);
            console.log('this is axios setting enemy health');
            const fetchedEnemyData = response.data.result;
            setChosenEnemyHealth(fetchedEnemyData);
            console.log(response.data.result);
            console.log(ChosenEnemyHealth);
          }
        } catch (error) {
          console.error('Error fetching enemy:', error);
        }
      }
    };
  
    GettingEnemyData();
  }, [selectedEnemy]);
*/
  return (
    <Box maxWidth={'full'} justifyItems={'center'} borderRadius="lg" padding="0.1vw" width="full" display="flex" flexDirection="column" alignItems="center">
      <Heading size="lg" marginBottom="10px">
       
      </Heading>
      <Button width={'full'} fontSize={'1vw'} onClick={handleToggle}>
        {showHighScores ? 'Hide High Scores' : 'Show High Scores'}
      </Button>
      <Collapse in={showHighScores}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ranking</Th>
              <Th>Player</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {highScores.map((highScore, index) => (
              <Tr key={index}  // onClick={() => handleEnemy(highScore.player)} 
              >
                <Td>{index+1}.</Td>
                <Td>{formatAddress(highScore.player)}</Td>
                <Td>{highScore.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  );
};



    
  const [armour, setArmour] = useState('');
  const [headGear, setHeadGear] = useState(''); 
  const [backGear, setBackGear] = useState(''); 
  const [frontGear, setFrontGear] = useState(''); 
  const [glow, setGlow] = useState(''); 
  const [battleFlag, setBattleFlag] = useState(''); 
  const [classType, setClassType] = useState(''); 
  const [background, setBackground] = useState(''); 
  const [Skill, setSkill]=useState(0.5);
 

 


const Character = (props: { name: string; image: string; attack: AttackType; isAttacking: boolean; healthLost: number }) => {
  const [repairModules, setRepairModules]=useState(2);
  const [Skill, setSkill]=useState(0.5);
  const [EnableSkull, setEnableSkull]=useState(false);
const [Lasers, setLasers]=useState(0);

  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain] = useState<string>('0x19');
  const [searchChain, setSearchChain] = useState<string>('0x19');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');
  const tokenaddresses=['0xf96ec7C11D311920833753FAB9b174B6FD53517E'];
  useEffect(() => {
  const storedLegendData:any = localStorage.getItem('LegendsData') ?? '[]';
  const data=JSON.parse(storedLegendData);
  const NumberOfLegends = data.result ? data.result.length : 0;
  localStorage.setItem('tokens2',NumberOfLegends);
  const LegendFromStorage1 = localStorage.getItem('StoredLegend') || '';
  setLegendFromStorage(LegendFromStorage1);
  const paddedLegendFromStorage = LegendFromStorage1?.toString().padStart(4, '0');
    const TokenData:any = localStorage.getItem('TokenData');
    const ParsedTokenData=JSON.parse(TokenData);
    

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



 



useEffect(() => {
  if (armour && armour.includes("Camo")) {
    setSkill(0.6);
  }else {
    setSkill(0.5);
  }
}, );

  return (
    <div style={{width:'100%'}} className={`character ${props.isAttacking ? "attacking" : ""}`}>
      <h3>{props.name}</h3>
      <img
  className={props.healthLost > 0 ? "health-lost" : ""}
  width='100%'
  height='auto'
  src={
    paddedLegendFromStorage === "0000"
      ? chooseLegend
      : "https://recklessrobots.mypinata.cloud/ipfs/Qmbf4ETyj5aH7ZDrQJde8ZmRZGxsepTufRM7DT9XqKaSRC/" +
        paddedLegendFromStorage +
        ".png".replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')
  }
/>

      <Text>{props.attack}</Text>
      <p> 🪙 = {tokens}</p>
    </div>
  );
};

const EnemyCharacter = (props: { name: string; image: string; attack: AttackType; isAttacking: boolean; healthLost: number }) => {

const enemypic=localStorage.getItem('EnemyPic');
  return (
    <div className={`character ${props.isAttacking ? "attacking" : ""}`}>
      <h3>{props.name}</h3>
    
  <img  className={props.healthLost > 0 ? "health-lost" : "somename"}
    width='100%'
    height='auto'
    src={"https://recklessrobots.mypinata.cloud/ipfs/QmTKu16wVpRgNifCFRhtfLf73KxoaJHE1j15RvurfgTe4c/"+enemypic+".png".replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}
  />

      <Text>{props.attack}</Text>
      <Text>💀💀💀</Text>
      
   
    </div>
    
  );
};

const storedLegendData:any = localStorage.getItem('LegendsData') ?? '[]';
const data=JSON.parse(storedLegendData);
const NumberOfLegends = data.result ? data.result.length : 0;


const [timesLost, setTimesLost] = useState(0);
const [tokens, setTokens] =useState(NumberOfLegends);
const [lost, setLost]=useState(false);
const [Remcomphealth, setRemcomphealth]=useState(0)

 const Game = () => {
  
  const { account } = useMoralis();
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



  useEffect(() => {
     setScore(Score);
     setTokens(localStorage.getItem('tokens'));
     console.log('gaming tokens:',String(tokens));

  }, []);
  


  const storedLegendData:any = localStorage.getItem('LegendsData') ?? '[]';
  const data=JSON.parse(storedLegendData);
  const NumberOfLegends = data.result ? data.result.length : 0;

  const TokenData:any = localStorage.getItem('TokenData');
  const ParsedTokenData=JSON.parse(TokenData);
 
const [StatsScore,setStatsScore]=useState(Score);
  const [playerAttack, setPlayerAttack] = useState<AttackType>(AttackType.Missiles);
const [computerAttack, setComputerAttack] = useState<AttackType>(AttackType.Missiles);
const [playerHealth, setPlayerHealth] = useState(90 + (NumberOfLegends * 10));


const [isAttacking, setIsAttacking] = useState(false);
const [message, setMessage] = useState("");
const [message1, setMessage1] = useState("");
const [gameOver, setGameOver] = useState(true);
const [gameOverMessage, setgameOverMessage] = useState("");
const [playerHealthLost, setPlayerHealthLost] = useState(0);
const [computerHealthLost, setComputerHealthLost] = useState(0);
const [HeldModules, setHeldModules] = useState(0);
const [Lasers, setLasers] = useState(0);
const [EnableSkull, setEnableSkull] = useState(false);
const [EnemySkill, setEnemySkill] = useState(0.5 + ((StatsScore || 1) * 0.015));
const [EnemyHeldModules, setEnemyHeldModules] = useState((StatsScore || 1) / 2);

const [computerHealth, setComputerHealth] = useState(0);


useEffect(() => {
  if (lost===false)
setComputerHealth((100 + ((StatsScore || 1) * (0.1 + Math.random() / 4 * 40))));
if (lost===true)
setComputerHealth(Remcomphealth);

console.log('lost so this works, enemy hp:',Remcomphealth);

}, [lost]);
/*
useEffect(() => {
  setStatsScore(EnemyScore);
  setComputerHealth(100 + ((90 + (ChosenEnemyHealth * 10))));
  setEnemyHeldModules(3);
  setEnemySkill(0.5 + ((EnemyScore || 1) * 0.015));
}, [ChosenEnemyHealth, EnemyScore]);
*/
  useEffect(() => {
    if (battleFlag && battleFlag.startsWith("Battle")) {
      setHeldModules(3);}
   
    
    else 
      setHeldModules(2);
  
  }, []);


  
  useEffect(() => {
    if ((headGear && headGear.includes("Skull"))||headGear.includes('Laser')) {
      setEnableSkull(true);
      setLasers(1);
    }
  }, [headGear]);
  
  useEffect(() => {
    if (armour && armour.includes("Camo")) {
      setSkill(0.6);
    }
    else {
      setSkill(0.5);
    } 
  }, [armour]);
  
  useEffect(() => {
    if (paddedLegendFromStorage === "0000") {setPlayerHealth(1)
    }
  }, []);

  const [minPlayerAttack, setMinPlayerAttack] = useState(0);
const [maxPlayerAttack, setMaxPlayerAttack] = useState(0);  
const [minComputerAttack, setMinComputerAttack] = useState(0);
const [maxComputerAttack, setMaxComputerAttack] = useState(0);
const [exp, setExp] = useState(0);


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

// Output the results

// PLAYER ATTACKS
if (attackType === AttackType.repairModule && HeldModules > 0) {
  RepairModules();
  setHeldModules(-1);
  setMessage1("You managed to repair during the combat");
}

if (attackType === AttackType.Missiles) {
  if (Math.random() < (Skill + 0.1)) {
    computerLost = ((0.1 + Math.random() * 0.4) * 30 + (1 * Score)+(1*(exp1/100)));
    setExp(exp+(computerLost/2));
    setComputerHealth(computerHealth - computerLost);
    setMessage1("Devastating missile attack of " + computerLost.toFixed(0) + " damage!");
  } else {
    setMessage1('Missiles intercepted by enemy shields');
  }
}

if (attackType === AttackType.Miniguns) {
  if (Math.random() < (Skill - 0.1)) {
    computerLost = ((0.1 + Math.random() * 0.4) * 50 + (1 * Score)+(1*(exp1/100)));
    setExp(exp+(computerLost/2));
    setComputerHealth(computerHealth - computerLost);
    setMessage1("The bullets of your heavy miniguns pierce the armor of your enemy, causing " + computerLost.toFixed(0) + " damage!");
  } else {
    setMessage1('The enemy managed to take cover, causing your miniguns to miss');
  }
}

if (attackType === AttackType.Melee) {
  if (Math.random() < (Skill + 0.4)) {
    computerLost = ((0.1 + Math.random() * 0.4) * 10 + (1 * Score)+(1*(exp1/100)));
    setExp(exp+(computerLost/2));
    setComputerHealth(computerHealth - computerLost);
    setMessage1("You tear the enemys armour with your blade causing a hit of " + computerLost.toFixed(0) + " to the enemy!");
} else {
    setMessage1("Your blade misses the enemy!");
}}

if (attackType === AttackType.RayOfDeath && Lasers > 0) {
  computerLost = computerHealth * 0.40;
  setExp(exp+(computerLost/2));
  setComputerHealth(computerHealth - computerLost);
  setMessage1("The Ray of Death tears through the melting armor of the enemy, causing " + computerLost.toFixed(0) + " damage!");
  setLasers(0);
} else {
  setMessage1("");
}

// ENEMY ATTACKS
// ENEMY REPAIR MODULES
if (computerAttack === AttackType.repairModule && EnemyHeldModules > 0) {
  setComputerHealth(computerHealth + 20 + StatsScore);
  setEnemyHeldModules(EnemyHeldModules-1);
  setMessage("The enemy managed to repair during the combat");
}

// OTHER ENEMY ATTACKS
if (computerAttack !== AttackType.repairModule && computerAttack !== AttackType.Melee) {
  if (Math.random() < EnemySkill) {
    playerLost = ((0.1 + Math.random() * 0.4) * 50 + (1.35 * StatsScore));
    setPlayerHealth(playerHealth - playerLost);
    setMessage("The enemy strikes a gruesome hit of " + playerLost.toFixed(0) + " damage to you!");
  } else {
    setMessage("What a waste of ammo! The enemy missed you");
  }
}

// ENEMY MELEE ATTACKS
if (computerAttack === AttackType.Melee) {
  if (Math.random() < (EnemySkill + 0.3)) {
    playerLost = ((0.1 + Math.random() * 0.4) * 20 + (1.35 * StatsScore));
    setPlayerHealth(playerHealth - playerLost);
    setMessage("The enemy's blade pierces your armor, causing damage of " + playerLost.toFixed(0) + " to you!");
  }
   else {
    setMessage("The enemy's blade misses you!");
  } 
   
  }


  if (playerHealth <= 0) {
    setDisabled(true);
    setGameOver(true);
    setScore(Score);
    setTimesLost(timesLost+1);
   //console.log('inside',timesLost);
   setTokens(tokens-1);
  // console.log(tokens-1, 'timeslost');
   localStorage.setItem('tokens',String(tokens-1));
   setRemcomphealth(computerHealth);
  setLost(true);

  setBattleOutcome(
    <Tag
    fontSize={'2vw'}
    colorScheme='red'
    width={'full'}
      fontWeight= 'bold'
      animation= 'explode 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) both'
      color= 'black'
      textAlign={'center'}
      justifyContent={'center'}
      >
          You lose, rest in pieces, legend!
        </Tag>
  );

  if (tokens <= 0) {
    setTokens(NumberOfLegends);
    localStorage.setItem('tokens',NumberOfLegends)
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
  }
    setLost(false);

    
    return (
      setBattleOutcome(
        <Tag
        fontSize={'2vw'}
        colorScheme='pink'
        width={'full'}
          fontWeight= 'bold'
          animation= 'explode 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) both'
          color= 'black'
          textAlign={'center'}
          justifyContent={'center'}
          >
              YOU RUN OUT OF TOKENS, GAME RESET
            </Tag>)
   
    );
  }
  

} else if (computerHealth <= 0 ) {
  setDisabled(true);
  setLost(false);
  if (selectedEnemy !== "") {
    setExp1(exp1 + ChosenEnemyExp * 0.1);
    setExp(0);
  } else {
    setExp1(exp1 + exp/2);
    setExp(0);
    setScore(Score + 1);
    setTimesLost(timesLost);
    console.log('inside',timesLost);
    setTokens(tokens);
    console.log(tokens, 'timeslost');
    localStorage.setItem('tokens',String(tokens));
    
  }
  setGameOver(true);
  
  setBattleOutcome(
    <Tag
    fontSize={'2vw'}
    colorScheme='green'
   width={'full'}
      fontWeight= 'bold'
      animation= 'explode 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) both'
      textAlign={'center'}
      justifyContent={'center'}
     
      >
    You are victorious Legend!
  </Tag>

  
  );
}

setComputerHealthLost(computerLost);
      setPlayerHealthLost(playerLost);
      setIsAttacking(false);
    }, 500);};
  
    console.log('outside',timesLost);
  
  
//    if (gameOver===true){
  //    useEffect(() => {
    //    setIsModalOpen(true);
      
      //}, [])
      
    //}
  const rematch =  ()  => {
    
    setPlayerAttack(AttackType.Missiles);
    setComputerAttack(AttackType.Missiles);
    setGameOver(false);
    setMessage("");
    setMessage1("");
    localStorage.setItem('tokens', NumberOfLegends);

};

const RepairModules = () => {
  if (HeldModules<=0) {setMessage("OUT OF REPAIR MODULES")
}

else { 
const newHealth = playerHealth + 50;
setPlayerHealth(newHealth);
setHeldModules(HeldModules - 1);}}

const [isDisabled, setDisabled] = useState(false);
 
const playerHealthPercent = (playerHealth / 100) * 100;
const computerHealthPercent = (computerHealth / 100) * 100;

const squareStyle = {
  height: '1.7vw',
  width: '1.5vw',
  borderRadius: '0.1vw',
  margin: '0.3vw',

}
if (!address  || !NumberOfLegends){
    
  return (
  <VStack alignItems={'center'}>
  <Box  alignItems={'center'}>
  <Text> PLEASE LOGIN AND REFRESH</Text>
  </Box>
  </VStack>)}



const [showRampageInfo, setShowRampageInfo] = useState(false);



return (

  <VStack id='game' alignItems={'center'}>
   



  {searchAddress && (
    <Box pt={1}>
      <Heading size={'md'} >
      <Tag  fontSize='1vw' colorScheme={'whiteAlpha'}>PLAYER ADDRESS: {address}</Tag> 
   
      </Heading>
     
    </Box>
  )}
 
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
<ModalOverlay />
<ModalContent>
<ModalHeader>Choose your Legend</ModalHeader>
<ModalCloseButton />
<ModalBody>
<NftGridG address={address} chain='0x19'></NftGridG>
</ModalBody>
</ModalContent>
</Modal>
   
<div className="game" id='game'  style={{ width: '100%', height: '120vh', overflow: 'auto', zoom: '100%' }}>
  <VStack width='100%' fontSize='1vw' padding='1vw'>
    <Tag id='level' justifyContent={'center '} height={'1.1vh'} width={'full'} size='lg'  textAlign='center' fontSize='1vw' textColor={'grey'} backgroundColor={'black'}>Level {Score}</Tag>
    <HStack>
      
        <Flex paddingTop={'2%'} height='100%' width='5%' direction={'column'}>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 90 ? 'green' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 80 ? 'green' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 70 ? 'green' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 60 ? 'green' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 50 ? 'yellow' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 40 ? 'yellow' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 30 ? 'orange' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 20 ? 'orange' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 10 ? 'red' : 'grey' }}></div>
            <div style={{ ...squareStyle, backgroundColor: playerHealthPercent > 0 ? 'red' : 'grey' }}></div>
          
        </Flex>
     
<VStack width={'50%'}>
      <Character name="Player" image={player} attack={playerAttack} isAttacking={isAttacking} healthLost={playerHealthLost} />
  
     <Box backgroundColor={'black'} borderWidth="1px" borderRadius="lg" p={1} width={'full'}>
  <VStack spacing={2} align="center">
    <Text fontSize="0.8vw" fontWeight="bold">
      Stats
    </Text>
  
    <HStack width='100%'>
    <Text width= '50% 'className='PlayerTags'>HP: <br></br>{playerHealth.toFixed(0)}</Text>  <Text width= '50%' className='PlayerTags'>Accuracy: <br></br>{Skill}</Text>
    </HStack>

    
    <HStack width='100%'>
    <Text width= '50% 'className='PlayerTags'>Repairs: <br></br>{HeldModules}</Text>  <Text width= '50%' className='PlayerTags'>Lasers: <br></br>{Lasers}</Text>
    </HStack>
    
    <HStack width='100%'>
    <Text width= '50% 'className='PlayerTags'>Attack: <br></br>{minPlayerAttack.toFixed(0)}-{maxPlayerAttack.toFixed(0)}</Text>  <Text width= '50%' className='PlayerTags'>EXP: <br></br>{exp1.toFixed(0)}</Text>
    </HStack>
 

  </VStack>
</Box>
      </VStack>
      
      <VStack width={'50%'}>
      <EnemyCharacter name="Enemy" image={enemy} attack={computerAttack} isAttacking={isAttacking} healthLost={computerHealthLost} />
      <Box backgroundColor={'black'} borderWidth="1px" borderRadius="lg" p={1} width={'full'}>
  <VStack spacing={2} align="center">
    <Text fontSize="0.8vw" fontWeight="bold">
      Stats
    </Text>
    <HStack width='100%'>
    <Text width= '50% 'className='EnemyTags'>HP: <br></br>{computerHealth.toFixed(0)}</Text>  <Text width= '50%' className='EnemyTags'>Accuracy: <br></br>{EnemySkill.toFixed(1)}</Text>
    </HStack>
  
    <HStack width='100%'>
    <Text  width= '50%' className='EnemyTags' >Repairs: <br></br>{EnemyHeldModules.toFixed(0)}</Text>
    <Text width= '50%' className='EnemyTags' >Attack: <br></br>{minComputerAttack.toFixed(0)}-{maxComputerAttack.toFixed(0)}</Text>
    </HStack>
    <Text className='EnemyTags' > <br></br><br></br> </Text>
   
 
  </VStack>
</Box>



      </VStack>
    
      <Flex paddingTop={'2%'} height={'100%'} width='5%' direction={'column'}>
      
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 90 ? 'green' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 80 ? 'green' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 70 ? 'green' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 60 ? 'green' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 50 ? 'yellow' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 40 ? 'yellow' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 30 ? 'orange' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 20 ? 'orange' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 10 ? 'red' : 'grey' }}></div>
    <div style={{ ...squareStyle, backgroundColor: computerHealthPercent > 0 ? 'red' : 'grey' }}></div>
 
  </Flex>
 
      
    </HStack>
    <HStack justifyContent='center'>
     
     
    </HStack>
  
    {!gameOver ? (
      <Flex width={'full'} fontSize='1vw' justifyContent='space-evenly' >
        <Box  width='fit-content' flexDirection='row' >
          <HStack  justifyContent={'space-evenly'}>
            <button style={{width:'20%', height:'auto'}} className='Fbuttons' disabled={isAttacking || !EnableSkull || Lasers<=0 } onClick={() => attack(AttackType.RayOfDeath)}>
              <img src={Swords} alt='RayOfDeath' />
            
            </button>
            <button style={{width:'20%', height:'auto'}} className='Fbuttons' disabled={isAttacking} onClick={() => attack(AttackType.Missiles)}>
              <img src={missiles} alt='ice blast' />
           
            </button>
            <button style={{width:'20%', height:'auto'}} className='Fbuttons' disabled={isAttacking} onClick={() => attack(AttackType.Miniguns)}>
              <img src={miniguns} alt='Miniguns' />
           
            </button>
            <button style={{width:'20%', height:'auto'}} className='Fbuttons' disabled={isAttacking} onClick={() => attack(AttackType.Melee)}>
              <img src={Melee} alt='Melee' />
            
            </button>
            <button style={{width:'20%', height:'auto'}} className='Fbuttons' disabled={isAttacking} onClick={() => RepairModules()}>
              <img src={Star} alt='repair' />
          
            </button>
            </HStack>
            <Box textAlign={'center'} fontSize='0.7vw' marginTop='1vw'>
      <p>{message1}</p>
      <p>{message}</p>
    </Box>

      
        
          <Box width="full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
  <Button width={'-moz-fit-content'} fontSize={'1vw'} onClick={() => setGameOver(true)}>Quit game</Button>
</Box>
        </Box>
      </Flex>
    ) : (
      <h3>{playerHealth < 0 || computerHealth <=0 ? gameOverMessage : gameOverMessage }</h3>
    )}
  {gameOver && (
    <>
    

    <Box width="full">
  
    <Box fontSize='1vw' marginTop='1vw'>
      <p>{message1}</p>
      <p>{message}</p>
    </Box>

    <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsModalOpen(true)
        }}
      >
       <VStack>
  {battleOutcome}
  <Button padding='1' type="submit" fontSize={'1.3vw'} boxSize='full' minWidth={'-moz-fit-content'} color="orangered">
    CHOOSE YOUR LEGEND
  </Button>
</VStack>
      </form>
    </Box>
<HStack>

    <Button fontSize={'1vw'} onClick={rematch}>To Battle! </Button>
    <Button fontSize={'1vw'} onClick={() => setShowRampageInfo(true)} >how to play </Button>
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
  <Game />
  
 
  )};
export default AppG;


 
  




function useNFT(address: string, id: string): { data: any; error: any; isLoading: any; } {
  throw new Error('Function not implemented.');
}
 
 