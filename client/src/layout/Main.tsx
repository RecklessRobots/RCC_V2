import React from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from "../components/Navbar"

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <Container maxW="container.lg" pt={8} pb={4}>
      {children}
      <Navbar></Navbar>
    </Container>
    
    

  );
};

export default Main;
