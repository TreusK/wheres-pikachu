import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar Navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to='/'>
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
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