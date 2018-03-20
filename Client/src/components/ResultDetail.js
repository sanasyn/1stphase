import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class ResultDetail extends Component {
  render(){
    return (
      <div className="row detail-container">
        <Card className="col-md-12 detail-topsection">
          <CardTitle className="detail-study-title">{this.props.study.official_title}</CardTitle>
          <CardText className="detail-description" style={{fontSize:'1.2em'}}>{this.props.study.description}</CardText>
        </Card>

        <div className="row detail-midsection">
          <Card div className="col-md-4 detail-phase">
            <CardTitle className="detail-title">Trial Phase</CardTitle>
            <CardText className="detail-study-phase" style={{fontSize: '2.5em'}}>{this.props.study.phase}</CardText>
          </Card>
          <Card className="col-md-4 detail-eligibility">
            <CardTitle className="detail-title">Eligibility Section</CardTitle>
          </Card>
          <Card className="col-md-4 detail-studylink">
            <a target="_blank" href={`https://clinicaltrials.gov/ct2/show/${this.props.study.nct_id}`}>
              Clinical Trials Page for {this.props.study.nct_id}
            </a>
          </Card>
        </div>

        <div className="row detail-endsection">
          <Card className="col-md-6 detail-contact">
            <CardTitle className="detail-title">Contact Information</CardTitle>
            <CardText>
              <CardTitle style={{padding: '0px'}} subtitleStyle={{fontSize: '1.5em'}} subtitle="Facility Contact" />
              <List>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">person</FontIcon> {this.props.contact.facility_contact_name === null ? 'N/A' : this.props.contact.facility_contact_name}</ListItem>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">email</FontIcon> {this.props.contact.facility_contact_email === null ? 'N/A' : this.props.contact.facility_contact_email}</ListItem>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">phone</FontIcon> {this.props.contact.facility_contact_phone === null ? 'N/A' : this.props.contact.facility_contact_phone}</ListItem>
              </List>
            </CardText>
            <CardText>
              <CardTitle style={{padding: '0px'}} subtitleStyle={{fontSize: '1.5em'}} subtitle="Central Contact" />
              <List>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">person</FontIcon> {this.props.contact.central_contact_name === null ? 'N/A' : this.props.contact.central_contact_name}</ListItem>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">email</FontIcon> {this.props.contact.central_contact_email === null ? 'N/A' : this.props.contact.central_contact_email}</ListItem>
                <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">phone</FontIcon> {this.props.contact.central_contact_phone === null ? 'N/A' : this.props.contact.central_contact_phone}</ListItem>
              </List>
            </CardText>
          </Card>
          <Card className="col-md-6 detail-map">
            <CardMedia>
              <iframe
                title={"result-map"}
                width={"600"}
                height={"450"}
                frameBorder={"0"}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.props.study.city},${this.props.study.state},${this.props.study.zip}`}
              >
              </iframe>
          </CardMedia>
          </Card>
        </div>
        
        <div className="row detail-back-row">
          <div className="col-md-3"></div>
          <FlatButton className="col-md-6 detail-back" style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}} onClick={this.props.back}>Back</FlatButton>
        </div>

      </div>
    )
  }
}

export default ResultDetail;