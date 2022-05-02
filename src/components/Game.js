import './styles/Game.css';
import mainImage from '../mainImage2.png';
import coordinatesOfPokemon from './coordinatesOfPokemon.js';
import { useState, useEffect, setState } from 'react';

const originalWidth = 1080;
const originalHeight = 1352;

function Game({monsToFind}) {
  //States
  ///show or hide the context menu
  const [showTagCircle, setShowTagCircle] = useState(false);
  ///keep current size of image
  const [currentSize, setCurrentSize] = useState({
    x: undefined,
    y: undefined,
  })
  ///keep coordinates of where was the image clicked
  const [coords, setCoords] = useState({
    x: '',
    y: '',
  })
  ///save the images of the mons after fetching from pokeapi
  const [monsToFindImgs, setMonsToFindImgs] = useState({
    mon1: '',
    mon2: '', 
    mon3: '',
  });

  //Async function to fetch a single pokemon object from PokeApi
  async function fetchImage(nameOfMon) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + nameOfMon)
    return await response.json();
  }
  //Async function to fetch 3 times, and set the images in monsToFindImgs
  async function fetch3Images() {
    let arrOfRes = await Promise.all([fetchImage(monsToFind[0]), fetchImage(monsToFind[1]), fetchImage(monsToFind[2])]);
    let imgs = {
      mon1: arrOfRes[0].sprites.front_default,
      mon2: arrOfRes[1].sprites.front_default,
      mon3: arrOfRes[2].sprites.front_default,
    }
    setMonsToFindImgs(imgs);
  }

  //use effect to fetch images and hide context menu on resize
  function handleEffect() {
    fetch3Images();
    window.addEventListener("resize", () => setShowTagCircle(false));
    return () => window.removeEventListener("resize", () => setShowTagCircle(false));
  }

  useEffect(handleEffect, []);


  //Normal Functions 
  //function to run when the image is clicked
  function handleGameClick(e) {
    setCurrentSize({x: e.target.width, y: e.target.height});
    setShowTagCircle(true);
    checkCoord(e);
  }

  function checkCoord(e) {
    let coordX = e.nativeEvent.offsetX;
    let coordY = e.nativeEvent.offsetY;
    setCoords({x: coordX, y: coordY});
  }

  //Return Component
  return (
    <div className="Game">
      <div id='monsImgContainer'>
        <img src={monsToFindImgs.mon1} alt='mon'/>
        <img src={monsToFindImgs.mon2} alt='mon'/>
        <img src={monsToFindImgs.mon3} alt='mon'/>
      </div>
      <div id='mainImgContainer' >
        <img id='mainImg' src={mainImage} onClick={handleGameClick}/>
        {showTagCircle && <ContextMenu currentSize={currentSize} coordinates={coords} monsToFindImgs={monsToFindImgs} monsToFind={monsToFind}/>}
      </div>
    </div>
  );
}


function ContextMenu({currentSize, coordinates, monsToFindImgs, monsToFind}) {
  function handleContextMenuClick(e) {
    let name = getNameOfMon(e);
    let origXY = [coordinatesOfPokemon[name].x, coordinatesOfPokemon[name].y];
    let newXY = calculateNewXY(origXY[0], origXY[1], currentSize.x, currentSize.y);
  }

  function getNameOfMon(event) {
    let index;
    (event.target.tagName != 'DIV') 
      ? index = +event.target.parentElement.classList[0][1]
      : index = +event.target.classList[0][1];
    return monsToFind[index];
  }

  function calculateNewXY(originalX, originalY, newWidth, newHeight) {
    let newX = newWidth * originalX / originalWidth;
    let newY = newHeight * originalY / originalHeight;
    return [newX, newY];
  }

  function validatePokemon(name, coords) {
    
  }

  return(
    <div className='contextMenuContainer' style={{top: `${coordinates.y-40}px`, left: `${coordinates.x-40}px`}}>
      <div className='tagCircle'></div>
      <div className='charsListMenu'>
        <div onClick={handleContextMenuClick} className='p0'>
          <img src={monsToFindImgs.mon1} alt={'mon'}/>
          <span>{monsToFind[0][0].toUpperCase() + monsToFind[0].slice(1)}</span>
        </div>
        <div onClick={handleContextMenuClick} className='p1'>
          <img src={monsToFindImgs.mon2} alt='mon'/>
          <span>{monsToFind[1][0].toUpperCase() + monsToFind[1].slice(1)}</span>
        </div>
        <div onClick={handleContextMenuClick} className='p2'>
          <img src={monsToFindImgs.mon3} alt='mon'/>
          <span>{monsToFind[2][0].toUpperCase() + monsToFind[2].slice(1)}</span>
        </div>
      </div>
    </div> 
  )
}

export default Game;
