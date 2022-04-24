import './styles/Game.css';
import { useState, useEffect, setState } from 'react';

function Game({monsToFind}) {
  const [monsToFindImgs, setMonsToFindImgs] = useState({
    mon1: '',
    mon2: '', 
    mon3: '',
  });

  async function fetchImage(nameOfMon) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + nameOfMon)
    return await response.json();
  }
  async function fetch3Images() {
    console.log('running the fetchin');
    let arrOfRes = await Promise.all([fetchImage(monsToFind[0]), fetchImage(monsToFind[1]), fetchImage(monsToFind[2])]);
    let imgs = {
      mon1: arrOfRes[0].sprites.front_default,
      mon2: arrOfRes[1].sprites.front_default,
      mon3: arrOfRes[2].sprites.front_default,
    }
    setMonsToFindImgs(imgs);
  }

  useEffect(() => fetch3Images, []);
  

  function checkCoord(e) {
    let coordX = e.nativeEvent.offsetX;
    let coordY = e.nativeEvent.offsetY;
  }

  return (
    <div className="Game">
      <div id='monsImgContainer'>
        <img src={monsToFindImgs.mon1} alt='mon'/>
        <img src={monsToFindImgs.mon2} alt='mon'/>
        <img src={monsToFindImgs.mon3} alt='mon'/>
      </div>
      <div id='mainImgContainer' onClick={checkCoord}></div>
    </div>
  );
}

export default Game;
