import './styles/Leaderboard.css';
import easyImgs from '../easyImgs.jpg';
import normalImgs from '../normalImgs.jpg';
import hardImgs from '../hardImgs.jpg';
import randomImgs from '../randomImgs.png';

//Leaderboard pide el estado desde firebase para mostrar pares de nombres y tiempos.
function Leaderboard({difficulty}) {

  let defaultScores = {
    easy: [
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      }
    ],
    normal: [
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      }
    ],
    hard: [
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      }
    ],
    random: [
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      },
      {
        name: 'Treus',
        time: '10m 30s'
      }
    ]
  };

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
        <Top30 idProp='topEasy' scores={defaultScores.easy} imgSet={easyImgs}/>
        <Top30 idProp='topNormal' scores={defaultScores.normal} imgSet={normalImgs}/>
        <Top30 idProp='topHard' scores={defaultScores.hard} imgSet={hardImgs}/>
        <Top30 idProp='topRandom' scores={defaultScores.random} imgSet={randomImgs}/>
      </div>
    </div>
  );
}


function Top30({scores, idProp, imgSet}) {
  let diff = idProp.slice(3);
  return(
    <div className='Top30 message' id={idProp}>
      <div className='top30Head message-header'>
        <h2>{'Top 30 ' + diff}</h2>
        <img src={imgSet} alt='imgSet'/>
      </div>
      <div className='top30Body message-body'>
        {scores.map((elem, index) => 
          <div className='scoreDiv' key={'key' + index}>
            <div className='scoreRank'>{index+1}</div>
            <div className='scoreName'>{elem.name}</div>
            <div className='scoreTime'>{elem.time}</div>
          </div>    
        )}
      </div>
    </div>
  )
}

export default Leaderboard;
