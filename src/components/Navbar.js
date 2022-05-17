import { Link } from 'react-router-dom';
import pikachuIcon from '../imgs/pika.png';
import './styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar Navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to='/'>
                    <img id='pikachuIconLogo' src={pikachuIcon} alt='pikachuLogo'/>
                </Link>
            </div>

            <div id="navbarBasicExample" className="navbar-menu is-active">
                <div className="navbar-end">
                    <Link to='/leaderboard' className="navbar-item">
                        Leaderboard
                    </Link>

                    <Link to='/about' className="navbar-item">
                        About
                    </Link>
                </div>
            </div>
        </nav>              
    );
  }
  
export default Navbar;