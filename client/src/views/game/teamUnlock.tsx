/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack, Icon, VStack, Avatar, Tag, TagLabel, Wrap, WrapItem, Image } from '@chakra-ui/react';
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

let playerTeams: any;

interface playerTeams {
  name?: string | undefined;
  image?: string | undefined;
  NftAddress?: string | undefined;
};

interface AllNFTs {
  name?: string | undefined;
  image?: string | undefined;
  NftAddress?: string | undefined;
};

interface Legacy_attributes {
  className: 'Rampage_LegacyTeams_R3',
  address: {
    teams: [
      { Team: { score: Number } },
    ],
  },}
  

  
interface Rampage_LegacyTeams_R3 extends Moralis.Object<Legacy_attributes> {}



 


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

let tokens1=Number;

const teamUnlock = ({ playerTeams }: { playerTeams: any }) => {

  const [AllNFTs, setAllNFTs] = useState<Array<{ name?: string, image?: string, NftAddress?: string }>>([]);
  const { account } = useMoralis();
  const address = String(account)
 
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
   
  };
  
  function handlePlayerTeamSelect() {
    throw new Error('Function not implemented.');
  }

  function handleUnlockTeamSelect() {
    

   
    const uniqueNames: Array<{ name?: string }> = [];

  
    const SettingData = async () => {

      if (account && address){
  
     
   if (AllNFTs){
  
    const query = await new Moralis.Query(Rampage_LegacyTeams_R3);
  
    await query.equalTo('TeamScores', 'Round 2');
     const queryO = await new Moralis.Query(Rampage_1MATeams);
     await queryO.equalTo('TeamScores', 'Round 2');

    try {
  
      const previousTeamSetObject = await query.first();
      const previousTeamSetObjectO = await queryO.first();
  
      if (!previousTeamSetObjectO && !previousTeamSetObject ){
  
        const newTeamSetObject = new Rampage_1MATeams;
  
       // newTeamSetObject.set('unlocked', );
  
        await newTeamSetObject.save();

        const newTeamSetObjectO = new Rampage_LegacyTeams_R3;
    
      //  newTeamSetObjectO.set('unlocked', playerTeams);
  
        await newTeamSetObjectO.save();
  
     //   console.log('First Teams saved to Legacy :', playerTeams)
  
        //console.log('First Teams saved to One Man Army :', playerTeams)
      }
       
     else {
  if(previousTeamSetObject&&previousTeamSetObjectO){
      previousTeamSetObject.set('unlocked',AllNFTs);
     // previousTeamSetObjectO.set('unlocked', playerTeams);
      previousTeamSetObjectO.set('unlocked',AllNFTs);
          await previousTeamSetObject.save();
          await previousTeamSetObjectO.save();}

        console.log('First Teams saved to both :', AllNFTs)
       }
      
       
       


      } catch (error) {
  
      console.error('Error querying or saving teams:', error);
  
    };}}
  

    }
        SettingData();
      }
    


  const [StatsLoaded, setStatsLoaded]=useState(false);
  const [UnlockTeam, setUnlockTeam] = useState<string>('');
  
  useEffect(() => {
   // console.log('this is Allnfts:',AllNFTs);

  }, [address])




  return (
    <Flex  direction="row" alignItems="center" p={2} width={'100%'}>
    <Button  fontSize={'1vmax'} size='sm' onClick={() => setIsOpen(true)} variant="outline" textColor={'black'} color='orangered'>
      UNLOCK TEAMS
    </Button>
    <Box boxSize={'100%'} padding={'1vw'}>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}> 
        <ModalOverlay />
        <ModalContent backgroundColor={'black'} textColor={'white'} className='modal'>
          <ModalHeader justifyContent="space-between">UNLOCK TEAMS</ModalHeader><ModalBody>
          <Wrap justify="center" spacing={'-10'} width="100%">
          {playerTeams.map((team:any) => (
            
        <WrapItem key={team.name}>
          <Box
            boxSize={'7vmax'} // Adjust as needed
            cursor="crosshair"
            className={`team-box ${UnlockTeam === team.name ? 'selected' : ''}`}
          
            onClick={() => {
          //    handlePlayerTeamSelect();
            handleUnlockTeamSelect();
              
        AllNFTs.push({
          name: team.name,
          image: team.image,
          NftAddress: team.nftAddress,
        });
             // UnlockTeam(team.name);
              console.log(team.name,team.image,team.nftAddress,'.... pushed to backend');
              console.log(AllNFTs);


       
              
            }}
          >
      
            
                
              
              
                <VStack alignItems="center">
                <Box borderRadius="50%"  // Use borderRadius to make it round (50% of width/height)
      overflow="hidden"  // Hide anything that goes outside the rounded frame
      boxShadow="md"alignItems="center" boxSize='100%' display="flex" flexDirection="column">
                  <Image  src={team.image} alt={team.name} boxSize="full" />
               
                 </Box>
                </VStack>
                </Box>
        </WrapItem>
     
      ))}
   </Wrap>

          </ModalBody>

    <Button    width={'40%'} textColor={'black'} variant="outline"  color='orangered'  fontSize={'1vmax'}  hidden={!account} as={Link} to={'/ClickerGame'} >
DO SOMETHING
</Button>  
    <Button   width={'40%'} textColor={'black'} variant="outline"  color='orangered'  fontSize={'1vmax'}  onClick={onClose} >Back to team selection
</Button>
       
   

  </ModalContent>
</Modal>
</Box>
</Flex>)
};

export default teamUnlock;

const teamUnlock1 = () => {


  




   
      return (
       ''
  );
};

