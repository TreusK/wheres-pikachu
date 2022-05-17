//Components import
import Navbar from './components/Navbar';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
//Library imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {doc, getDoc} from 'firebase/firestore';
//Css imports
import './App.css'; 
import 'bulma/css/bulma.css';

function App() {


  //State
  ///state of mons to find
  const [monsToFind, setMonsToFind] = useState(['wobbuffet', 'electrode', 'wailord']);
  ///state of difficulty
  const [diffic, setDiffic] = useState('easy');
  ///state of starting time
  const [timer, setTimer] = useState();
  ///states of scores, to fetch from firebase DB
  const [topEasy, setTopEasy] = useState([]);
  const [topNormal, setTopNormal] = useState([]);
  const [topHard, setTopHard] = useState([]);
  const [topRandom, setTopRandom] = useState([]);

  useEffect(() => {
    async function getLeaderBoard() {
      const easyRef = doc(db, 'leaderBoard', 'topEasy');
      const normalRef = doc(db, 'leaderBoard', 'topNormal');
      const hardRef = doc(db, 'leaderBoard', 'topHard');
      const randomRef = doc(db, 'leaderBoard', 'topRandom'); 
      let responseEasy = await getDoc(easyRef);
      let responseNormal = await getDoc(normalRef);
      let responseHard = await getDoc(hardRef);
      let responseRandom = await getDoc(randomRef);
      setTopEasy(Object.entries(responseEasy.data()));
      setTopNormal(Object.entries(responseNormal.data()));
      setTopHard(Object.entries(responseHard.data()));
      setTopRandom(Object.entries(responseRandom.data()));
    }

    getLeaderBoard();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setMonsToFind={setMonsToFind} setDiffic={setDiffic}/>} />
        <Route path="game" element={<Game monsToFind={monsToFind} diffic={diffic} timer={timer} setTimer={setTimer} setLeaderboard={{setTopEasy, setTopNormal, setTopHard, setTopRandom}}/>} />
        <Route path="leaderboard" element={<Leaderboard leaderboard={{topEasy, topNormal, topHard, topRandom}}/>} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



