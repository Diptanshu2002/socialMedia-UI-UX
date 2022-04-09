import Home from "./pages/home/Home";
import Profile from "./pages/profilePage/Profile";
import Login from './pages/login/Login'
import Register from './pages/register/Register'

import { BrowserRouter , Switch , Route , Link, Redirect } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);
  // console.log(user);

  return (
    <div>
      <BrowserRouter>
        <Switch>

          {/* HOMEPAGE */}
          <Route exact path='/'>
            {user ? <Home/> : <Redirect to="/signup"/>}
          </Route>

          {/* PROFILE ROUTE TAKING USERNAME AS PARAMETER */}
          <Route path='/profile/:username'>
            <Profile/>
          </Route>

          {/* LOGIN  */}
          <Route  path='/login'>
            {user ? <Redirect to='/' /> : <Login/>}
          </Route>

          {/* REGISTER */}
          <Route  path='/signup'>
            {user ? <Redirect to='/' /> : <Register/>}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
