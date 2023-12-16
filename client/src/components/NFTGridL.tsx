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
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,ModalCloseButton, ModalFooter,useDisclosure
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useNFTBalances, useWeb3Transfer } from 'react-moralis';
import AppG from '../views/game/AppG'

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
  const handleReceiverChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReceiver(event.target.value);
  };

  /* useEffect(() => {
    if (!isFetching && !error) {
      // eslint-disable-next-line
      //console.log('NFT transferred');
    }
  }, [isFetching, error]); */

  
  const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setChosenId(id);
    setIsModalOpen(true);
    localStorage.setItem('StoredLegend', id);
    const LegendFromStorage=localStorage.getItem('StoredLegend');
    //console.log(LegendFromStorage);
   

   
    const hero = JSON.stringify(metadata?.attributes?.[0]);
    const hero1 = JSON.parse(hero);
    const background = JSON.stringify(metadata?.attributes?.[1]);
    const background1 = JSON.parse(background);
    const backgear = JSON.stringify(metadata?.attributes?.[2]);
    const backgear1 = JSON.parse(backgear);
    const armour = JSON.stringify(metadata?.attributes?.[3]);
    const armour1 = JSON.parse(armour);
    const headgear = JSON.stringify(metadata?.attributes?.[4]);
    const headgear1 = JSON.parse(headgear);
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
      <img src="${metadata?.image?.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}">
    `;
  }

   
    


  const transferNft = () => {
    fetch();
  };

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

  
  
    
    // Add more values as needed
  };

  if (metadata!==null){
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
} else {

  
if (metadata && typeof metadata === 'object') {
  metadata.attributes = [];
} else {
  // Handle the case when metadata is null or not an object
  console.error('Invalid metadata:', metadata);
}



  }
}
  


const rarityValues = metadata?.attributes
?.map((attr) => ClassRarity[attr.value])
.filter((rarity) => !isNaN(rarity)) || [0,45];

const totalRarity = rarityValues.reduce((a, b) => a * b, 1);



  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>


<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
<ModalOverlay />
<ModalContent>
<ModalHeader>NFT Details</ModalHeader>
<ModalCloseButton />
<ModalBody>

      {metadata !==null && metadata?.image && (
        <Image width={'50vw'} height='auto'
          onClick={imgClickedHandler}
          src={metadata?.image.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}
        />)}
       {metadata !==null && metadata?.image && (
      <Box textColor={'black'} p={4}>
        <Tag fontSize={'0.8vw'}>
          {name} #{id}
        </Tag>
        <Tag colorScheme={'green'} fontSize={'0.8vw'}>
        Rarity: 
        {Number((totalRarity)*10000000).toFixed(2)}
          </Tag> 
          <Text fontSize={'0.8vw'}>
          {metadata?.attributes?.[0]?.trait_type ?? ''} -  {metadata?.attributes?.[0]?.value ?? ''} 
</Text>

<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[1]?.trait_type ?? ''} -       {metadata?.attributes?.[1]?.value ?? ''} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[2]?.trait_type ?? ''} -        {metadata?.attributes?.[2]?.value ?? ''} 

</Text>
<Text alignContent={'center'} fontSize={'0.8vw'}>
{metadata?.attributes?.[3]?.trait_type ?? ''} -  {metadata?.attributes?.[3]?.value ?? ''} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[4]?.trait_type ?? ''} - {metadata?.attributes?.[4]?.value ?? ''} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[5]?.trait_type ?? ''} - {metadata?.attributes?.[5]?.value ?? ''}

</Text>
<Text fontSize={'0.8vw'}>
  {metadata?.attributes?.[6]?.trait_type ?? ''} - {metadata?.attributes?.[6]?.value ?? ''}
</Text>
<Button colorScheme="green" onClick={transferNft} fontSize="0.8vw">
          SEND
        </Button>
        <Input placeholder="Receiver address" value={receiver} onChange={handleReceiverChange}></Input>
  </Box>)}
</ModalBody>
</ModalContent>
</Modal>
    <Box backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
      {metadata?.image && (
        <Image
          onClick={imgClickedHandler}
          src={metadata?.image.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}
        />
      )}
      <Box textColor={'black'} p={4}>
        <Tag fontSize={'0.8vw'}>
          {name} #{id}
        </Tag>
        <Tag colorScheme={'green'} fontSize={'0.6vw'}>
        Rarity: 
        {Number((totalRarity)*10000000).toFixed(2)}
          </Tag>
        
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


export const NftGridL = ({ address }: NftGridProps) => {
 
  const { data, error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      tokenAddresses: ['0xf96ec7C11D311920833753FAB9b174B6FD53517E'],
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
};
SetGetData();

  return (
    <VStack alignItems="start">



      
      <Grid backgroundColor={'black'} templateColumns="repeat(auto-fit, minmax(200px, 5fr))" gap={6}>
        {data.result.map((nft) => (
          <GridItem backgroundColor={'black'} borderColor={'white'} borderWidth='2px' key={`${nft.token_address}${nft.token_id}`}>
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

export default NftGridL;