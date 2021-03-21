import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const navBarItems = [
    {
        to: "/",
        value: "Home"
    },
    {
        to: "/contact",
        value: "Contact"
    },
    {
        to: "/about",
        value: "About"
    },
    
]

const Navbar = () => {
    const navBarList = navBarItems.map((item, index) => {
        return (
            <Nav.Item key={index}>
                <NavLink
                    to={item.to}
                    className="mx-3"
                    activeStyle={{ color: "red" }}
                    exact={true}>
                    {item.value}
                </NavLink>
            </Nav.Item>
            
        )
    })
    return (
        <Nav className="mr-auto">
            {navBarList}
        </Nav>
    )
}

export default Navbar