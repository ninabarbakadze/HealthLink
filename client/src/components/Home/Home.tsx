import { FunctionComponent } from "react";
import NavBar from '../NavBar/NavBar';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface HomeProp {
  authorization: boolean
}

 const Home: FunctionComponent<HomeProp> = ({ authorization }) => {

  

  const {user, isDoctor} = useUser();




  if(!authorization){
      return <Redirect to="login"/>;
  }

  const visualizeUserAppointments = () => {
  
  }

  const createNewAppointement =  () => {
    <Redirect to='/new' />
  }

  return (
      <div>
        <NavBar />
            <button>Visualize my Appointments</button>
            { isDoctor ? null : <button onClick={createNewAppointement}>Create a new appointment</button>
            }
      </div>
  )
};

export default Home