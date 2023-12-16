import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { useMoralis } from 'react-moralis';
import metamask from '../views/game/metamask.png'
import defiwallet from '../views/game/defiwallet.png'

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const {
    enableWeb3,
    isWeb3Enabled,
    web3EnableError,
    isWeb3EnableLoading,
    deactivateWeb3,
    account,
    chainId,
    connectorType,
    network,
  } = useMoralis();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'black'} color={'white'} borderWidth={'0.2vmax'} >
        <ModalHeader>Connected network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack padding='1vmax' alignItems="stretch">
            {isWeb3Enabled && (
              <Box>
                Current connection:
                <UnorderedList>
                  <ListItem>Account: {account}</ListItem>
                  <ListItem>Chain: {chainId}</ListItem>
                  <ListItem>ConnectorType: {connectorType}</ListItem>
                  <ListItem>Network: {network}</ListItem>
                </UnorderedList>
              </Box>
            )}
            {web3EnableError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error: {web3EnableError.name}</AlertTitle>
                <AlertDescription>{web3EnableError.message}</AlertDescription>
              </Alert>
            )}
            <Button   alignItems='center' justifyContent='space-evenly' onClick={() => enableWeb3({ provider: 'metamask' }).then(onClose)} disabled={isWeb3EnableLoading}>
              <img  width='5%' height='5%' src={metamask}></img>Metamask / DeFi Wallet  <img width='5%' height='5%' src={defiwallet}></img>
            </Button>
            <Button
              onClick={() => enableWeb3({ provider: 'walletconnect' }).then(onClose)}
              disabled={isWeb3EnableLoading}
            >
              WalletConnect
            </Button>
           
            {isWeb3Enabled && (
              <Button onClick={deactivateWeb3} color="red" disabled={isWeb3EnableLoading}>
                Disconnect
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
