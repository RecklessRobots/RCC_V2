/* eslint-disable */
import { VStack, Heading, Button, Box,  Tag, Flex, Spacer, Text, Alert, Table, Thead, Tbody, Tr, Th, Td, Collapse, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, TagLabel, Avatar  } from '@chakra-ui/react';
import { useEffect} from 'react';

import React, { useState, useRef } from "react";
import Moralis from 'moralis-v1';
import Meltdowns from './meltdowns';



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



const fetchTopHighScores = async () => {
    const query = new Moralis.Query(RampageLegacy_R3);
    query.descending('score');
    query.limit(10);
  
    try {
      const highScoreObjects = await query.find();
      return highScoreObjects.map((scoreObject) => ({
        icon: scoreObject.get('team'),
        player: scoreObject.get('player'),
        score: scoreObject.get('score'),
        Meltdowns: scoreObject.get('Meltdowns')
      }));
    } catch (error) {
      console.error('Error fetching top high scores:', error);
      return [];
    }
  };
  
  const TopHighScores = () => {
    const [highScores, setHighScores] = useState<{ player: string; score: number; icon:string; Meltdowns:number }[]>([]);
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
          const query = new Moralis.Query(RampageLegacy_R3);
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
  
  const NFTimage=localStorage?.getItem('NFTimage');
  
  
    return (
<Box width={'full'}  borderColor={'white'} borderWidth={'0.1vmax'} borderRadius={'1vmax'}>        <Heading size="lg" marginBottom="10px">
        </Heading>
        <Button   fontSize={'1vmax'} bgColor='black' color="orangered" variant="outline"  width={'full'}  onClick={handleToggle}>
          {showHighScores ? 'Hide Legacy High Scores' : 'Show Legacy High Scores'}
        </Button>
        <Collapse in={showHighScores}>
       
  
       
  <VStack  backgroundColor={'black'} fontSize={'2vm'} alignContent="center">
  <Text textAlign="center" fontSize="2vmax" textDecorationLine={'underline'}>
    LEGACY High Scores
  </Text>
     {highScores.map((highScore, index) => (
          <Box fontSize={'2vmin'}
          width="70%"
          paddingBottom={'2vmax'}
          key={index}
          display="flex"
          flexDirection={'row'}
          alignItems="center" // Center align items vertically
          justifyContent='stretch'
        >
        <span style={{ marginRight: '1vw' }}>{index + 1}.</span>
        <Avatar
  src={String(highScore.icon).replace('ipfs://','https://ipfs.io/ipfs/')}
            size="md"
          name="player"
          style={{ marginLeft: '1vw', marginRight: '1vw' }}
        />
        <span style={{ flex: 1, textAlign: 'center' }}>{formatAddress(highScore.player)} </span>
        <span style={{flex:1 }}><Meltdowns  tokens={highScore.Meltdowns} /></span>
        <span style={{ marginLeft: '1wv'}}>{highScore.score}</span>
        
      </Box>
    ))}
  </VStack>
        </Collapse>
      </Box>
    );
  };

export default TopHighScores;

