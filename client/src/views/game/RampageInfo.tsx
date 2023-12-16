import React, { useState } from 'react';
import { Flex, Spacer, Text, Box, VStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Link } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';

import Swords from './Swords.png';
import miniguns from './Miniguns.png';
import missiles from './Missilesystem.png';
import Star from './StarGlow.png';
import Melee from './Melee.png';


const RampageInfo = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (

<Modal    isOpen={isModalOpen} onClose={() => setIsModalOpen(false) } size={'3xl'}>
<ModalOverlay  color={'black'}/>
<ModalContent color={'black'}>
<ModalHeader justifyItems={'center'}>how to play reckless rampage</ModalHeader>

<ModalCloseButton />
<ModalBody  color={'black'}>

<VStack   color={'black'}alignContent="center">
      <Flex  color={'black'} width={'full'} flexDirection="column" alignContent="center" justifyContent="center">
        <Spacer paddingBottom={5} />
        <Text  color={'black'}   textAlign="center" fontSize="0.9vmax">
          THIS IS RECKLESS RAMPAGE, A SINGLE PLAYER GAME THAT WILL PUT YOUR SELECTED LEGEND AGAINST THE OTHERS TO SEE WHO WILL PREVAIL.
          the game has 2 different game modes. Both gamemodes have indivudual character upgrades but common armories tokens.
           Legacy gamemode uses LEgends nfts as tokens to play with. EACH LEGEND HELD BRINGS THE PLAYER ADVANTAGE OF +20HP. In the One Man army game mode, the player is given 5 tokens to fight with.
        </Text>
        <Spacer paddingBottom={10} />
        <Box justifyItems="center" textAlign="center">
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
            THE actual GAMEPLAY IS CARDGAME STYLED in both gamemodes. The player fights the selected enemy team by choosing different available attacks. 
          </Text>
         
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
          The armories is a minigame that awards the player with armories tokens (ARMT) that can be used to buy health addons or repairmodules. Armories can be accessed through the character upgrade screen.
          </Text>
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
         
          </Text>
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
        
          </Text>
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
            - in RAmpage EACH LEVEL WILL BE STATISTICALLY MORE DIFFICULT THAN THE PREVIOUS. HOWEVER, LEVELS DON'T HAVE SET ENEMY HEALTH, BUT ARE RATHER CALCULATED AND RANDOMIZED TO OPEN OPPORTUNITIES EVEN WHEN FACING HIGHER LEVEL ENEMIES.
          Player keeps fighting the same enemy until the player wins or tokens run out. 
          </Text>
          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
            -A SUCCESSFUL ATTACK IS DEPENDENT ON THE CHOSEN ATTACK TYPE AND THE ODDS OF ENEMY/PLAYER DODGING THE HIT.<br></br>
            - Dodging is based on the skill level of the player and the enemy. Skill can be upgraded through the upgrade character screen.
          </Text><br></br><br></br>

          <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
            - Player gains RCRO tokens and Battle experience when winning battles. At minimum 10EXP is awarded for all wins.
          </Text>
       
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={Swords} alt="Swords" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text  color={'black'} fontSize="0.9vmax">RAY OF DEATH: SPECIAL ATTACK ENABLED THROUGH UPGRADES. (ATTACK DAMAGE 30%/REMAINING ENEMY HEALTH WITH NO DODGE CHANCE)</Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={miniguns} alt="Miniguns" boxSize={'1vw'} width={"8vw"} height={'auto'} />
            </Box>
            <Text  color={'black'} fontSize="0.9vmax">MINIGUNS: PACKED WITH ARMOUR PIERCING ROUNDS AND DEVASTATING RATE OF FIRE. UNLOCK THROUGH UPGRADING ATTACK. (STANDARD ATTACK) </Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={missiles} alt="Missilesystem" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text  color={'black'} fontSize="0.9vmax">MISSILE SYSTEM: HEAT SEEKING SHOULDER MISSILES PROVIDE STEADY DAMAGE WITH LOWER DODGE CHANCE THANKS TO THE EXPLOSION BLAST RADIUS. UNLOCK THROUGH UPGRADING SKILL. (STANDARD ATTACK)</Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={Melee} alt="Melee" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text  color={'black'} fontSize="0.9vmax">MELEE ATTACK: WREAK HAVOC WITH YOUR MELEE WEAPONS OR THE ARMOUR FISTS OF YOUR LEGENDS. HARD TO DODGE, LOWER DAMAGE THAN RANGED WEAPONS. </Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2} marginTop={3}>
              <Image src={Star} alt="StarGlow" boxSize={'1vw'} width={"7vw"} height={'auto'} />
            </Box>
            <Text  color={'black'} fontSize="0.9vmax">REPAIR MODULES: EACH LEGEND HAS 1X REAPIR MODULE TO USE (+50HP). ADDITIONAL REPAIRS CAN BE BOUGHT WITH ARMt.</Text>
          </Flex>
        </Box>
        <Spacer paddingBottom={5} />

        <Text  color={'black'} textAlign="center" fontSize="0.9vmax">
          PLEASE NOTE THAT YOU HAVE TO HAVE AT LEAST ONE LEGEND TO PLAY AND HAVE TO BE SIGNED IN WITH YOUR WALLET.<br></br>
          
        </Text>
      </Flex>
    </VStack>

        <Text  color={'black'} textAlign="center" fontSize="1vmax">
          If you read so far, feel free dig in to more details in our <Link color={'orangered'} href='https://medium.com/@recklessrobots/lets-get-reckless-reckless-rampage-nft-game-launch-on-the-01oct23-2948693dba6f'> medium article.</Link>
        <br></br>   <br></br>
        Now let's get reckless!
        <br></br>
        <br></br>
        </Text>
      
</ModalBody>
</ModalContent>
</Modal>


  );
};

export default RampageInfo;

     
      