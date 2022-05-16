import './styles/About.css';
import projectTodo from '../imgs/project-todo.jpg';
import projectMulana2 from '../imgs/project-mulana2.jpg';
import projectBookshopCart from '../imgs/project-bookshopCart.jpg';
import projectTTT from '../imgs/project-TTT.jpg';
import projectCvPreview from '../imgs/project-cvPreview.jpg';
import projectJpMemory from '../imgs/project-jpMemory.jpg';

function About() {
  return (
    <div className="About container">
      <div className="aboutInfoContainer box">
        <h2 className="title is-spaced">About Where's Pikachu</h2>
        <p className="subtitle is-6">Following <a href='https://www.theodinproject.com' target="_blank">TOP</a>, this project was about 
        making a Where's Waldo. I don't really like those characters, so I thought what about using 
        another franchise with plenty of images of a lot of characters together and a ready api? Lo and behold.</p>
        <p className='subtitle is-6'>The initial idea was to have an "Impossible" level of difficulty, in which the
        only pokemon to find was Pikachu, and when you clicked on it thinking "Pff this is too ez" I'd 
        move the Pikachu sprite around the main image, or give it glowing red eyes and a creepy appearance, or cut it out 
        of the image altogether or something.
        I gave up on that because it was too much work to create a "new" game logic and state managment
        just for a silly joke.</p>
        <p className='subtitle is-6'>The tecs used for this project are as follows:</p>
        <div className='is-family-code'>
            <p>_React</p>
            <p>_React-Routes</p>
            <p>_Bulma CSS</p>
            <p>_Firebase (hosting and cloud storage)</p>
        </div>
      </div> 
      <div className='aboutOtherProjectsContainer box'>
        <h2 className="title is-4 has-text-centered">Other projects</h2>
        <div className='otherContainer'>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                <a href='https://treusk.github.io/2do/' target='_blank'><img src={projectTodo} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
                <p>Simple Todo List, very original <br/>
                I like simple looking things <br/>
                github repo - <a href="https://github.com/TreusK/2do" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                <a href='https://treusk.github.io/lm2react/' target='_blank'><img src={projectMulana2} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
              <p>I was playing La Mulana 2 and needed a place to take notes<br/>
                Even then, I got filtered<br/>
                github repo - <a href="https://github.com/TreusK/lm2react" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                <a href='https://treusk.github.io/bookShopCart/' target='_blank'><img src={projectBookshopCart} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
              <p>Uggo looking shopping cart with fake bookstore attached<br/>
                Creating each book obj was a thing<br/>
                github repo - <a href="https://github.com/TreusK/bookShopCart" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                <a href='https://treusk.github.io/TicTacToe/' target='_blank'><img src={projectTTT} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
                <p>It doesn't get any more basic than a Tic Tac Toe<br/>
                <br/>
                github repo - <a href="https://github.com/TreusK/TicTacToe" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                  <a href='https://treusk.github.io/memory-game/' target='_blank'><img src={projectJpMemory} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
                <p>Simple memory game, but with japanese words<br/>
                I still can't read anything more difficult than Kuma Bear<br/>
                github repo - <a href="https://github.com/TreusK/memory-game" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>

          <div className='projectCard'>
            <div className='card'>
              <div className="card-image">
                <figure className="image is-16by9">
                  <a href='https://treusk.github.io/cvUp/' target='_blank'><img src={projectCvPreview} alt="Placeholder image" /></a>
                </figure>
              </div>
              <div className="content">
                <p>Fill some forms and get a plain looking CV preview back<br/>
                No, you can't download it either<br/>
                github repo - <a href="https://github.com/TreusK/cvUp" target='_blank'>here</a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
