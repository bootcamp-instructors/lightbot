import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
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
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
import { useState, useEffect } from 'react';

function Example() {
    const history = useHistory()
    const { pathname } = useLocation()
    const { setScreenWidth, userData } = useAppContext()

    let renderLevelSelect = false
    let renderBack = true
    if (pathname === '/') {
        renderLevelSelect = true
        renderBack = false
    }
    let inLevel = false


    const [userCompleted, setUserCompleted] = useState(false)
    const [nextLevel, setNextLevel] = useState(false)
    useEffect(() => {
        if (pathname.split('/')[1] === 'level') {
            const sectionName = pathname.split('/')[2]
            const levelID = pathname.split('/')[3]

            const section = sections.find(section => section.name === sectionName)
            const foundLevel = !!section
                ? levels.find(l => l.section_id === section.id && l.level_id === parseInt(levelID))
                : undefined
            const levelData = !!foundLevel ? foundLevel.level_data : []
            // check userData
            if (foundLevel) {

                console.log({ foundLevel, userData })
                const found = userData.find(i => {
                    console.log(i.level_id, i.section_id, i.completed)
                    return i.level_id === foundLevel.id && i.section_id === foundLevel.section_id && i.completed
                })

                console.log("found:", found)
                setUserCompleted(p => !!found)

                let currSection = sections.find(section => section.id === levelData.section_id)
                let currLevel = levels.find(level => level.id === foundLevel.id)
                const nextLevelPath = () => {
                    if (currLevel.id + 1 < levels.length) {
                        let nextLevel = levels[currLevel.id + 1]
                        let nextSection = sections.find(s => s.id === nextLevel.section_id)
                        return `/level/${nextSection.name}/${nextLevel.level_id}`
                    }
                    return "/"
                }
                setNextLevel(p => nextLevelPath())
            }
        }
    }, [])


    // TODO: if current level page has been completed, render "next level" button here

    return (
        <Navbar color="light" light expand="md">
            <Container fluid>
                <Link className="navbar-brand" to="/">Home</Link>

                <Nav className="mr-auto" navbar>
                    {/* {userCompleted && <NavItem>
                        <Link className="nav-link btn btn-large btn-success" to={nextLevel}>Next Level</Link>
                    </NavItem>} */}
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