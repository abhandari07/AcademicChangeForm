import React from 'react';
import { Grid } from '@material-ui/core';
import OkcuUpdates from './OkcuUpdates';

const styles = {
logo: {
  }
};


const okcuUpdates = [
  { id: 1, title: 'Latest News', text: 'Esports team wins national collegiate tournament', link: 'https://www.okcu.edu/main/all-news' },
  { id: 2, title: 'Featured Events & 2023 Calendar', text: 'Here are the list of events for new 2023 Spring and your class schedules',link: 'https://www.okcu.edu/main/calendar?calendars=' },
  { id: 3, title: 'Course Materials', text: 'You can find your reading materials for all subjects', link: 'https://ocuonline.okcu.edu/d2l/home' },
  { id: 4, title: 'Student Grades and Financial Info',text:'Student will get their grades details and financial informations',link: 'https://bluelink.okcu.edu:8443/'},
  { id: 5, title: 'OKCU Libaries', text: 'OCU stars can access reading materials from any of the libaries', link: 'https://www.okcu.edu/students/libraries' }
];

const Dashboard = () => {
  return (
    <div>
      <br /><br />

      <Grid container spacing={24} style={{ marginBottom: '15px' }}>
        <Grid item xs>
          <OkcuUpdates data={okcuUpdates} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
