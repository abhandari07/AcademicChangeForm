import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Wallpaper from '@material-ui/icons/Wallpaper';

const styles = () => ({
  root: {
    paddingTop: 0,
  },
  subheader: {
    fontSize: 24,
    backgroundColor: cyan[600],
    color: '#FFFFFF',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  a: {
    color: 'black'
  }
});

const OkcuUpdates = (props) => {
  const okcuUpdates = props.data;

  return (
    <Card>
      <CardHeader title="OKCU Latest Updates" />
      <Divider />
      <CardContent>
        <List>
          {okcuUpdates.map((item, i) => (
            <a onClick={(event) => {event.preventDefault(); window.open(item.link);}} style={{color: 'black','textDecoration': 'none','cursor':'pointer' }}>
              <ListItem divider={i < okcuUpdates.length - 1} key={item.id}>
                <ListItemIcon>
                  <Avatar>
                    <Wallpaper />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.text} />
              </ListItem>
            </a>
          ))}
        </List>
      </CardContent>
      <Divider />
    
    </Card>
  );
};

OkcuUpdates.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
};

export default withStyles(styles)(OkcuUpdates);
