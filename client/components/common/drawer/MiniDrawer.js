import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import {getLocalStorage} from '../../../utils/storageUtil';
import { ID, FULL_NAME, LOGIN_EMAIL, USER_TYPE } from '../../../config/config';


const drawerWidth = 250;

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
    height: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
    },
  },
  avatar: {
    margin: 10,
    fontWeight:'bold',
    marginLeft:'20px'
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  logo:{
    width:200,
    height:50
  }
});

const MiniDrawer = (props) => {
  let { navDrawerOpen, classes } = props;
  let studentId = getLocalStorage(ID)
  let academicDetailsUrl = '/academicDetails/'+ studentId

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
      }}
      open={navDrawerOpen}
    >
      <div className={classes.drawerHeader} >
         <img src="img/okcu.png" className={classes.logo} alt="" align="middle"/>
      </div>

      <Divider />

      <div className={classes.root}>
        <Avatar
          component="p"
          alt="User"
          src="/img/avatar5.png"
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <Typography component="p" className={classes.avatar}>
          {getLocalStorage(LOGIN_EMAIL)}
        </Typography>
        <Typography component="p" className={classes.avatar}>
          {getLocalStorage(FULL_NAME)}
        </Typography>
      </div>
      <div className="box" style={{ background: '#eee', padding: '8px 16px' }}>
        MAIN NAVIGATION
      </div>

      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <a href="/dashboard"><ListItemText primary="Dashbaord"  /></a>
        </ListItem>
        <Divider />

        {getLocalStorage(USER_TYPE) == "student" ? 
         [ 
            <ListItem button  key={0}>
              <ListItemIcon  key={1}>
                <GroupIcon  key={0} />
              </ListItemIcon>
              <a  key={0} href={academicDetailsUrl} ><ListItemText primary="Academic Detail"  /></a>
            </ListItem>,
            <Divider  key={0} /> 
          ] 
          :
          ""
        }

         {getLocalStorage(USER_TYPE) == "student"  ? 
         [ 
            <ListItem button  key={0}>
              <ListItemIcon  key={1}>
                <GroupIcon  key={0} />
              </ListItemIcon>
              <a  key={0} href="/changeForm"><ListItemText primary="Change Form"  /></a>
            </ListItem>,
            <Divider  key={0} /> 
          ] 
          :
          ""
        }
      
        {getLocalStorage(USER_TYPE) == "advisor" || getLocalStorage(USER_TYPE) == "dean"  ? 
         [ 
            <ListItem button  key={0}>
              <ListItemIcon  key={1}>
                <GroupIcon  key={0} />
              </ListItemIcon>
              <a  key={0} href="/studentList"><ListItemText primary="Student List"  /></a>
            </ListItem>,
            <Divider  key={0} /> 
          ] 
          :
          ""
        }

        {getLocalStorage(USER_TYPE) == "admin"  ? 
          [ 
              <ListItem button  key={0}>
                <ListItemIcon  key={1}>
                  <GroupIcon  key={0} />
                </ListItemIcon>
                <a  key={0} href="/userDetails"><ListItemText primary="User List"  /></a>
              </ListItem>,
              <Divider  key={0} /> 
            ] 
          :
          ""
        }

        <Divider />
      </List>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
};


export default withStyles(styles)(MiniDrawer);
