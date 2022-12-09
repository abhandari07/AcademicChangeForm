import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// Import custom components
import renderText from '../common/form/renderText';
import DatePickers from '../common/form/renderDate';
import SignDatePickers from '../common/form/renderSigndate';
import { Checkbox } from "@material-ui/core";
import {getLocalStorage} from '../../utils/storageUtil';
import { ID, FULL_NAME} from '../../config/config';


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
    margin: 'left',
    fontSize: 15,
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  ddl2:{
    marginTop: 32,
    width: '100%',
    padding: 5,
    overflow: 'auto',
    height: 'auto',
    margin: 'auto',
    fontSize: 15,
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  school_heading:{
    fontSize: 20,
    fontWeight:675
  },

  hr:{
    height: '2px'
  },

  Checkbox:{
    fontSize: 15
    
  },
  std_details:{
    padding: '15px',
    backgroundColor: '#99cc33',
    color: 'white',
    font: '24'
  }
};

const ChangeForm = (props) => {
  const { handleSubmit, onSubmit, classes,deans,advisors,studentInfo } = props;
  let academicDetailUrl = '/academicDetails/'+getLocalStorage(ID)
  
  return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="STUDENT ACADEMIC CHANGE FORM" />
        <CardContent>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>


              <Grid container spacing={5}>
                  <Grid item xs={3}>
                    <label class={classes.school_heading}>Student's Name:</label>
                    <p class={classes.school_heading}> {getLocalStorage(FULL_NAME)}</p>
                  </Grid>

                  <Grid item xs={3}>
                    <Field type="text" name="BID" component={renderText} label="Student Identification Number" />
                  </Grid>

                  <Grid item xs={3}>
                    <Field type="date" name="catalogYear" component={DatePickers} />
                  </Grid>

                  <Grid item xs={3}>
                  <Field  name="addOnly" component={Checkbox} />
                  <br />
                  <label class={classes.Checkbox}>Add Only</label> 
                  </Grid>
                  
              </Grid>
              <br />

              <hr/>
              <br />
              <Grid container spacing={1}>

                  <Grid item xs={12}>
                    <p class={classes.school_heading}><u>New Information</u></p>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Field type="Text" name="school_name[0]" component={renderText} label="New School" />
                  </Grid>

                  <Grid item xs={4}>
                    <Field type="Text" name="degree[0]" component={renderText} label="Degree" />
                  </Grid>

                  <Grid item xs={4}>
                  <Field type="Text" name="major[0]" component={renderText} label="Major" />
                  </Grid>

                  <Grid item xs={4}>
                  <Field type="Text" name="minor[0]" component={renderText} label="Minor" />
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Field name="advisor_id[0]" id="advisor_id[0]" class={classes.ddl2} component="select">
                      <option>Select Advisor</option>
                      {advisors.map((item, i) => (
                        <option value={item.id}>{item.first_name} {item.last_name}</option>
                      ))}
                    </Field>
                   {/* <Field type="Text" name="advisor_id[0]" component={renderText} label="Advisor Name" />  */}
                  </Grid>

                  <Grid item xs={4}>
                      <Field name="dean_id[0]" id="dean_id[0]" class={classes.ddl2} component="select">
                          <option>Select Dean</option>
                          {deans.map((item, i) => (
                            <option value={item.id}>{item.first_name} {item.last_name}</option>
                      ))}
                    </Field>
                  </Grid>
              </Grid>
                <br /><br />

                <hr></hr>
                <br />

              <Grid container spacing={1}>

                <Grid item xs={12}>
                <label class={classes.school_heading}><u>Old Information</u></label>
                </Grid>
                
                <Grid item xs={4}>
                  <Field type="Text" name="school_name[1]" component={renderText} label="Previous School" />
                </Grid>

                <Grid item xs={4}>
                  <Field type="Text" name="degree[1]" component={renderText} label="Degree" />
                </Grid>

                <Grid item xs={4}>
                <Field type="Text" name="major[1]" component={renderText} label="Major" />
                </Grid>

                <Grid item xs={4}>
                <Field type="Text" name="minor[1]" component={renderText} label="Minor" />
                </Grid>
                
                <Grid item xs={4}>
                    <Field name="advisor_id[1]" class={classes.ddl2} component="select">
                          <option>Select Advisor</option>
                          {advisors.map((item, i) => (
                            <option value={item.id}>{item.first_name} {item.last_name}</option>
                      ))}
                    </Field>
                </Grid>

                <Grid item xs={4}>
                    <Field name="dean_id[1]" id="dean_id[1]" class={classes.ddl2} component="select">
                          <option>Select Dean</option>
                          {deans.map((item, i) => (
                            <option value={item.id}>{item.first_name} {item.last_name}</option>
                      ))}
                    </Field>
                </Grid>
            </Grid>

            <br /> <br />
            <hr></hr>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <Field type="Text" name="student_signature" component={renderText} label="Student Signature" />
                </Grid>

                <Grid item xs={6}>
                <Field type="date" name="signed_date" component={SignDatePickers}  />
                </Grid>
      
            </Grid>
                              
            <br />
              <div className={classes.btnDiv}>
               {studentInfo == "" ?
                  <Button className={classes.btn} type="submit" variant="contained" color="primary">
                      <span>Add Academic Details</span>
                  </Button>
                    :
                    <span class={classes.std_details}>Details already available. Please go to <a href={academicDetailUrl}>Academic Details Page</a></span> 
                }
              </div>
                
          </form>
        </CardContent>
      </Card>
  );
};


const validateAcademicDetails = (values) => {
  // const errors = {};

  // // const requiredFields = ['school_name[0]', 'degree[0]', 'major[0]', 'minor[0]', 'advisor_id[0]', 'dean_id[0]','school_name[1]', 'degree[1]', 'major[1]', 'minor[1]', 'advisor_id[1]', 'dean_id[1]', 'student_signature', 'signed_date'];

  // const requiredFields = ['BID','catalogYear','addOnly', 'degree', 'major', 'minor', 'advisor_id', 'dean_id','student_signature', 'signed_date'];
  // requiredFields.forEach((field) => {
    
  //   if (!values[field]) 
  //   {
  //     errors[field] = '(The ' + field + ' field is required.)';
  //   }
  // });
  // errors['school_name'] = '(This field is required.)';
  // return errors;
};

ChangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'ChangeForm', // a unique identifier for this form
  validate: validateAcademicDetails, // ←Callback function for client-side validation
})(withStyles(styles)(ChangeForm));
