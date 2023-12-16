// eslint-disable-next-line
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
import L70 from '../assets/L70.png'
import L50 from '../assets/L50.png'
import L30 from '../assets/L30.png'
import L20 from '../assets/L20.png'
import L10 from '../assets/L10.png'
import L5 from '../assets/L5.png'
import L3 from '../assets/L3.png'
import L1 from '../assets/L1.png'

interface Data {
  id: number;
  address: string;
  value: string;
  rank:number;

}

export const LRanking = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://cronos.org/explorer/api?module=token&action=getTokenHolders&contractaddress=0xf96ec7C11D311920833753FAB9b174B6FD53517E&page=1&offset=500'
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
    <Box fontSize="1.2vw" className="ranking" display="flex" flexDirection="column" alignItems="center">
    <Flex justifyContent="center" p={4}>
      <VStack>
        <HStack>
          <Text fontSize="1.2vw" fontWeight="bold">
            Search:
            <input type="text" onChange={handleSearch} />
          </Text>
          <Button fontSize="1.0vw" padding="0.4vw" boxSize="fit-content" id="clear" onClick={handleClear}>
            Clear
          </Button>
        </HStack>
      </VStack>
    </Flex>

    <Box>
      {filteredData.map((item) => (
        <Box width="50vw" key={item.id} p={4} borderWidth="1px" borderRadius="lg" display="flex" justifyContent="center">
          <HStack display="flex" justifyContent="space-between">
            <VStack fontSize="1vw" display="flex" justifyContent="space-between">
              <Text fontWeight="bold">{item.id}</Text>
              <Text>RANK: {item.rank}</Text>
              <br />
              <Text>{item.address}</Text>
              <br />
              <Tag size="1.2vw">ROBOTS HELD: {item.value}</Tag>
            </VStack>

            {Number(item.value) >= 70 && <img src={L70} alt="Image above 100" width="150vw" height="auto"  />}
            {Number(item.value) > 49 && Number(item.value) <= 69 && (
              <img src={L50} alt="Image above 70" width="150vw" height="auto" />
            )}
            {Number(item.value) > 29 && Number(item.value) <= 49 && (
              <img src={L30} alt="Image above 50" width="150vw" height="auto" />
            )}
            {Number(item.value) > 19 && Number(item.value) <= 29 && (
              <img src={L20} alt="Image above 30" width="150vw" height="auto" />
            )}
            {Number(item.value) > 9 && Number(item.value) <= 19 && (
              <img src={L10} alt="Image above 15" width="150vw" height="auto" />
            )}
            {Number(item.value) > 4 && Number(item.value) <= 9 && (
              <img src={L5} alt="Image above 5" width="150vw" height="auto" />
            )}
            {Number(item.value) > 2 && Number(item.value) <= 4 && (
              <img src={L3} alt="Image above 3" width="150vw" height="auto" />
            )}
            {Number(item.value) > 0 && Number(item.value) <= 2 && (
              <img src={L1} alt="Image above 1" width="150vw" height="auto" />
            )}
          </HStack>
        </Box>
      ))}
    </Box>
  </Box>
  );
};
