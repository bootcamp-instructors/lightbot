import { Link, useHistory, useLocation } from 'react-router-dom'
import {
    Container,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { useAppContext } from '../utilities/AppContext'

function Example() {
    const history = useHistory()
    const { pathname } = useLocation()
    const { setScreenWidth } = useAppContext()

    let renderLevelSelect = false
    let renderBack = true
    if (pathname === '/') {
        renderLevelSelect = true
        renderBack = false
    }
    let inLevel = false

    // TODO: if current level page has been completed, render "next level" button here

    return (
        <Navbar color="light" light expand="md">
            <Container fluid>
                <Link className="navbar-brand" to="/">Home</Link>

                <Nav className="mr-auto" navbar>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                resize screen width
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => setScreenWidth(p => 1)}>
                                regular
                            </DropdownItem>
                            <DropdownItem onClick={() => setScreenWidth(p => .75)}>
                                small screen
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
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