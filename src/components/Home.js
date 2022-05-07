import { Link } from 'react-router-dom';
import './styles/Home.css';

//Array of names of mons, to use with random
const allNames = ['wobbuffet', 'wailord', 'electrode', 'mew', 'kabutops', 'hitmontop', 'shuckle', 'doduo', 'yamask', 
                  'pikachu', 'charmander', 'smoochum', 'scizor', 'abra', 'cyndaquil', 'riolu', 'crobat', 'glalie', 
                  'froslass', 'ducklett', 'umbreon', 'celebi', 'miensaho', 'ampharos', 'aron', 'shieldon', 'onix', 
                  'magnemite', 'eevee', 'musharna', 'blastoise', 'snorlax', 'tauros', 'zapdos', 'weezing', 'vanilluxe', 
                  'jirachi', 'numel', 'golduck', 'rattata', 'gothita', 'pichu', 'scrafty', 'regice', 'weavile', 
                  'primeape', 'ursaring', 'munchlax', 'marill', 'metapod', 'foongus', 'gallade', 'staryu', 'drifloon', 
                  'lucario', 'larvitar', 'seaking', 'volcarona', 'cloyster', 'arbok', 'porygon', 'graveler', 'chansey', 
                  'poliwrath', 'cacnea', 'spoink', 'gyarados', 'kricketune', 'shedinja', 'cranidos', 'elekid', 'golem', 
                  'mandibuzz'];

//Object to keep the values of mons to search depending on the difficulty
const objOfMons = {
  easy: ['wobbuffet', 'electrode', 'wailord'],
  normal: ['mew', 'kabutops', 'hitmontop'],
  hard: ['shuckle', 'doduo', 'yamask'],
  //random returns an array of 3 random names
  random: function() {
    let arrOfThreeRandoms = [];
    do {
      let rndom = Math.floor(Math.random() * 74);
      if(!arrOfThreeRandoms.includes(allNames[rndom])) {
        arrOfThreeRandoms.push(allNames[rndom]);
      }
    } while (arrOfThreeRandoms.length < 3);
    return arrOfThreeRandoms;
  },
}

//Component Home
function Home({ setMonsToFind }) {

  //Setting the monsToFind state depending on the difficulty button pressed
  function setMons(e) {
    let textValue = e.target.innerText.toLowerCase();
    if(textValue != 'random') {
      setMonsToFind(objOfMons[textValue])
    } else {
      setMonsToFind(objOfMons.random());
    }
  }

  return (
    <div className="Home">
      Extra fluff here
      <div id='difficultyContainer' className='box'>
        <div className='btnContainer'>
          <img/>
          <Link to='/game' className='button' onClick={setMons}>Easy</Link>
        </div>
        <div className='btnContainer'>
          <img/>
          <Link to='/game' className='button' onClick={setMons}>Normal</Link>
        </div>
        <div className='btnContainer'>
          <img/>
          <Link to='/game' className='button' onClick={setMons}>Hard</Link>
        </div>
        <div className='btnContainer'>
          <img/>
          <Link to='/game' className='button' onClick={setMons}>Random</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
