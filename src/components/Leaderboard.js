import './styles/Leaderboard.css';
import easyImgs from '../easyImgs.jpg';
import normalImgs from '../normalImgs.jpg';
import hardImgs from '../hardImgs.jpg';
import randomImgs from '../randomImgs.png';
import {useEffect} from 'react';

//Leaderboard pide el estado desde firebase para mostrar pares de nombres y tiempos.
function Leaderboard({difficulty, leaderboard}) {

  let defaultEasy = [
    ['e1', ['Treus', 10000]],
    ['e2', ['Cat', 20000]],
  ]
  let defaultNormal = [
    ['n1', ['Treus', 10000]],
    ['n2', ['Dog', 30000]],
  ]
  let defaultHard = [
    ['h1', ['Treus', 10000]],
    ['h2', ['Grandma', 20000]],
  ]
  let defaultRandom = [
    ['r1', ['Treus', 10000]],
    ['r2', ['Pikachu', 20000]],
  ]

  return (
    <div className="Leaderboard">
      <h1 className='title'>Trainers Hall of Fame</h1>
      <div id='leaderboardLinks'>
        <a href="#topEasy" className='button is-link is-light is-small'>Easy</a>
        <a href="#topNormal" className='button is-link is-light is-small'>Normal</a>
        <a href="#topHard" className='button is-link is-light is-small'>Hard</a>
        <a href="#topRandom" className='button is-link is-light is-small'>Random</a>
      </div>
      <div id='scoresContainer'>
        <Top30 idProp='topEasy' scores={leaderboard.topEasy || defaultEasy} imgSet={easyImgs}/>
        <Top30 idProp='topNormal' scores={leaderboard.topNormal || defaultNormal} imgSet={normalImgs}/>
        <Top30 idProp='topHard' scores={leaderboard.topHard || defaultHard} imgSet={hardImgs}/>
        <Top30 idProp='topRandom' scores={leaderboard.topRandom || defaultRandom} imgSet={randomImgs}/>
      </div>
    </div>
  );
}


function Top30({scores, idProp, imgSet}) {
  let diff = idProp.slice(3);

  function readMiliseconds(ml){
    const second = 1000;
    const minute = second * 60;
    let minutes = Math.floor(ml / minute % 60);
    let seconds = Math.floor(ml / second % 60);
    if(minutes == 0) {
      return seconds+"s";
    } else if(seconds == 0) {
      return minutes+"m";
    }
    return minutes + "m" + seconds + "s";
  }

  return(
    <div className='Top30 message' id={idProp}>
      <div className='top30Head message-header'>
        <h2>{'Top 30 ' + diff}</h2>
        <img src={imgSet} alt='imgSet'/>
      </div>
      <div className='top30Body message-body'>
        {scores
        .sort((a,b) => {
          return a[1][1] - b[1][1];
        })
        .map((elem, index) => 
          <div className='scoreDiv' key={'key' + index}>
            <div className='scoreRank'>{index+1}</div>
            <div className='scoreName'>{elem[1][0]}</div>
            <div className='scoreTime'>{readMiliseconds(elem[1][1])}</div>
          </div>    
        )}
      </div>
    </div>
  )
}

export default Leaderboard;
