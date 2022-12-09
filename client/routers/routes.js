import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

// Import custom components
import PrivateRoute from './PrivateRoute';
import RestrictRoute from './RestrictRoute';
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';

const AsyncLoginForm = loadable(() => import('../containers/auth/LoginContainer'));
const AsyncSignUpForm = loadable(() => import('../containers/auth/SignUpContainer'));
const AsyncDashboard = loadable(() => import('../containers/dashboard/DashboardContainer'));
const AsyncChangeForm = loadable(() => import('../containers/app/ChangeFormContainer'));
const AsyncAcademicDetails = loadable(() => import('../containers/app/AcademicDetailsContainer'));
const AsyncUserDetails = loadable(() => import('../containers/app/UserDetailsContainer'));
const AsyncStudentList = loadable(() => import('../containers/app/StudentListContainer'));






const Router = () => (
  <Fragment>
    <Switch>
      <RestrictRoute exact path="/" component={AsyncLoginForm} />
      <RestrictRoute exact path="/signup" component={AsyncSignUpForm} />

      <PrivateRoute exact path="/dashboard" layout={MainLayout} component={AsyncDashboard} />
      <PrivateRoute exact path="/changeForm" layout={MainLayout} component={AsyncChangeForm} />
      <PrivateRoute exact path="/academicDetails/:id" layout={MainLayout} component={AsyncAcademicDetails} />
      <PrivateRoute exact path="/userDetails" layout={MainLayout} component={AsyncUserDetails} />
      <PrivateRoute exact path="/studentList" layout={MainLayout} component={AsyncStudentList} />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
