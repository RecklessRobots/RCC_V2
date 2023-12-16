import React, { useState } from 'react';
import { Box, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import RampageStart from './game/RampageStart.gif'

function YourComponent() {
  const [playvideoOpen, setplayvideoOpen] = useState(true);

  setTimeout(() => {
    setplayvideoOpen(false);
  }, 12000);
  const closingDown = () => {
    setplayvideoOpen(false);
  };

  return (
    <Box boxSize={'100%'} >
    <Modal isOpen={playvideoOpen} onClose={closingDown} size={'5xl'}> 
      <ModalOverlay />
      <ModalContent backgroundColor={'black'} textColor={'white'} className='modal'>
      {playvideoOpen && (
   
          <ModalBody>
           <Box boxSize={'100%'}> <img width={'100%'} src={RampageStart} alt="Exp" /></Box>
          </ModalBody>
      
      )} </ModalContent>
        </Modal>
    </Box>
  );
}

export default YourComponent;