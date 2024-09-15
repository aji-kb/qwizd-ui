import './menu.css';
import { Link } from 'react-router-dom';

const Menu = ()=>{
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light navbar-custom'>
                <a className='navbar-brand' href='#'>QuizWizard</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className="collapse navbar-collapse menu" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/Home">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Quiz
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/Start">Start</Link>
                            <Link className="dropdown-item" to="/History">History</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contact</Link>
                    </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Menu;