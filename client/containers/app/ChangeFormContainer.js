import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACADEMIC } from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';
import {httpBase} from '../../utils/httpBaseUtil';
import CompChangeForm from '../../components/pages/ChangeForm';
import {getLocalStorage} from '../../utils/storageUtil';
import { ID} from '../../config/config';


class ChangeFormContainer extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      isFetching: true,
      advisors: [],
      deans: [],
      studentInfo: []
    };
  }

  componentDidMount(){
    httpBase().post('users/getAdvisor')
        .then((response) => {
            this.setState({ advisors: response.data.data, isFetching: false })
        })
        .catch((error) => {
            console.log('Error: ',error);
        });
  
    httpBase().post('users/getDean')
        .then((response) => {
            this.setState({ deans: response.data.data, isFetching: false })
        })
        .catch((error) => {
            console.log('Error: ',error);
        });
    
    var url = 'students/'+getLocalStorage(ID)
    httpBase().get(url)
        .then((response) => {
            this.setState({ studentInfo: response.data.data, isFetching: false });
            console.log(response);
        })
        .catch((error) => {
            console.log('Error: ',error);
            this.setState({ studentInfo: '', isFetching: false });
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
    
    if (this.state.isFetching){
      return(<p> Loading...</p>)
    }

    var advisors= this.state.advisors;
    var deans= this.state.deans;
    var studentInfo= this.state.studentInfo;
    
    return <CompChangeForm studentInfo={studentInfo} deans={deans} advisors={advisors} onSubmit={this.submitForm} />;
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


export default connect(mapStateToProps, mapDispatchToProps)(ChangeFormContainer);


