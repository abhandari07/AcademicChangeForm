import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

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
  },

  school_heading:{
    fontSize: 20,
    fontWeight:400,
    fontFamily: "Roboto",
    textTransform: 'capitalize',
  },

  academic_content:{
    fontSize: 18,
    fontWeight:500,
    fontFamily: "Calibri",
    textTransform: 'capitalize',
  },

  email:{
    fontSize: 18,
    fontWeight:500,
    fontFamily: "Calibri"
  },

  hr:{
    height: '2px'
  },
  ddl2: {
    color: 'black',
    padding:5,
    fontSize: 18,
    border: 'none',
    backgroundColor:'white',
    appearance: 'none'
  }
};

const AcademicDetails = (props) => {
  const { classes, studentData } = props;
  console.log(studentData.academicDetail)

  return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="STUDENT ACADEMIC DETAILS" />
        <CardContent>

              <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <p class={classes.school_heading}>Student's Name:</p>
                    <p class={classes.academic_content}>{studentData.first_name} {studentData.last_name}</p>
                  </Grid>

                  <Grid item xs={4}>
                    <p class={classes.school_heading}>Student's Email:</p>
                    <p class={classes.email}>{studentData.email}</p>
                  </Grid>

                  <Grid item xs={4}>
                    <p class={classes.school_heading}>Student Identification Number:</p>
                    <p class={classes.academic_content}>{studentData.BID} </p>
                  </Grid>
                  
              </Grid>

              <hr/>
              <br />
              {console.log(studentData.academicDetail)}
              {studentData.academicDetail ?
               studentData.academicDetail.map((item, i) => (
                 <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <p class={classes.school_heading}><u>{item.old_new_flag} Academic Details</u></p>
                      </Grid>
                      <Grid item xs={3}>
                        <p class={classes.school_heading}>School Name</p>
                        <p class={classes.academic_content}>{item.school_name}</p>
                      </Grid>

                      <Grid item xs={3}>
                        <p class={classes.school_heading}>Degree</p>
                        <p class={classes.academic_content}> {item.degree}</p>
                      </Grid>

                      <Grid item xs={3}>
                        <p class={classes.school_heading}>Major</p>
                        <p class={classes.academic_content}>{item.major} </p>
                      </Grid>

                      <Grid item xs={3}>
                        <p class={classes.school_heading}>Minor</p>
                        <p class={classes.academic_content}>{item.minor} </p>
                      </Grid>
                      
                      <Grid item xs={3}>
                        <p class={classes.school_heading}>Advisor</p>
                        <p class={classes.academic_content}>{item.advisor_name} </p>
                      </Grid>

                      { item.is_advisor_approved == 1 ?
                         <Grid item xs={3}>
                          <p class={classes.school_heading}>Signature</p>
                          <p class={classes.academic_content}>{item.advisor_name}</p>
                        </Grid>
                        :
                        <Grid item xs={3}>
                          <p class={classes.school_heading}> Status</p>
                          <p class={classes.academic_content}>Unapproved</p>
                        </Grid>
                      }

                    <Grid item xs={3}>
                        <p class={classes.school_heading}>Dean</p>
                        <p class={classes.academic_content}>{item.dean_name} </p>
                      </Grid>

                      { item.is_dean_approved == 1 ?
                         <Grid item xs={3}>
                          <p class={classes.school_heading}>Signature</p>
                          <p class={classes.academic_content}>{item.dean_name} {item.last_name} </p>
                        </Grid>
                        :
                        <Grid item xs={3}>
                          <p class={classes.school_heading}> Status</p>
                          <p class={classes.academic_content}>Unapproved</p>
                        </Grid>
                      }

                      <Grid item xs={12}>
                        <br />
                        <hr></hr>
                      </Grid>
                 </Grid>
                
              ))
            
              :"No Records Found!!"

              }

        </CardContent>
      </Card>
  );
};

AcademicDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'AcademicDetails', // a unique identifier for this form
})(withStyles(styles)(AcademicDetails));
