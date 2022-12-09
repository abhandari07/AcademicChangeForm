import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACADEMIC } from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';
import {httpBase} from '../../utils/httpBaseUtil';
import CompUserDetails from '../../components/pages/UserDetails';

class UserDetails extends Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.state = {
      isFetching: true,
      studentData: []
    };
  }

  componentDidMount(){
    var studentUrl = 'users'
    httpBase().get(studentUrl)
        .then((response) => {
            this.setState({ studentData: response.data.data, isFetching: false })
        })
        .catch((error) => {
            console.log('Error: ',error);
        });
  }

    /**
   * Submit the form.
   *
   * @param {object} formProps
   */
     submitForm(formProps) {
      this.props.actions.submitForm(ACADEMIC, formProps);
    }

  render() {
    var studentData= this.state.studentData;

    return <CompUserDetails studentData={studentData} onSubmit={this.submitForm} />;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, crudAction), dispatch),
});


// export default hot(module)(UserDetails);
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);


