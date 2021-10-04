import React from "react";
import { Button, Container } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { Box } from "@mui/system";
import {useHistory} from 'react-router-dom';
import NavBar from './NavBar/NavBar';

const Home = ({authorization}) => {

    let history = useHistory();

    const {user, isDoctor} = useUser();




    if(!authorization){
        return <Redirect to="login"/>;
    }

    const visualizeUserAppointments = () => {

    }

    //lint tag in a click handler
    const createNewAppointement =  () => {
      history.push("/new");
    }

    return (
        <div>
          <NavBar />

          <Container component="main" maxWidth="md">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >

              <Button variant="contained">Visualize my Appointments</Button>
              { isDoctor ? null : <Button variant="contained" onClick={createNewAppointement}>Create a new appointment</Button>
              }

            </Box>
        </Container>
        </div>
    )
}

export default Home;
