import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import SignIn from './components/signIn/signIn.tsx'
import Home from './components/Home';
import SignUp from './components/SignUp'
import { useUser} from './context/UserContext';
import AppointmentsVisualizor from './components/VisualizeAppointments';
import AppointmentCreator from './components/NewAppointment';
import CallRoom from './components/CallRoom';


const App = () => {

  const {userAuth, Logout, handleLogIn} = useUser();

  return (
    <div className="App">

    <Router>
      <Switch>
        <Route exact path="/login">
          <SignIn handleLogIn={handleLogIn}/>
        </Route>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/new" component={()=><AppointmentCreator authorization={userAuth}/>}/>
        <Route exact path="/check" component={()=><AppointmentsVisualizor authorization={userAuth}/>}/>
        <Route exact path="/call" component={()=><CallRoom />}/>
        <Route exact path="/" component={()=><Home authorization={userAuth}/>}/>
      </Switch>
    </Router>

    </div>
  );
}

export default App;
