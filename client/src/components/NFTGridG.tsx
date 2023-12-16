/* eslint-disable */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Grid,
  GridItem,
  Image,
 Text,
  Tag,
  Button,
  VStack,
  Input,
  Spacer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,ModalCloseButton, ModalFooter,useDisclosure, Show
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useNFTBalances, useWeb3Transfer } from 'react-moralis';
import "../views/game/Game.css";


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

interface GameNftsProps {
  name: string;
  metadata: {
    image?: string;
    attributes: { trait_type: string; value: string | number }[];
  };
  address: string;
  id: string;
  type: string;
}



export const Nft = ({ name, id, metadata, type, address }: NftProps) => {

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [chosenId, setChosenId] = useState(id);

  const [receiver, setReceiver] = useState('');
  
  const { fetch, error, isFetching } = useWeb3Transfer({
    type: 'erc721',
    // eslint-disable-next-line
    receiver: receiver,
    contractAddress: address,
    tokenId: chosenId,
  });
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* useEffect(() => {
    if (!isFetching && !error) {
      // eslint-disable-next-line
      console.log('NFT transferred');
    }
  }, [isFetching, error]); */

  const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setChosenId(id);

    setIsModalOpen(true);
    localStorage.setItem('StoredLegend', id);
    if (metadata.image){
    localStorage.setItem('NFTimage', metadata.image);}
   
    //console.log(localStorage.getItem('NFTimage'));

    const LegendFromStorage=localStorage.getItem('StoredLegend');
    //console.log(LegendFromStorage);
    

   /*
    const hero = JSON.stringify(metadata?.attributes?.[0]);
    const hero1 = JSON.parse(hero);
    const background = JSON.stringify(metadata?.attributes?.[1]);
    const background1 = JSON.parse(background);
    const backgear = JSON.stringify(metadata?.attributes?.[2]);
    const backgear1 = Array.isArray(backgear) ? backgear[0]?.value : '';
    const armour = JSON.stringify(metadata?.attributes?.[3]);
    const armour1 = Array.isArray(armour) ? armour[0]?.value : '';
    const headgear = JSON.stringify(metadata?.attributes?.[4]);
    const headgear1 = Array.isArray(headgear) ? headgear[0]?.value : '';
    const rarity = ClassRarity[metadata?.attributes?.[0]?.value] *
      ClassRarity[metadata?.attributes?.[1]?.value] *
      ClassRarity[metadata?.attributes?.[2]?.value] *
      ClassRarity[metadata?.attributes?.[3]?.value] *
      ClassRarity[metadata?.attributes?.[4]?.value] *
      ClassRarity[metadata?.attributes?.[5]?.value] *
      ClassRarity[metadata?.attributes?.[6]?.value];
    const stats = `
      Collection name: ${name}
      NFT Id: ${id}
      NFT type: ${type}
      Background: ${background1.value} (Rarity: ${ClassRarity[background1.value]})
      Backgear: ${backgear1.value} (Rarity: ${ClassRarity[backgear1.value]})
      Armour: ${armour1.value} (Rarity: ${ClassRarity[armour1.value]})
      Headgear: ${headgear1.value} (Rarity: ${ClassRarity[headgear1.value]})
      Hero: ${hero1.value} (Rarity: ${ClassRarity[hero1.value]})
      Total rarity: ${rarity}
      <img src="${metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')}">
    `;
  }



  const ClassRarity: Record<string, number> = {
    "The Commander": 1,
    "The Beast": 1,
    "The Void": 1,
    "AmmoBelt"	:	0.038	,
    "Armory"	:	0.018	,
    "BattleFlagEB"	:	0.006	,
    "BattleFlagEngland"	:	0.018	,
    "BattleFlagFinland"	:	0.015	,
    "BattleFlagNorway"	:	0.021	,
    "BattleFlagSweden"	:	0.015	,
    "BattleFlagUkraine"	:	0.017	,
    "BattleFlagUnionJack":0.02,
    "BattleFlagUSA"	:	0.017	,
    "Beast"	:	0.105	,
    "Berserker"	:	0.146	,
    "BigGuns"	:	0.005	,
    "Blue"	:	0.151	,
    "BlueGlowing"	:	0.040	,
    "BlueLaser"	:	0.008	,
    "BlueLaserOptics"	:	0.011	,
    "BlueWizor"	:	0.066	,
    "Burning"	:	0.130	,
    "Camo"	:	0.048	,
    "Circuit"	:	0.015	,
    "CircuitGold"	:	0.005	,
    "CircuitGreen"	:	0.008	,
    "Commander"	:	0.031	,
    "Cyan"	:	0.138	,
    "Dark"	:	0.087	,
    "Darkness"	:	0.122	,
    "Fiery"	:	0.003	,
    "FierySkullFace"	:	0.001	,
    "FieryWizor"	:	0.008	,
    "FlamingSkullface"	:	0.001	,
    "Freezing"	:	0.122	,
    "FrozenStar"	:	0.073	,
    "Gasmask"	:	0.053	,
    "Glowing"	:	0.015	,
    "GoldArmour"	:	0.023	,
    "GoldenMiniguns"	:	0.026	,
    "Gray"	:	0.106	,
    "Green"	:	0.066	,
    "GreenWizor"	:	0.061	,
    "Impaler"	:	0.04	,
    "Laser"	:	0.006	,
    "LaserOptics"	:	0.021	,
    "Metal"	:	0.086	,
    "MetalWings"	:	0.101	, 
    "Miniguns"	:	0.108	,
    "Missilesystem"	:	0.123	,
    "NoBackGear"	:	0.414	,
    "NoBattleFlag"	:	0.858	,
    "NoFrontGear"	:	0.692	,
    "NoGlow"	:	0.515	,
    "NoHeadGear"	:	0.458	,
    "Orange"	:	0.113	,
    "Purple"	:	0.131	,
    "RainingBlood"	:	0.029	,
    "Rank"	:	0.105	,
    "Red"	:	0.132	,
    "RedWizor"	:	0.147	,
    "Royal"	:	0.049	,
    "RustyBattleAxe"	:	0.050	,
    "SilverArmour"	:	0.103	,
    "Skullface"	:	0.027	,
    "SkullMedal"	:	0.051	,
    "Spaceship"	:	0.032	,
    "Star"	:	0.043	,
    "Swords"	:	0.126	,
    "TornSkullFace"	:	0.003	,
    "Void"	:	0.092	,
    "VoidAmmobelt"	:	0.014	,
    "VoidRank"	:	0.055	,
    "voidRecklessMedal"	:	0.005	,
    "VoidWizor"	:	0.016	,
    "YellowLaser"	:	0.002	,
    "YellowLaserOptics"	:	0.004	,
     NoTrait:1,

  */
  
    
    // Add more values as needed
  };
  // get the rarity value for a specific trait value
  const getRarityValue = (traitType: string, traitValue: string | number) => {
    if (!metadata?.attributes || metadata.attributes.length === 0) {
      return 1; // default value when no attributes are present
    }
  
    const attribute = metadata.attributes.find((attr) => attr.trait_type === traitType);
    if (!attribute || attribute.value === undefined) {
      return 1; // default value when the attribute is not present or has no value
    }
  
  
  }

  // create a copy of the metadata object and add rarity values to the attributes
  if (metadata!==null){
  const metadataWithRarity = { ...metadata };
  if (metadata?.attributes) {
    metadataWithRarity.attributes = metadata.attributes.map((attribute) => ({
      ...attribute,
      rarity: getRarityValue(attribute.trait_type, attribute.value),
    }));
  }

  const traitValues: { [key: string]: number } = {};
if (metadata?.attributes) {
  for (const attribute of metadata.attributes) {
    traitValues[attribute.trait_type] = attribute.value as number || 1;

  }
}else {

  
  if (metadata && typeof metadata === 'object') {
    metadata.attributes = [];
  } else {
    // Handle the case when metadata is null or not an object
    console.error('Invalid metadata:', metadata);
  }
  
  
  
    }}
   
  
