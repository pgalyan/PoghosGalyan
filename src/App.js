import './App.css';
import ToDo from './Components/ToDo/ToDo'
import Navbar from './Components/Navbar/NavBar'
// import Result from './Components/Result'
import Contact from './Components/pages/Contact/Contact'
import About from './Components/pages/About/About'
import { Redirect, Route, Switch } from 'react-router-dom';
import SingleTask from './Components/pages/SingleTask/SingleTask'
import NotFound from './Components/pages/NotFound/NotFound'

const pages = [
  {
    path: "/",
    component: ToDo
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/task/:id",
    component: SingleTask
  },
  {
    path: "/404",
    component: NotFound
  },
]


function App() {
  const pagesRouts = pages.map((item, index) => {
    return (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact />
    )

  })

  return (
    <div className="App">
      <Navbar />
      <Switch>
        {pagesRouts}
        <Redirect to="/404"  />
      </Switch>
    </div>
  );
}

export default App;
