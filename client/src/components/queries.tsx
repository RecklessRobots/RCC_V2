import { VStack , Button, Text,Box } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import "../App.css";
import Moralis from 'moralis-v1';
import { useMoralisQuery } from "react-moralis";
import Dashboard from '../views/LegendsVote'


interface Data {
  id: number;
  name: string;
}

function Example() {
  const [data, setData] = useState(Object);
  const [firstData, setFirstData] = useState<Data | null>(null);
  
  const limitQuery = useMoralisQuery("Votingx", (query) => query.limit(100), [], 
  {autoFetch: false,});

  interface limitQuery {
    result:Data;
  }

  useEffect(() => {
    limitQuery.fetch({
        onSuccess: (result) => console.log(result)  })
      .then(result => setData(result))
      .catch(error => console.error(error))
      console.log(setData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setFirstData(data[0]);
    }
  }, [data]);

  return (
    <VStack>
    <div>
        
       <Box>
     
        </Box>
      {firstData ? (
        <p>First Data: {firstData.name}</p>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </VStack>
  );
}

export default Example;



interface Data {
  id: number;
  name: string;
}



function ExampleComponent() {
  const [data, setData] = useState(Object);
  const [firstData, setFirstData] = useState<Data | null>(null);
  
  const limitQuery = useMoralisQuery("Votingx", (query) => query.limit(10), [], 
  {autoFetch: false,});

  interface limitQuery {
    result:Object;
    data:Object
   
  }

  useEffect( () => {
    limitQuery.fetch({
        onSuccess: (result) => console.log(data.attributes.votescore)  })
      .then(result => setData((result)))
      .catch(error => console.error(error))
      setFirstData(data[0]);
      console.log(firstData);
  }, []);

 
  return (
    <div>
      {firstData ? (
        <p>First Data: {firstData.name}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

