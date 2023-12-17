import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { VStack, Spacer } from '@chakra-ui/react';
import { Nfts } from './views/Nfts';
import Vote from './views/vote';
import Vote2 from './views/LegendsVote';
import {Fallen} from './views/Fallen';
import {Legends} from './views/Legends';
import {Ranking} from './views/Ranking'
import {LRanking} from './views/LRanking'
import AppG from './views/game/AppG';
import Parse from 'parse';
import GameLoader from './views/GameLoader';

import RampageUniversal from './views/game/AppGCrofam'
import Skilltree from './views/game/skilltree';
import ClickerGame from './views/game/Clicker/ClickerGame';
import RampageOneManArmy_R3 from './views/game/OneManArmy';
import GameLoader_all from './views/GameLoader_all';
import teamUnlock from './views/game/teamUnlock';



function App() {
  
  Parse.initialize("RCC001");
  Parse.serverURL = 'https://reckless-command-center.herokuapp.com/server';


  return (
    <VStack minHeight="100vh">
      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="nfts" element={<Nfts />} />
          <Route path="Fallen" element={<Fallen  />} />
          <Route path="LegendsVote" element={<Vote2 />} />
          <Route path="Vote" element={<Vote />} />
          <Route path="Legends" element={<Legends />} />
          <Route path="Ranking" element={<Ranking />} />

          <Route path="Rampage/GameLoader" element={<GameLoader />} />
   
          <Route path="Rampage/Legacy" element={<RampageUniversal />} />
          <Route path="Rampage/One-Man-Army" element={<RampageOneManArmy_R3 />} />
        
          <Route path="ClickerGame" element={<ClickerGame />} />
          <Route path="" element={<ClickerGame />} />
          <Route path="Rampage/GameLoader_all" element={<GameLoader_all />} />
        </Routes>
      </Main>
      <Spacer />
      <Footer />
    </VStack>
  );
}

export default App;
