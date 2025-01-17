import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/listado">Listado</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/perfil">Perfil de Usuario</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/buscador">Buscador</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
