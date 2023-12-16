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

const Nft = ({ name, id, metadata, type, address }: NftProps) => {
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
     //console.log(JSON.stringify(metadata.attributes));
    }
  }, [isFetching, error]);*/

  const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setChosenId(id);
    setIsModalOpen(true);
    //console.log("right!");
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
    "GoldenSwords"	:	0.175	,
    "Green"	:	0.175	,
    "NoScarf"	:	0.38	,
    "Amethyst"	:	0.125	,
    "Blue"	:	0.175	,
    "BlueScarf"	:	0.205	,
    "Fiery"	:	0.225	,
    "Fire"	:	0.13	,
    "Flames"	:	0.185	,
    "GlowingGold"	:	0.11	,
    "GlowingYellow"	:	0.285	,
    "Gold"	:	0.11	,
    "GoldenWings"	:	0.09	,
    "GreenScarf"	:	0.16	,
    "Grey"	:	0.16	,
    "Knight"	:	0.18	,
    "Laser"	:	0.105	,
    "LightBlue"	:	0.15	,
    "Mark2"	:	0.155	,
    "MetalWings"	:	0.14	,
    "Ninja"	:	0.11	,
    "NoGear"	:	0.23	,
    "Ocean"	:	0.13	,
    "Original"	:	0.385	,
    "Red"	:	0.165	,
    "RedScarf"	:	0.255	,
    "Violet"	:	0.155	,
    "Yellow"	:	0.16	,
    

  
  
    
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
  metadata.attributes =  [];



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

      {metadata?.image && (
        <Image width={'50vw'} height='auto'
          onClick={imgClickedHandler}
          src={metadata?.image.replace('ipfs://', 'https://recklessrobots.mypinata.cloud/ipfs/')}
        />
      )}
      <Box textColor={'black'} p={4}>
        <Tag fontSize={'0.8vw'}>
          {name} #{id}
        </Tag>
        <Tag colorScheme={'green'} fontSize={'0.8vw'}>
        Rarity: 
        {Number((totalRarity)*10000).toFixed(2)}
          </Tag>
          <Text fontSize={'0.8vw'}>
          {metadata?.attributes?.[0]?.trait_type}: {metadata?.attributes?.[0]?.value} 
</Text>

<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[1]?.trait_type}:       {metadata?.attributes?.[1]?.value} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[2]?.trait_type}:       {metadata?.attributes?.[2]?.value} 

</Text>
<Text alignContent={'center'} fontSize={'0.8vw'}>
{metadata?.attributes?.[3]?.trait_type}: {metadata?.attributes?.[3]?.value} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[4]?.trait_type}: {metadata?.attributes?.[4]?.value} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata?.attributes?.[5]?.trait_type}: {metadata?.attributes?.[5]?.value} 

</Text>
<Text fontSize={'0.8vw'}>
{metadata.attributes?.[6]?.trait_type}:{metadata?.attributes?.[6]?.value} 

</Text>
<Button colorScheme="green" onClick={transferNft} fontSize="0.8vw">
          SEND
        </Button>
        <Input placeholder="Receiver address" value={receiver} onChange={handleReceiverChange}></Input>
  </Box>
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
        {Number((totalRarity)*10000).toFixed(2)}
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


export const NftGrid = ({ address }: NftGridProps) => {
  const { data, error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      tokenAddresses: ['0xD56AFcdB787e233325757D3ED7A987F11FB3fa08'],
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

  return (
    <VStack alignItems="start">
      


      
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {data.result.map((nft) => (
          <GridItem key={`${nft.token_address}${nft.token_id}`}>
            <Nft
              name={nft.name}
              id={nft.token_id}
              address={nft.token_address}
              metadata={nft.metadata}
              type={nft.contract_type}
  
            />
        
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default NftGrid;