/*

const rarityValues = metadata?.attributes
?.map((attr) => ClassRarity[attr.value])
.filter((rarity) => !isNaN(rarity)) || [0,45];

const totalRarity = rarityValues.reduce((a, b) => a * b, 1);

*/

  const { isOpen, onOpen, onClose } = useDisclosure()


    const selected = () => {
      setIsAlertVisible(true);
      setChosenId(id);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    
    };
  

  


  return (
    <>


<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
<ModalOverlay />
<ModalContent backgroundColor={'black'} textColor={'white'} className='modal'>
  <Box paddingBottom={'2vmax'}>
<ModalCloseButton />
</Box>

<ModalHeader padding={'1vmax'}>CLICK IMAGE TO CHOOSE YOUR LEGEND</ModalHeader>

<ModalBody>

      {metadata?.image && (
        <Image width={'50vw'} height='auto'
        onClick={(event) => {imgClickedHandler(event); selected(); }}
        src={metadata?.image.replace('ipfs://','https://ipfs.io/ipfs/').replace('https://bhfiles.mypinata.cloud/ipfs/', 'https://ipfs.io/ipfs/')}
          loading="lazy"
        />
      )}
      <Box textColor={'white'} p={4} alignSelf='center'>
       
          {name} #{id}
            
            {/* Chakra UI Alert */}
            {isAlertVisible && (
              <Alert textColor={'black'} status="success" mt={4}>
                <AlertIcon />
                Legend selected!
              </Alert>
            )}
    
  </Box>
</ModalBody>
</ModalContent>
</Modal>
    <Box  backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
      {metadata?.image && (
        <Image
          onClick={imgClickedHandler}
          src={metadata?.image.replace('ipfs://','https://ipfs.io/ipfs/').replace('https://bhfiles.mypinata.cloud/ipfs/', 'https://ipfs.io/ipfs/')}
          loading="lazy"
        />
      )}
      <Box textColor={'black'} p={4}>
     
         <Text textColor={'black'}> {name} #{id}</Text>
        
        
      </Box>
    </Box>
    </>
  );}
  
          
      

