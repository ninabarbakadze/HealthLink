import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom'
import { useUser } from '../context/UserContext';

//break out into it's own componenet
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Health Link
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


//not needed part of materialize
const theme = createTheme();

export default function SignInSide() {
  //refactor since this is not indirectly triggered and allow for easier testing
  let history = useHistory();

  //remove unused variables, 
  const {setPassword,setUserEmail,setUserAuth, Login, user,getAllDoctors} = useUser();

  const handleRegister = () => {
      //refactor since this is not indirectly triggered and allow for easier testing
    history.push("/register");
  }

   //make email and userpassword use a single setter
  const handleUserEmail = (event) => {
    setUserEmail(event.target.value)
  }

  const handleUserPass = (event) => {
    setPassword(event.target.value);
  }
  //pull out of compoenent to make for easier testing. Remove unused variables

  //create a login service and remove login from context
  //login service takes email and password
  //state or context remains responsible for holding email and password
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let validLogin = await Login();
    if(validLogin){
      setUserAuth(true);
    }
    history.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/resources/logo.png)',
            backgroundColor: '#1BD7DB',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* replace with form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={handleUserEmail}
                // data-testid='email-input'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{'data-testid':'email-input'}}
              />
              {/* replace with input */}
              <TextField
                onChange={handleUserPass}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{'data-testid':'password'}}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link variant="body2" onClick={handleRegister}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}