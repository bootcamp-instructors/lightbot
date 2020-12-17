import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Sections from './Sections'
import Levels from './Levels'
import LevelPage from './LevelPage'
import Home from './Home'
import Navbar from './Navbar'
import Footer from './Footer'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route path="/sections">
              <Sections />
            </Route>
            <Route path="/section/:sectionName">
              <Levels />
            </Route>
            <Route path="/level/:sectionName/:levelID">
              <LevelPage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
