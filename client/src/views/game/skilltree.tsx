/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack, Icon, VStack, Avatar, Tag, TagLabel } from '@chakra-ui/react';
import Moralis from 'moralis-v1';
import { useMoralis } from 'react-moralis';
import { FaArrowRight} from 'react-icons/fa'; // You can use any icon library you prefer
import ExpPic from './exp.png';
import Guns from './Miniguns.png';
import Missiles from './Missilesystem.png'
import Lasers from './Swords.png'
import health from './health.png'
import repairs from './StarGlow.png'
import Hearts from './hearts';
import MeltDowns from './meltdowns';
import { Link } from 'react-router-dom';
import MissilesEXP1 from '../game/Clicker/CBG6.webp'
import MissilesEXP from '../game/fireborder.gif'
import BG from './rampagePoster.jpg'

let gamemode=String;
let EXP:String;

const SkillTree = ({ gamemode }: { gamemode: string }) => {

  const { account } = useMoralis();
  const address = String(account)
  const [ScoresSaved, setScoresSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [Score, setScore]=useState(0);
  const [attackLevel, setAttackLevel] = useState(0);
  const [skillLevel, setSkillLevel] = useState(0);
  const [lasersLevel, setLasersLevel] = useState(0);
  const [Meltdowns, setMeltdowns]=useState(0);
  const [HealthLevel, setHealthLevel]=useState(0);
  const [RepairModules, setRepairModules]=useState(0);
  const [EXP, setEXP] = useState(0);
  const [ArmoryTokens, setArmoryTokens]=useState(0);


  const [StatsLoaded, setStatsLoaded]=useState(false);

  



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
//console.log(address, account);


//console.log('is modal open? ',isOpen);

//console.log(HealthLevel);

useEffect(() => {
 

  if (account && ScoresSaved!==true){
    //console.log('no account or stats already saved',account, ScoresSaved);
  } 
  else{
    //console.log('is modal open from getting stats? ',isOpen);
  const GettingStats = async () => {
   

  const query = await new Moralis.Query(gamemode==='Legacy' ? RampageLegacy_R3 : RampageOneManArmy_R3 );
  await query.equalTo('player', address);
  const queryC = await new Moralis.Query(RampageClicker);
  await queryC.equalTo('player', address);
 
  try {
    const previousStatsObject = await query.first();
    const previousClickerStatsObject = await queryC.first();
//console.log(previousTokenObject);
    if (previousStatsObject) {
      const expFromStorage = previousStatsObject.get('exp'); 
      setEXP(expFromStorage);
      const skillFromStorage = previousStatsObject.get('skillLevel'); 
      setSkillLevel(skillFromStorage);
     const attackFromStorage = previousStatsObject.get('attackLevel'); 
     setAttackLevel(attackFromStorage);
     const lasersFromStorage = previousStatsObject.get('lasersLevel'); 
     setLasersLevel(lasersFromStorage);
     const previousScore = await previousStatsObject.get('score');
     setScore(previousScore);
     const previousMeltdowns = await previousStatsObject.get('Meltdowns');
     setMeltdowns(previousMeltdowns);


     const previousHealthLevel = await previousStatsObject.get('healthLevel');
     setHealthLevel(previousHealthLevel);

  

     const previousRepairModules=await previousStatsObject.get('repairmodules');
     setRepairModules(previousRepairModules);
    }
    if (previousClickerStatsObject) {
    const previousArmoryTokens=await previousClickerStatsObject.get('armorytokens');
    setArmoryTokens(previousArmoryTokens);
    //console.log('armorytokens fetched and saved');
    }
     
    // console.log(exp);
    

    } catch (error) {
        console.error('Error querying or saving score:', error);

      } 
      }
      setStatsLoaded(true);
      GettingStats()
      //console.log(ArmoryTokens);
    }
   
    },[isOpen])



    useEffect(() => {
        const SettingStats = async () => {
        
       if (address&&isOpen&&StatsLoaded){
        
        const query = await new Moralis.Query(gamemode==='Legacy' ? RampageLegacy_R3 : RampageOneManArmy_R3 );
        await query.equalTo('player', address);
        
        const queryC = await new Moralis.Query(RampageClicker);
        await queryC.equalTo('player', address);
       
        try {
          const previousTokenObject = await query.first();
          const previousClickerSetObject = await queryC.first();
     //console.log(previousTokenObject);
     
          if (previousTokenObject) {
            const skillFromStorage = previousTokenObject.get('skillLevel'); 
            const attackFromStorage = previousTokenObject.get('attackLevel'); 
            const lasersFromStorage = previousTokenObject.get('lasersLevel'); 
            const expFromStorage = previousTokenObject.get('exp'); 
            const previousScore = await previousTokenObject.get('score');
            const previousMeltdowns = await previousTokenObject.get('Meltdowns');
           const previousHealthLevel = await previousTokenObject.get('healthLevel');
           const previousRepairModules=await previousTokenObject.get('repairmodules');
           const previousArmoryTokens=(previousClickerSetObject ? await previousClickerSetObject.get('armorytokens') : 0);
        
        if ((expFromStorage>EXP && EXP!==0) || (previousArmoryTokens>ArmoryTokens && ArmoryTokens!==0))
    {previousTokenObject.set('exp',EXP);
    previousClickerSetObject?.set('armorytokens',ArmoryTokens);
    
    if (skillFromStorage<skillLevel){
     
        previousTokenObject.set('skillLevel',skillLevel);
        await previousTokenObject.save();
    }
    if (lasersFromStorage<lasersLevel){
       
        previousTokenObject.set('lasersLevel',lasersLevel);
        await previousTokenObject.save();
    }
    if (attackFromStorage<attackLevel){
        
        previousTokenObject.set('attackLevel',attackLevel);
        await previousTokenObject.save();
    }
    if (previousHealthLevel<HealthLevel){
        
      previousTokenObject.set('healthLevel',HealthLevel);
      await previousTokenObject.save();
  }
  if (previousRepairModules<RepairModules){
        
    previousTokenObject.set('repairmodules',RepairModules);
    await previousTokenObject.save();
}
if (previousScore>Score){
        
  previousTokenObject.set('score',Score);
  await previousTokenObject.save();
}

if (previousArmoryTokens>ArmoryTokens &&ArmoryTokens!==0){
  previousClickerSetObject ? previousClickerSetObject.set('armorytokens',ArmoryTokens):console.log('no data from clicker found');
  previousClickerSetObject ? await previousClickerSetObject.save(): console.log('nothing to save');
}
   
//console.log('you have spent ')
}
else { setEXP(expFromStorage)}}


     //      console.log('exp from storage:',exp);

          } catch (error) {
              console.error('Error querying or saving score:', error);
            };} setScoresSaved(true);}
          SettingStats();
         
         //console.log('armorytokens spent');
          }, [EXP,ArmoryTokens])
      
   // console.log('You have ',exp, '  EXP to spend or')
//console.log(RepairModules,'repairmods');
const [showMeltDowns, setShowMeltDowns]=useState(false);

   const IniateMeltdown = async ()=>{
    
    setShowMeltDowns(true);
setScore(0);
setMeltdowns(Meltdowns+1);
setHealthLevel(HealthLevel+0.1);
const query = await new Moralis.Query(gamemode==='Legacy' ? RampageLegacy_R3: RampageOneManArmy_R3);
await query.equalTo('player', address);

try {
  const previousTokenObject = await query.first();
//console.log(previousTokenObject);
  if (previousTokenObject) {
    previousTokenObject.set('Meltdowns',Meltdowns+1);
    previousTokenObject.set('score',0);
    previousTokenObject.set('healthLevel',(HealthLevel+0.1));
    //console.log('Meltdowns and new health saved');
    await previousTokenObject.save();
  }

   }
   catch (error) {
    console.error('Error querying or saving Meltdowns:', error);
  }
setTimeout(() => {
  setShowMeltDowns(false);
},15000);



}
 
    const upgradeBranch = (branch:String, cost:number) => {
        if (EXP >= cost) {
          setEXP(EXP - cost);
          if (branch === 'attack') {
            setAttackLevel(attackLevel + 0.05);
          } else if (branch === 'skill') {
            setSkillLevel(skillLevel + 0.05);
          } else if (branch === 'lasers') {
            setLasersLevel(lasersLevel + 1);
          }
        } else {
          //console.log('Not enough EXP');
        }
      };

      
    const upgradeArmory = (branch:String, cost:number) => {
      if (ArmoryTokens >= cost) {
        setArmoryTokens(ArmoryTokens - cost);
        if (branch === 'health') {
          setHealthLevel(HealthLevel + 0.05);
        } if (branch === 'repairs') {
          setRepairModules(RepairModules+1);
        } 
      } else {
        //console.log('Not enough armory tokens');
      }
    };
    
      const onClose = () => {
        setIsOpen(false);
        setEXP(0);
      };

      //console.log('EXP:',EXP);
      return (
        <Flex direction="column" alignItems="center" p={2} width={'100%'}>
          <Button backgroundColor={'black'} fontSize={'1vmax'} size='sm' onClick={() => setIsOpen(true)} variant="outline" textColor={'black'} color='orangered'>
            UPGRADE CHARACTERS
          </Button>
          <Box  boxSize={'100%'} padding={'1vw'}>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}> 
              <ModalOverlay   />
              <ModalContent backgroundColor='black' textColor={'white'} className='modal'>
                <ModalHeader justifyContent="space-between">
                  {account && (
                    <Text  textAlign={'left'} fontSize={'0.8vmax'}>Player: {address.slice(0, 4) + "*".repeat(address.length - 4 - 3) + address.slice(-3)}</Text>
                  )}
                  {!account && (
                    <Text fontSize={'1vmax'}>PLEASE SIGN IN TO UPGRADE YOUR PLAYER</Text>
                  )}
                     <VStack paddingTop={'2vmax'}>
                  <HStack justifyContent={'center'} alignContent={'center'}>
                    <Box boxSize={'3vmax'}> <img src={ExpPic} alt="Exp" /></Box>
                    <Text  fontSize={'2vmax'}>{EXP.toFixed(0)}</Text>
                 
                     
                   
                    <Text  fontSize={'2vmax'}>💎 = {Score}</Text>
                    <Text  fontSize={'2vmax'}>ARMT 💰 = {ArmoryTokens.toFixed(0)}   </Text>
                    </HStack>
                    {Score >= (20+(20*Meltdowns)) ? (
<Button  onClick={() => IniateMeltdown()}  className="enemyteam-box selected"  id='chosenTeams' variant={'outline'} color="orangered" size={'sm'}>INITIATE MELT DOWN</Button>) :<Text fontSize={'1vmax'}>EARN MORE RCRO TO INITIATE MELTDOWN</Text>
                    }
                    {showMeltDowns ? (


  <Box className='modal'
    fontSize={'2vmax'}
    animation= 'result-animation 6s ease-in-out'
    backgroundImage={`url(${MissilesEXP1})`}
   
  position= 'absolute'
  top={'5vmax'}
    opacity='1' 
      textAlign={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      padding={'1vw'}>
        <Text  fontSize={'2vmax'} backgroundColor={'transparent'}     color={'green.700'}> CONGRATULATIONS, MELTDOWN INITIATED! </Text>
 
 
  <Text fontSize={'2vmax'} backgroundColor={'transparent'}     color={'green.700'} > <br></br> +10% HEALTH added to {gamemode} <br></br>NEW FLOOR OPENED IN THE ARMORIES <br></br> NEXT MELTDOWN AVAILABLE at SCORE {20+(20*Meltdowns)}</Text>
  </Box>

                    ):''}

                    <MeltDowns tokens={Meltdowns}/>
                     </VStack>
                
                </ModalHeader>
                <ModalCloseButton variant={'outline'} color="orangered" />
               
                
      
<ModalBody backgroundImage={`radial-gradient(closest-side, black, rgba(0, 0, 0, 0.8), transparent), url(${BG})`}>
  <Flex direction="column" alignItems="center">
    <Text paddingBottom={'2vmax'} fontSize="1vmax" fontWeight="bold" color="white">
      Player upgrades
    </Text>

    <VStack textShadow={'1px 2px 5px  black'} gap={'2vmax'} width={'full'} alignItems="center">

      {/* Attack Upgrade Section */}
      <HStack gap={'1.5vmax'} justifyContent={'space-evenly'} alignItems="center">
        <Text fontSize="1vmax" fontWeight="bold">Attack ({attackLevel.toFixed(2)})</Text>
        <Icon as={FaArrowRight} boxSize={'2vmax'} />
        {attackLevel < 0.16 && (
          <img src={Guns} alt="Guns" style={{ width: '4vmax', height: 'auto' }} />
        )}
        <Text fontSize="1vmax" fontWeight="bold" color="green">
          + {(attackLevel + 0.1).toFixed(2)}
        </Text>
        <Button
          onClick={() => upgradeBranch('attack', 100 * (attackLevel + 1))}
          isDisabled={EXP < 100 * (attackLevel + 1)}
          color="orangered"
          size={'sm'}
          fontSize={'1vmax'}
          variant="outline"
          _hover={{ bgColor: 'orangered.500', color: 'black' }}
          _disabled={{ bgColor: 'gray.300', color: 'gray.600', cursor: 'not-allowed' }}
        >
          Upgrade ({(100 * (attackLevel + 1)).toFixed(0)} EXP)
        </Button>
      </HStack>

      {/* Skill Upgrade Section */}
      <HStack gap={'1.5vmax'} justifyContent={'space-evenly'} alignItems="center">
        <Text fontSize="1vmax" fontWeight="bold">Skill ({skillLevel.toFixed(2)})</Text>
        <Icon as={FaArrowRight} boxSize={'2vmax'} />
        {skillLevel < 0.61 && (
          <img src={Missiles} alt="Missiles" style={{ width: '4vmax', height: 'auto' }} />
        )}
        <Text fontSize="1vmax" fontWeight="bold" color="green">
          + {(skillLevel + 0.05).toFixed(2)}
        </Text>
        <Button
          onClick={() => upgradeBranch('skill', 100 * (skillLevel + 1))}
          isDisabled={EXP < 100 * (skillLevel + 1)}
          color="orangered"
          size={'sm'}
          fontSize={'1vmax'}
          variant="outline"
          _hover={{ bgColor: 'orangered.500', color: 'black' }}
          _disabled={{ bgColor: 'gray.300', color: 'gray.600', cursor: 'not-allowed' }}
        >
          Upgrade ({(100 * (skillLevel + 1)).toFixed(0)} EXP)
        </Button>
      </HStack>

     {/* Lasers Upgrade Section */}
     <HStack gap={'1.5vmax'} justifyContent={'space-evenly'} alignItems="center">
        <Text fontSize="1vmax" fontWeight="bold">Lasers ({lasersLevel})</Text>
        <Icon as={FaArrowRight} boxSize={'2vmax'} />
        <img src={Lasers} alt="Lasers" style={{ width: '4vmax', height: 'auto' }} />
        <Text fontSize="1vmax" fontWeight="bold" color="green">
          + {lasersLevel + 1}
        </Text>
        <Button
          onClick={() => upgradeBranch('lasers', 1000 * (lasersLevel + 1))}
          isDisabled={EXP < 1000 * (lasersLevel + 1)}
          color="orangered"
          size={'sm'}
          fontSize={'1vmax'}
          variant="outline"
          _hover={{ bgColor: 'orangered.500', color: 'black' }}
          _disabled={{ bgColor: 'gray.300', color: 'gray.600', cursor: 'not-allowed' }}
        >
          Upgrade ({1000 * (lasersLevel + 1)} EXP)
        </Button>
      </HStack>

      {/* Health Upgrade Section */}
      <HStack gap={'1.5vmax'} justifyContent={'space-evenly'} alignItems="center">
        <Text fontSize="1vmax" fontWeight="bold">Health ({HealthLevel.toFixed(2)})</Text>
        <Icon as={FaArrowRight} boxSize={'2vmax'} />
        <img src={health} alt="Health" style={{ width: '5vmax', height: 'auto' }} />
        <Text fontSize="1vmax" fontWeight="bold" color="green">
          + {(HealthLevel + 0.05).toFixed(2)}
        </Text>
        <Button
          onClick={() => upgradeArmory('health', 10000 * Number((HealthLevel).toFixed(2)))}
          isDisabled={ArmoryTokens < 10000 * Number((HealthLevel).toFixed(2))}
          color="orangered"
          size={'sm'}
          fontSize={'1vmax'}
          variant="outline"
          _hover={{ bgColor: 'orangered.500', color: 'black' }}
          _disabled={{ bgColor: 'gray.300', color: 'gray.600', cursor: 'not-allowed' }}
        >
          Upgrade ({10000 * Number(HealthLevel.toFixed(2))} ARMT)
        </Button>
      </HStack>

      {/* Repairs Upgrade Section */}
      <HStack gap={'1.5vmax'} justifyContent={'space-evenly'} alignItems="center">
        <Text fontSize="1vmax" fontWeight="bold">Repairs ({Number(RepairModules)})</Text>
        <Icon as={FaArrowRight} boxSize={'2vmax'} />
        <img src={repairs} alt="Repairs" style={{ width: '4vmax', height: 'auto' }} />
        <Text fontSize="1vmax" fontWeight="bold" color="green">
          + {Number(RepairModules + 1)}
        </Text>
        <Button
          onClick={() => upgradeArmory('repairs', 100000 * Number(RepairModules > 0 ? RepairModules : 1))}
          isDisabled={ArmoryTokens < 100000 * Number(RepairModules > 0 ? RepairModules : 1)}
          color="orangered"
          size={'sm'}
          fontSize={'1vmax'}
          variant="outline"
          _hover={{ bgColor: 'orangered.500', color: 'black' }}
          _disabled={{ bgColor: 'gray.300', color: 'gray.600', cursor: 'not-allowed' }}
        >
          Upgrade ({100000 * Number(RepairModules > 0 ? RepairModules : 1)} ARMT)
        </Button>
      </HStack>

    </VStack>
  </Flex>
</ModalBody>
          <ModalFooter  justifyContent={'space-between'} alignContent={'center'} width='full'   bgColor="black" >
          <Button   boxShadow='0 0 25px orangered' width={'40%'} textColor={'black'} variant="outline"  color='orangered'  fontSize={'1vmax'}  hidden={!account} as={Link} to={'/ClickerGame'} >
  Enter armory
</Button>  
          <Button   width={'40%'} textColor={'black'} variant="outline"  color='orangered'  fontSize={'1vmax'}  onClick={onClose} >Back to team selection
</Button>
             
         
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </Flex>
  );
};

export default SkillTree;