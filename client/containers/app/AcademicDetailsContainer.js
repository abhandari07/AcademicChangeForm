import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ACADEMIC } from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';
import { getLocalStorage} from '../../utils/storageUtil';
import { ID, FULL_NAME, LOGIN_EMAIL } from '../../config/config';
import {httpBase} from '../../utils/httpBaseUtil';

// Import custom components
import CompAcademicDetails from '../../components/pages/AcademicDetails';


class AcademicDetails extends Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.state = {
      isFetching: true,
      studentData: [],
    };
  }

  componentDidMount(){
    var student_id = this.props.match.params.id;
    var studentUrl = 'academicinfo/detailsByStudent/' + student_id
    httpBase().post(studentUrl)
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
    return <CompAcademicDetails studentData={studentData} onSubmit={this.submitForm} />;
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


// export default hot(module)(AcademicDetailsForm);
export default connect(mapStateToProps, mapDispatchToProps)(AcademicDetails);


