import './styles/Game.css';
import mainImage from '../mainImage2.png';
//To Do: Have the coords of mons obj in the backend to validate and call it every time I guess (or maybe once with the 3 mons)
import coordinatesOfPokemon from './coordinatesOfPokemon.js';
import { useState, useEffect, setState } from 'react';
import { Link } from 'react-router-dom';
import {db} from '../firebase-config';
import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import 'bulma/css/bulma.css';

const originalWidth = 1080;
const originalHeight = 1352;

function Game({monsToFind, diffic, timer, setTimer, setLeaderboard}) {
  //States
  ///show or hide the context menu
  const [showTagCircle, setShowTagCircle] = useState(false);
  ///show or hide game over form
  const [showGameOver, setShowGameOver] = useState(false);
  ///keep final score
  const [score, setScore] = useState(0);
  
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
    setTimer(Date.now());
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

  //Helper function to read ml better
  function readMiliseconds(ml){
    const second = 1000;
    const minute = second * 60;
    let minutes = Math.floor(ml / minute % 60);
    let seconds = Math.floor(ml / second % 60);
    if(minutes === 0) {
      return seconds+"s";
    } else if(seconds === 0) {
      return minutes+"m";
    }
    return minutes + "m" + seconds + "s";
  }

  //Return Component
  return (
    <div id="Game" style={styleValidation}>
      <div id='monsImgContainer'>
        {monsToFindImgs.map((elem, index) => 
            <img src={elem} alt='...' key={index}/>
          )}
      </div>
      <div id='mainImgContainer' >
        <img id='mainImg' src={mainImage} onClick={handleGameClick} alt='mainMainMainImg'/>
        {showTagCircle && <ContextMenu 
                              currentSize={currentSize} coordinates={coords} 
                              monsToFindImgs={monsToFindImgs} localMonsToFind={localMonsToFind} 
                              setShowTagCircle={setShowTagCircle} setStyleValidation={setStyleValidation}
                              setLocalMonsToFind={setLocalMonsToFind} setMonsToFindImgs={setMonsToFindImgs}
                              monsToFind={monsToFind} setShowGameOver={setShowGameOver} timer={timer}
                              setScore={setScore}
                              />}
      </div>
      {showGameOver && <GameOverScreen setShowGameOver={setShowGameOver} diffic={diffic} readMiliseconds={readMiliseconds} score={score} setLeaderboard={setLeaderboard}/> }
    </div>
  );
}



//Yes I know, the number of props is ridiculous
function ContextMenu({currentSize, coordinates, monsToFindImgs, setMonsToFindImgs, localMonsToFind, setLocalMonsToFind, setShowTagCircle, setStyleValidation, monsToFind, setShowGameOver, timer, setScore}) {
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
    (event.target.tagName !== 'DIV') 
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
      if(monsArr.length === 0) {
        gameOver();
        setShowGameOver(true);
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
  function gameOver() {
    let endTimer = Date.now();
    let scoreMl = endTimer - timer;
    setScore(scoreMl);
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




function GameOverScreen({setShowGameOver, diffic, score, readMiliseconds, setLeaderboard}) {
  const [inputValue, setInputValue] = useState('');

  let capDiffic = diffic[0].toUpperCase() + diffic.slice(1);
  let lowDiffic = diffic[0];
  let readableScore = readMiliseconds(score);

  function handleInputChange(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  //Helper function to see if the new score is gud enough to be in the Top 10
  function checkIfGudEnuf(scoreMl, arrOfScores) {
    arrOfScores
    .sort((a,b) => {
      return a[1][1] - b[1][1];
    });
    let scoreToEdit = '';
    if(arrOfScores[9][1][1] > scoreMl) {
      scoreToEdit = arrOfScores[9][0];
    }
    return scoreToEdit;
  }

  async function handleSubmit(difficulty, mlScore, inpValue, lowCaseDiffic) {
    let reference = doc(db, 'leaderBoard', 'top'+difficulty);
    let refSnap = await getDoc(reference);
    let docLenght = Object.entries(refSnap.data()).length;
    let localArr = Object.entries(refSnap.data());
    localArr.sort((a,b) => {
      return a[1][1] - b[1][1];
    });
    if(docLenght >= 10) { 
      let scoreToEdit = checkIfGudEnuf(mlScore, Object.entries(refSnap.data()));
      if(scoreToEdit !== '') {
        localArr[9][1][0] = inpValue;
        localArr[9][1][1] = mlScore;
        setLeaderboard['setTop'+capDiffic](localArr);
        await updateDoc(reference, {
          [scoreToEdit]: [inpValue, mlScore]
        })
      }
    } else {
      let next = docLenght+1;
      let next2 = lowCaseDiffic+next;
      setLeaderboard['setTop'+capDiffic](Object.entries(refSnap.data()).concat([[next2, [inpValue, mlScore]]]));
      await setDoc(reference, { [next2]: [inpValue, mlScore] }, { merge: true });
    }
    setShowGameOver(false);
  }

  return(
    <div className='GameOverScreen'>
      <div className='formContainer box p-5'>
        <p className='title has-text-centered'>You Caught Them All!</p>
        <hr/>
        <p className='subtitle'>Add your record to the leaderboard</p>
        <input onChange={(e) => handleInputChange(e)} value={inputValue} maxLength='10' className='input' type='text' placeholder='your name'/>
        <div className='has-text-justified'>
          <p>Difficulty - {capDiffic}</p>
          <p>Time - {readableScore}</p>
        </div>
        <hr/>
        <Link to='/leaderboard' className='button' onClick={() => handleSubmit(capDiffic, score, inputValue, lowDiffic)}>Submit</Link>
      </div>
    </div>
  )
}


export default Game;
