//Components import
import Navbar from './components/Navbar';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
//Library imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, setState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, doc, getDoc} from 'firebase/firestore';
//Css imports
import './App.css';
import 'bulma/css/bulma.css';

function App() {
  const easyRef = doc(db, 'leaderBoard', 'topEasy');
  const normalRef = doc(db, 'leaderBoard', 'topNormal');
  const hardRef = doc(db, 'leaderBoard', 'topHard');
  const randomRef = doc(db, 'leaderBoard', 'topRandom');

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

//Componentes a necesitar:
///Navbar, con Logo y 2 links (leaderboard, about)

///Home, con detalles y ChooseDifficulty component
////ChooseDifficulty tiene 5 botones, easy normal hard, random impossible

///Game, con la imagen de fondo, un div abajo del navbar con los bichos a encontrar, y la logica del juego

///Leaderboard, con informacion del backend

///About, con boludeces y github link

///Preguntas
//La validacion de X Y de cada bicho, es cada vez que clickeo? O puedo pedir las coord al server en cuanto empieza el juego
// una sola vez, y comparar desde ahi en cada click?

