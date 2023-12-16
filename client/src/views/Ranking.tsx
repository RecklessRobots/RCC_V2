import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Box,
  Button,
  Flex,
  HStack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import R100 from '../assets/R100.png'
import R70 from '../assets/R70.png'
import R50 from '../assets/R50.png'
import R30 from '../assets/R30.png'
import R15 from '../assets/R15.png'
import R5 from '../assets/R5.png'
import R3 from '../assets/R3.png'
import R1 from '../assets/R1.png'

interface Data {
  id: number;
  address: string;
  value: string;
  rank:number;

}

export const Ranking = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://cronos.org/explorer/api?module=token&action=getTokenHolders&contractaddress=0xD56AFcdB787e233325757D3ED7A987F11FB3fa08&page=1&offset=500'
      );
      const sortedData = result.data.result.map((item: any) => ({
        id: item.id,
        address: item.address,
        value: item.value,
        rank:item.rank,
      }))
      .sort((a:Data, b:Data) => Number(b.value) - Number(a.value));
      const editedData = sortedData.map((item:Data, index:number) => ({
        ...item,
        rank: index + 1
      }));
      
      setData(editedData);
      setFilteredData(editedData);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    const filtered = data.filter(
      (item) => item.address.toLowerCase().includes(value) || item.value.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setFilteredData(data);
  };

  
  return (
    <Box fontSize={'1.2vw'} className="ranking">
    <Flex justifyContent="center" p={4}>
      <VStack>
        <HStack >
          <Text fontSize="1.2vw" fontWeight="bold">
            Search:
        
          <input type="text" onChange={handleSearch} />
          </Text>
        <Button fontSize='1.2vw' padding={'0.4vw'} boxSize={'fit-content'} id="clear" onClick={handleClear}>
          Clear
        </Button>
        </HStack>
      </VStack>
    </Flex>
  
    <Box>

        {filteredData.map((item) => (
          <Box  key={item.id} p={4} borderWidth="1px" borderRadius="lg" display="flex" justifyContent="space-between">
           <HStack display="flex" justifyContent="space-between">
            <VStack display="flex" justifyContent="space-between">
              <Text fontWeight="bold">{item.id}</Text>
              <Text>RANK: {item.rank}</Text><br></br>
              <Text>{item.address}</Text><br></br>
              <Tag size="1.2vw" >
                
                ROBOTS HELD:  {item.value}</Tag>
                </VStack>
               
    {Number(item.value) >= 100 && <img src={R100} alt="Image above 100" width='25%' height= 'auto'/>}
     {Number(item.value) > 70 && Number(item.value) <= 100 && <img src={R70} alt="Image above 70" width='25%' height= 'auto' />}
      {Number(item.value) > 50 && Number(item.value) <= 70 && <img src={R50} alt="Image above 50" width='25%' height= 'auto' />}
      {Number(item.value) > 30 && Number(item.value) <= 50 && <img src={R30} alt="Image above 30" width='25%' height= 'auto' />}
      {Number(item.value) > 15 && Number(item.value) <= 30 && <img src={R15} alt="Image above 15" width='25%' height= 'auto' />}
      {Number(item.value) > 5 && Number(item.value) <= 15 && <img src={R5} alt="Image above 5" width='25%' height= 'auto' />}
      {Number(item.value) > 2 && Number(item.value) <= 5 && <img src={R3} alt="Image above 3" width='25%' height= 'auto' />}
      {Number(item.value) > 0 && Number(item.value) <= 2 && <img src={R1} alt="Image above 1" width='25%' height= 'auto' />}
     
      </HStack>
          </Box>
        ))}
      </Box>
 </Box>
  );
};
