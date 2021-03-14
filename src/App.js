import './App.css';
import ToDo from './Components/ToDo/ToDo'
import Navbar from './Components/Navbar/NavBar'
// import Result from './Components/Result'
import Contact from './Components/pages/Contact/Contact'
import About from './Components/pages/About/About'
import { Redirect, Route , Switch } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/"  exact>
          <ToDo />
        </Route>
        <Route path="/contact" exact >
          <Contact />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
      

    </div>
  );
}

export default App;
