import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// import registerUser action

const RegisterForm = ({ registerUser }) => {
  let state;
  const initState = () =>
    (state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

  initState();

  const changeHandler = e => {
    const { name, value } = e.target;
    state[name] = value;
  };

  const submitHandler = e => {
    if (e.target.reset) {
      e.preventDefault();
      e.target.reset();
      // registerUser(state);
      // initState();
      console.log(state);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper style={{ margin: '10%', padding: '2%' }}>
          <form onSubmit={submitHandler}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
            >
              <Grid item xs={10} sm={8}>
                <Typography type="display1">Register Admin</Typography>
              </Grid>
              <Grid item xs={10} sm={8}>
                <TextField
                  onChange={changeHandler}
                  name="firstName"
                  label="First Name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={8}>
                <TextField
                  onChange={changeHandler}
                  name="lasttName"
                  label="Last Name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={8}>
                <TextField
                  onChange={changeHandler}
                  name="email"
                  label="Email"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={8}>
                <TextField
                  type="password"
                  onChange={changeHandler}
                  name="password"
                  label="Password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={8}>
                <TextField
                  type="password"
                  onChange={changeHandler}
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={8}>
                <Button
                  type="submit"
                  raised={true}
                  color="primary"
                  onClick={submitHandler}
                  style={{ width: '100%', marginTop: '5%', marginBottom: '5%' }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
