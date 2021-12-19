import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewRegister = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const [ regUsername, setRegUsername ] = useState('');
  const [ regPassword, setRegPassword ] = useState('');
  const [ regPasswordTwo, setRegPasswordTwo ] = useState('');

  const register = () => {

    if( regPassword === regPasswordTwo){
      axios.post("http://localhost:5000/register" , {
        username: regUsername,
        password: regPassword
      }).then(res => console.log(res))

      document.querySelector(".register-container").style.display = "none";
      document.querySelector(".")

      history.push('/test-route')
    }else{
      alert('Passwords do not match')
    }
     
  }

  const toRegularAccounts = (e) => {
      e.preventDefault()
      history.push('/test-route');
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1> MERN Bug-Tracker</h1>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Account
        </Typography>
        <form className={` ${classes.form} create-form-main `} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Enter Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Enter new Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={(e) => setRegPassword(e.target.value)}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Enter same Password"
            type="password"
            id="password2"
            autoComplete="password"
            onChange={(e) => setRegPasswordTwo(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => register(e)}
          >
            Create Account
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={(e) => toRegularAccounts(e)} href="#" variant="body2">
                Login Page
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default NewRegister;