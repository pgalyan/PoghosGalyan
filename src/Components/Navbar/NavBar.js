import { Nav } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
            <Nav className="mr-auto">
                <NavLink to="/" className="mx-3" activeStyle={{color: "red"}} exact={true}>ToDo</NavLink>
                <NavLink to="/contact" className="mx-3" activeStyle={{color: "red"}} exact={true}>Contact</NavLink>
                <NavLink to="/about" className="mx-3" activeStyle={{color: "red"}} exact={true}>About</NavLink>
            </Nav>
    )
}

export default Navbar