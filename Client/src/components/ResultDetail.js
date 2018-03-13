import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class ResultDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      clicked: false,
      notClicked: true
    }

    this.goBack=this.goBack.bind(this)
  }

  //TODO: Get back button to work
  goBack(){
    this.setState({
      clicked: false,
      notClicked: true
    })
  }

  render(){
    return (
      <div>
        <h1>NCT ID: {this.props.study.nct_id}</h1>
        <h1>Study Title: {this.props.study.official_title}</h1>
        <h1>Phase: {this.props.study.phase}</h1>
        <h1>Description: {this.props.study.description}</h1>
        <p>Central Contact
          <li>Name: {this.props.contact.central_contact_name === null ? 'N/A' : this.props.contact.central_contact_name}</li>
          <li>Email: {this.props.contact.central_contact_email === null ? 'N/A' : this.props.contact.central_contact_email}</li>
          <li>Phone: {this.props.contact.central_contact_phone === null ? 'N/A' : this.props.contact.central_contact_phone}</li>
        </p>
        <p>Facility Contact
          <li>Name: {this.props.contact.facility_contact_name === null ? 'N/A' : this.props.contact.facility_contact_name}</li>
          <li>Email: {this.props.contact.facility_contact_email === null ? 'N/A' : this.props.contact.facility_contact_email}</li>
          <li>Phone: {this.props.contact.facility_contact_phone === null ? 'N/A' : this.props.contact.facility_contact_phone}</li>
        </p>

        <FlatButton style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}}  onClick={this.goBack}>Back</FlatButton>
      </div>
    )
  }
}

export default ResultDetail;