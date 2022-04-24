//Components import
import Navbar from './components/Navbar';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
//Library imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, setState } from 'react';
//Css imports
import './App.css';
import 'bulma/css/bulma.css';

function App() {
  //State
  ///state of mons to find
  const [monsToFind, setMonsToFind] = useState(['bulbasaur', 'squirtle', 'charmander']);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setMonsToFind={setMonsToFind}/>} />
        <Route path="game" element={<Game monsToFind={monsToFind}/>} />
        <Route path="leaderboard" element={<Leaderboard />} />
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

