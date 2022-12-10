import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';
import renderText from '../common/form/renderText';

const styles = {
  root: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  card: {
    padding: 20,
    overflow: 'auto',
  },
  cardHeader: {
    textAlign: 'center',
  },
  btnDiv: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 21,
  },
  ddl:{
    minWidth: 320,
    maxWidth: 400,
    padding: 5,
    overflow: 'auto',
    height: 'auto',
    margin: 'auto',
    fontSize: 15,
    fontFamily: "Roboto",
    fontWeight: 400,
  }
};

const SignUpForm = (props) => {
  const { handleSubmit, onSubmit, classes, errorMessage} = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Sign Up" />
        {errorMessage && (
          <CustomizedSnackbar variant="error" className={classes.margin} message={errorMessage} />
        )}
        <CardContent>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="first_name" component={renderText} label="First Name" />
            <br />
            <Field type="text" name="last_name" component={renderText} label="Last Name" />
            <br />
            <Field type="text" name="email" component={renderText} label="Email" />
            <br />
            <Field type="password" name="password" component={renderText} label="Password" />
            <br />  <br />

            <label class={classes.ddl}>User Type </label>

            <Field name="user_type" id="user_type" class={classes.ddl} component="select">
            <option>Select User Type</option>
              <option value="student">Student</option>
              <option value="advisor">Advisor</option>
              <option value="dean">Dean</option>
            </Field>
            

            <br />
            <div className={classes.btnDiv}>
              <Button className={classes.btn} type="submit" variant="contained" color="primary">
                Create New Account
              </Button>
              <p>
                Already have an account? <a href='/'>Login</a>.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const validateSignUp = (values) => {
  const errors = {};

  const requiredFields = ['first_name', 'last_name', 'email', 'password','user_type'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });


  if (values['user_type'] == "") {
    errors['user_type'] = '(The ' + field + ' field is required.)';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/i.test(values.password)) {
    errors.password = '(Password must be 8 character long with Capital and Numeric Value.)';
  }
  return errors;
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate: validateSignUp, // ←Callback function for client-side validation
})(withStyles(styles)(SignUpForm));
