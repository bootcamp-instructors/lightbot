import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import Sections from './Sections'
import Levels from './Levels'
import Game from './Game'
import Home from './Home'
import Navbar from './Navbar'
import Footer from './Footer'
import Success from './Success'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container fluid>
          <Switch>
            <Route path="/sections">
              <Sections />
            </Route>
            <Route path="/section/:sectionName">
              <Levels />
            </Route>
            <Route path="/level/:sectionName/:levelID">
              <Game />
            </Route>
            <Route path="/success">
              <Success />
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
