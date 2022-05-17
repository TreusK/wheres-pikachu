import { Link } from 'react-router-dom';
import './styles/Home.css';
import easyB from '../imgs/easyBulbasaur.png';
import normalS from '../imgs/normalSquirtle.png';
import hardC from '../imgs/hardCharmander.png';
import randomQ from '../imgs/randomQuestion.png';

//Array of names of mons, to use with random
const allNames = ['wobbuffet', 'wailord', 'electrode', 'mew', 'kabutops', 'hitmontop', 'shuckle', 'doduo', 'yamask', 
                  'pikachu', 'charmander', 'smoochum', 'scizor', 'abra', 'cyndaquil', 'riolu', 'crobat', 'glalie', 
                  'froslass', 'ducklett', 'umbreon', 'celebi', 'miensaho', 'ampharos', 'aron', 'shieldon', 'onix', 
                  'magnemite', 'eevee', 'musharna', 'blastoise', 'snorlax', 'tauros', 'zapdos', 'weezing', 'vanilluxe', 
                  'jirachi', 'numel', 'golduck', 'rattata', 'gothita', 'pichu', 'scrafty', 'regice', 'weavile', 
                  'primeape', 'ursaring', 'munchlax', 'marill', 'metapod', 'foongus', 'gallade', 'staryu', 'drifloon', 
                  'lucario', 'larvitar', 'seaking', 'volcarona', 'cloyster', 'arbok', 'porygon', 'graveler', 'chansey', 
                  'poliwrath', 'cacnea', 'spoink', 'gyarados', 'kricketune', 'shedinja', 'cranidos', 'elekid', 'golem', 
                  'mandibuzz', 'tropius', 'banette', 'accelgor'];


//Object to keep the values of mons to search depending on the difficulty
const objOfMons = {
  easy: ['wobbuffet', 'electrode', 'wailord'],
  normal: ['mew', 'kabutops', 'hitmontop'],
  hard: ['shuckle', 'doduo', 'yamask'],
  //random returns an array of 3 random names
  random: function() {
    let arrOfThreeRandoms = [];
    do {
      let rndom = Math.floor(Math.random() * 77);
      if(!arrOfThreeRandoms.includes(allNames[rndom]) && allNames[rndom] !== undefined) {
        arrOfThreeRandoms.push(allNames[rndom]);
      }
    } while (arrOfThreeRandoms.length < 3);
    return arrOfThreeRandoms;
  },
}

//Component Home
function Home({ setMonsToFind, setDiffic }) {

  //Setting the monsToFind state depending on the difficulty button pressed
  function setMons(e) {
    let textValue = e.target.innerText.toLowerCase();
    if(textValue !== 'random') {
      setMonsToFind(objOfMons[textValue])
    } else {
      setMonsToFind(objOfMons.random());
    }
    setDiffic(textValue);
  }

  return (
    <div className="Home">
      <hr/>
      <div id='difficultyContainer' className='box'>
        <h1 className='has-text-centered is-size-3'>Choose your starter!</h1>
        <hr/>
        <div className='btnContainer is-flex is-align-items-center'>
          <img src={easyB} alt='easyDiff mon'/>
          <Link to='/game' className='button' onClick={setMons}>Easy</Link>
        </div>
        <div className='btnContainer is-flex is-align-items-center'>
          <img src={normalS} alt='normalDiff mon'/>
          <Link to='/game' className='button' onClick={setMons}>Normal</Link>
        </div>
        <div className='btnContainer is-flex is-align-items-center'>
          <img src={hardC} alt='hardDiff mon'/>
          <Link to='/game' className='button' onClick={setMons}>Hard</Link>
        </div>
        <div className='btnContainer is-flex is-align-items-center'>
          <img src={randomQ} alt='randomDiff mon'/>
          <Link to='/game' className='button' onClick={setMons}>Random</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
