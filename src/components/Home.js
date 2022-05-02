import { Link } from 'react-router-dom';
import './styles/Home.css';

//Object to keep the values of mons to search depending on the difficulty
const objOfMons = {
  easy: ['chikorita', 'voltorb', 'squirtle'],
  normal: ['charmander', 'bulbasaur', 'totodile'],
  hard: ['gastly', 'dragonite', 'tauros'],
  //random returns an array of 3 random numbers between 0 and 50, the pokeapi can take numbers too so it just werks
  random: function() {
    let arrOfThreeRandoms = [];
    do {
      let rndom = Math.floor(Math.random() * 50);
      if(!arrOfThreeRandoms.includes(rndom)) {
        arrOfThreeRandoms.push(rndom);
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
      details of shit here
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