interface NftGridProps {
  token_addresses?: string[] | undefined;
  address: string;
  chain: string;
  total?: boolean;
}


 const NftGridG = ({ address }: NftGridProps) => {
  const SelectedTokenAddress="0xf96ec7C11D311920833753FAB9b174B6FD53517E";
  const SelectedChibis="0x84Fda8563E6556a7Fb1578E10e114dB56d64638d";
  
  

  const Team = localStorage.getItem('playerTeam');
 
  const StoredPlayerTeamsData = localStorage.getItem('playerTeams');
 
  const ParsedPlayerData = StoredPlayerTeamsData ? JSON.parse(StoredPlayerTeamsData) : null;
  
 
  const playerTeamFind = ParsedPlayerData?.find((team: any) => team.name === Team);
  
  const playerContract = playerTeamFind?.contract ? playerTeamFind.contract : SelectedTokenAddress ;

  



  const { data, error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      tokenAddresses: [playerContract],
      chain: '0x19',
      address,
    },
    {
      autoFetch: true,
    }
  );
 

  if (isLoading) {
    return (
      <Box>
        <Spinner thickness="4px" color="blue.300" size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
       
      </Box>
    );
  }

  if (!data?.result || data.result.length === 0) {
    return (
      <Box>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No results</AlertTitle>
          <AlertDescription>
            There are no NFTs associated with this address.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  const SetGetData = async ()  => {
const LegendsData=data;
 localStorage.setItem('LegendsData', JSON.stringify(LegendsData));
const LegendsDataStored= localStorage.getItem('LegendsData');
const LegendsDataStoredString=JSON.stringify(LegendsDataStored);
await JSON.parse(LegendsDataStoredString);
const LegendsDataParsed= LegendsDataStored ? JSON.parse(LegendsDataStored) : [];
//console.log(LegendsDataParsed);
};
SetGetData();

  return (
    <VStack alignItems="start">



      
      <Grid backgroundColor={'black'} templateColumns="repeat(auto-fit, minmax(200px, 5fr))" gap={6}>
        {data.result.map((nft) => (
          <GridItem backgroundColor={'black'} borderWidth='2px' key={`${nft.token_address}${nft.token_id}`}>
            <Box backgroundColor={'black'}>
            <Nft
              name={nft.name}
              id={nft.token_id}
              address={nft.token_address}
              metadata={nft.metadata}
              type={nft.contract_type}
              
  
            />
      </Box>
          </GridItem>
        ))}
      </Grid>
    </VStack>
   
  );
};

export default NftGridG;