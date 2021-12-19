import { React, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { finalLogin } from '../../actions'
import Register from './Register';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        MERN-Bug-Tracker
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  test_account: {
    margin: theme.spacing(1, .2, 0),
    height: '4em',

  }
}));

const NewLogin = () => {
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const buttonClick = (e, name) => {
      setLogin(name)
      setPassword("PassWord1")
  }

  const formSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/login", {
          username: login,
          password: password
      }).then(res => {
          if(res.data.loggedIn === false){
              alert('wrong username/password')
          }else{
              dispatch(finalLogin(res.data))
              history.push("/dashboard")
          }
      })          
  }

  const createAccount = (e) => {
      e.preventDefault()
      history.push('/create-account')
  }

  const toTestAccount = () => {
      document.querySelector(".test-login-container").style.display = "block";
      document.querySelector(".login-form-main").style.display = "none";
  }

  const toRegularLogin = () => {
      document.querySelector(".test-login-container").style.display = "none";
      document.querySelector(".login-form-main").style.display = "block";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component='h1'>MERN Bug-Tracker</Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className="test-login-container">
            <Grid container
            spacing={2}
            justifyContent="space-around"
            alignItems = "center"
            >
              <Grid item xs={6}>
                <Button
                  className={classes.test_account}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={(e) => buttonClick(e, 'Admin')}
                  >
                    Admin
                  </Button>
              </Grid>
                <Grid item xs={6}>
                  <Button
                  className={classes.test_account}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={(e) => buttonClick(e, 'Developer')}
                  >
                    Developer
                  </Button>
                </Grid>
                <Grid item xs ={6}>
                  <Button
                  className={classes.test_account}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={(e) => buttonClick(e, 'Project Manager')}
                  >
                    Project Manager
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                  className={classes.test_account}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={(e) => buttonClick(e, 'Team Member')}
                  >
                    Team Member
                  </Button>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => formSubmit(e)}
              >
                Sign In
              </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => toRegularLogin()} href="#" variant="body2">
                  Regular Login
                </Link>
              </Grid>
            </Grid>
            </Grid>
          </div>
        <form className={` ${classes.form} login-form-main `} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => formSubmit(e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={() => toTestAccount()} href="#" variant="body2">
                Test Accounts
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2"
              onClick={(e) => createAccount(e)}>
                {"Don't have an account? Sign Up"}
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

export default NewLogin;