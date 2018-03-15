import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class ResultDetail extends Component {
  render(){
    return (
      <div className="row detail-container">
        <div className="col-md-12 detail-title">
          {this.props.study.official_title}
        </div>
        
        <div className="col-md-12 detail-description">
          <h4>Brief Summary</h4>
          <p>{this.props.study.description}</p>
        </div>

        <div className="row detail-midsection">
          <div className="col-md-4 detail-phase">
            {this.props.study.phase}
          </div>
          <div className="col-md-4 detail-eligibility">
            <h5>Eligibility Section</h5>
          </div>
          <div className="col-md-4 detail-studylink">
            <a target="_blank" href={`https://clinicaltrials.gov/ct2/show/${this.props.study.nct_id}`}>
              Clinical Trials Page for {this.props.study.nct_id}
            </a>
          </div>
        </div>

        <div className="row detail-endsection">
          <div className="col-md-5 detail-contact">Contact Section
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
          </div>
          <div className="col-md-5 detail-map">Map Section</div>
        </div>
        
        <FlatButton style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}}  onClick={this.props.back}>Back</FlatButton>
      </div>
    )
  }
}

export default ResultDetail;