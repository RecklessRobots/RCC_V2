import { Button, HStack, VStack} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ children, to }: { children: string; to: string }) => {
  return (
    <Button padding='1' boxSize={'-moz-fit-content'} fontSize={'1.1vw'} variant="ghost" as={Link} to={to} fontWeight="bold">
      {children}
    </Button>
  );
};
export const Navigation = () => {
  return (
    <VStack>
    <HStack textAlign={'center'} width= 'full' wrap="nowrap"   direction="column" >
      <Item to="/">| Home |</Item>
      <Item to="/nfts">| MY ROBOTS |</Item>
      <Item to="/vote">| VOTE |</Item>
      <Item to="/fallen">| THE FALLEN |</Item>
      <Item to="/ranking">| RANKING |</Item>
      </HStack>
      
      <HStack>
      <Item to="/legends">| MY LEGENDS |</Item>
      <Item to="/legendsvote">| LEGENDS VOTE |</Item>
      <Item to="/lranking">| LEGENDS RANKING |</Item>
      <Item to="Rampage/Gameloader">| RECKLESS RAMPAGE |</Item>
    </HStack>
    </VStack>
  );
};
