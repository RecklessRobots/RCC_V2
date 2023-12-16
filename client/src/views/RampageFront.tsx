import React, { useState } from 'react';
import { Flex, Spacer, Text, Box, VStack, Image } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';

import Swords from '../views/game/Swords.png';
import miniguns from '../views/game/Miniguns.png';
import missiles from '../views/game/Missilesystem.png';
import Star from '../views/game/StarGlow.png';
import Melee from '../views/game/Melee.png';

const RampageFront = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');

  return (
    <VStack alignContent="center">
      <Flex width={'full'} flexDirection="column" alignContent="center" justifyContent="center">
        <Spacer paddingBottom={5} />
        <Text textAlign="center" fontSize="0.7vw">
          THIS IS RECKLESS RAMPAGE, A SINGLE PLAYER GAME THAT WILL PUT YOUR SELECTED LEGEND AGAINST THE OTHERS TO SEE WHO WILL PREVAIL.
          the game has 2 different game modes. Both gamemodes have indivudual character upgrades but common armories tokens.
           Legacy gamemode uses LEgends nfts as tokens to play with. EACH LEGEND HELD BRINGS THE PLAYER ADVANTAGE OF +20HP. In the One Man army game mode, the player is given 5 tokens to fight with.
        </Text>
        <Spacer paddingBottom={10} />
        <Box justifyItems="center" textAlign="center">
          <Text textAlign="center" fontSize="0.7vw">
            THE actual GAMEPLAY IS CARDGAME STYLED in both gamemodes. The player fights the selected enemy team by choosing different available attacks. 
          </Text>
         
          <Text textAlign="center" fontSize="0.7vw">
          The armories is a minigame that awards the player with armories tokens (ARMT) that can be used to buy health addons or repairmodules. Armories can be accessed through the character upgrade screen.
          </Text>
          <Text textAlign="center" fontSize="0.7vw">
         
          </Text>
          <Text textAlign="center" fontSize="0.7vw">
        
          </Text>
          <Text textAlign="center" fontSize="0.7vw">
            - in RAmpage EACH LEVEL WILL BE STATISTICALLY MORE DIFFICULT THAN THE PREVIOUS. HOWEVER, LEVELS DON'T HAVE SET ENEMY HEALTH, BUT ARE RATHER CALCULATED AND RANDOMIZED TO OPEN OPPORTUNITIES EVEN WHEN FACING HIGHER LEVEL ENEMIES.
          Player keeps fighting the same enemy until the player wins or tokens run out. 
          </Text>
          <Text textAlign="center" fontSize="0.7vw">
            -A SUCCESSFUL ATTACK IS DEPENDENT ON THE CHOSEN ATTACK TYPE AND THE ODDS OF ENEMY/PLAYER DODGING THE HIT.<br></br>
            - Dodging is based on the skill level of the player and the enemy. Skill can be upgraded through the upgrade character screen.
          </Text><br></br><br></br>

          <Text textAlign="center" fontSize="0.7vw">
            - Player gains RCRO tokens and Battle experience when winning battles. At minimum 10EXP is awarded for all wins.
          </Text>
       
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={Swords} alt="Swords" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text fontSize="0.7vw">RAY OF DEATH: SPECIAL ATTACK ENABLED THROUGH UPGRADES. (ATTACK DAMAGE 30%/REMAINING ENEMY HEALTH WITH NO DODGE CHANCE)</Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={miniguns} alt="Miniguns" boxSize={'1vw'} width={"8vw"} height={'auto'} />
            </Box>
            <Text fontSize="0.7vw">MINIGUNS: PACKED WITH ARMOUR PIERCING ROUNDS AND DEVASTATING RATE OF FIRE. UNLOCK THROUGH UPGRADING ATTACK. (STANDARD ATTACK) </Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={missiles} alt="Missilesystem" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text fontSize="0.7vw">MISSILE SYSTEM: HEAT SEEKING SHOULDER MISSILES PROVIDE STEADY DAMAGE WITH LOWER DODGE CHANCE THANKS TO THE EXPLOSION BLAST RADIUS. UNLOCK THROUGH UPGRADING SKILL. (STANDARD ATTACK)</Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2}>
              <Image src={Melee} alt="Melee" boxSize={'1vw'} width={"10vw"} height={'auto'} />
            </Box>
            <Text fontSize="0.7vw">MELEE ATTACK: WREAK HAVOC WITH YOUR MELEE WEAPONS OR THE ARMOUR FISTS OF YOUR LEGENDS. HARD TO DODGE, LOWER DAMAGE THAN RANGED WEAPONS. </Text>
          </Flex>
          <Flex alignItems="center">
            <Box marginRight={2} marginTop={3}>
              <Image src={Star} alt="StarGlow" boxSize={'1vw'} width={"7vw"} height={'auto'} />
            </Box>
            <Text fontSize="0.7vw">REPAIR MODULES: EACH LEGEND HAS 1X REAPIR MODULE TO USE (+50HP). ADDITIONAL REPAIRS CAN BE BOUGHT WITH ARMt.</Text>
          </Flex>
        </Box>
        <Spacer paddingBottom={5} />

        <Text textAlign="center" fontSize="0.7vw">
          PLEASE NOTE THAT YOU HAVE TO HAVE AT LEAST ONE LEGEND TO PLAY AND HAVE TO BE SIGNED IN WITH YOUR WALLET.<br></br>
          
        </Text>
      </Flex>
    </VStack>
  );
};

export default RampageFront;

     
      