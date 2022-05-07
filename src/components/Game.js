import './styles/Game.css';
import mainImage from '../mainImage2.png';
//To Do: Have the coords of mons obj in the backend to validate and call it every time I guess (or maybe once with the 3 mons)
import coordinatesOfPokemon from './coordinatesOfPokemon.js';
import { useState, useEffect, setState } from 'react';
import 'bulma/css/bulma.css';

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
  const [monsToFindImgs, setMonsToFindImgs] = useState([]);
  ///copy of monsToFind state, to manipulate freely here
  const [localMonsToFind, setLocalMonsToFind] = useState([...monsToFind]);
  ///style state to inform if the pokemon was found or not
  const [styleValidation, setStyleValidation] = useState({
    backgroundColor: 'white',
  })

  //Async function to fetch a single pokemon object from PokeApi
  async function fetchImage(nameOfMon) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + nameOfMon)
    return await response.json();
  }
  //Async function to fetch 3 times, and set the images in monsToFindImgs
  async function fetch3Images() {
    let arrOfRes = await Promise.all([fetchImage(monsToFind[0]), fetchImage(monsToFind[1]), fetchImage(monsToFind[2])]);
    let imgs = [
      arrOfRes[0].sprites.front_default,
      arrOfRes[1].sprites.front_default,
      arrOfRes[2].sprites.front_default,
    ]
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
    <div id="Game" style={styleValidation}>
      <div id='monsImgContainer'>
        {monsToFindImgs.map(elem => 
            <img src={elem} alt='...'/>
          )}
      </div>
      <div id='mainImgContainer' >
        <img id='mainImg' src={mainImage} onClick={handleGameClick}/>
        {showTagCircle && <ContextMenu 
                              currentSize={currentSize} coordinates={coords} 
                              monsToFindImgs={monsToFindImgs} localMonsToFind={localMonsToFind} 
                              setShowTagCircle={setShowTagCircle} setStyleValidation={setStyleValidation}
                              setLocalMonsToFind={setLocalMonsToFind} setMonsToFindImgs={setMonsToFindImgs}
                              monsToFind={monsToFind}
                              />}
      </div>
    </div>
  );
}




function ContextMenu({currentSize, coordinates, monsToFindImgs, setMonsToFindImgs, localMonsToFind, setLocalMonsToFind, setShowTagCircle, setStyleValidation, monsToFind}) {
  //Main function for when the context menu is clicked
  function handleContextMenuClick(e) {
    let name = getNameOfMon(e);
    let origXY = [coordinatesOfPokemon[name].x, coordinatesOfPokemon[name].y];
    let newXY = calculateNewXY(origXY[0], origXY[1], currentSize.x, currentSize.y);
    validatePokemon(name, newXY);
    setShowTagCircle(false);
  }

  //Helper function to get the name of the mon in the context menu clicked
  function getNameOfMon(event) {
    let index;
    (event.target.tagName != 'DIV') 
      ? index = +event.target.parentElement.classList[0][1]
      : index = +event.target.classList[0][1];
    return localMonsToFind[index];
  }

  //Helper function to know where the relative x, y coordinats are now
  function calculateNewXY(originalX, originalY, newWidth, newHeight) {
    let newX = newWidth * originalX / originalWidth;
    let newY = newHeight * originalY / originalHeight;
    return [newX, newY];
  }

  //Helper function to validate a click, if the user found the right pokemon
  function validatePokemon(name, monCoords) {
    let minX = monCoords[0]-30;
    let maxX = monCoords[0]+30;
    let minY = monCoords[1]-30;
    let maxY = monCoords[1]+30;
    if(coordinates.x >= minX && coordinates.x <= maxX && coordinates.y >= minY && coordinates.y <= maxY) {
      validationColor('green');
      let index = localMonsToFind.indexOf(name);
      let monsImgsArr = [...monsToFindImgs];
      let monsArr = [...localMonsToFind];
      monsImgsArr.splice(index, 1);
      monsArr.splice(index, 1);
      setLocalMonsToFind(monsArr);
      setMonsToFindImgs(monsImgsArr);
      if(monsArr.length == 0) {
        gameOver(monsToFind);
      }
    } else {
      validationColor('red');
    }
  }

  //Helper function to change style depending on right or wrong pokemon
  function validationColor(clr) {
    setStyleValidation({ backgroundColor: clr });
    setTimeout(() => {
      setStyleValidation({ backgroundColor: 'white', transition: 'all 0.5s ease' });
    }, 500);
  }

  //Helper function for game over (user won)
  function gameOver(originalMons) {
    let diffic = '';
    if(originalMons.join('') == 'wobbuffetelectrodewailord') {
      diffic = 'easy';
    } else if(originalMons.join('') == 'mewkabutopshitmontop') {
      diffic = 'normal';
    } else if(originalMons.join('') == 'shuckledoduoyamask') {
      diffic = 'hard';
    } else {
      diffic = 'random';
    }
    console.log(diffic);
  }

  return(
    <div className='contextMenuContainer' style={{top: `${coordinates.y-40}px`, left: `${coordinates.x-40}px`}}>
      <div className='tagCircle'></div>
      <div className='charsListMenu'>
        {monsToFindImgs.map((mon, index) => 
          <div onClick={handleContextMenuClick} className={'p' + index} key={index}>
            <img src={mon} alt={'mon'}/>
            <span>{localMonsToFind[index][0].toUpperCase() + localMonsToFind[index].slice(1)}</span>
          </div>)
        }
      </div>
    </div> 
  )
}


export default Game;
