import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';

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
  
    hr:{
      height: '2px'
    },
  };

  
  const UserDetails = (props) => {
    const {classes,studentData } = props;

    return (
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="USER LIST" />
          <CardContent>
          <hr/>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">First Name</TableCell>
                          <TableCell align="left">Last Name</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">User Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {studentData.map((row, index) => (
                            <TableRow>
                              <TableCell align="left">{row.first_name}</TableCell>
                              <TableCell align="left">{row.last_name}</TableCell>
                              <TableCell align="left">{row.email}</TableCell>
                              <TableCell align="left">{row.user_type}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                <br />
                <hr/>
  
          </CardContent>
        </Card>
    );
  };
  

  
  UserDetails.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  
  export default reduxForm({
    newtable: 'UserDetails'
  })(withStyles(styles)(UserDetails));






  
