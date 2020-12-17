import { Link, useHistory, useLocation } from 'react-router-dom'
import {
    Container,
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

function Example() {
    const history = useHistory()
    const { pathname } = useLocation()

    console.log(pathname)
    let renderLevelSelect = false
    let renderBack = true
    if (pathname === '/') {
        renderLevelSelect = true
        renderBack = false
    }
    let inLevel = false
    // if (pathname.split('/').length > 3) {
    //     inLevel = true
    // }

    return (
        <Navbar color="light" light expand="md">
            <Container fluid>
                <Link className="navbar-brand" to="/">Home</Link>
                <Nav className="mr-auto" navbar>
                    {renderLevelSelect && <NavItem>
                        <Link className="nav-link" to="/sections">Level Select</Link>
                    </NavItem>}
                    {renderBack && <NavItem>
                        <NavLink onClick={history.goBack}>{inLevel ? "Exit Level" : "Back"}</NavLink>
                    </NavItem>}
                    {/* back button */}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Example;