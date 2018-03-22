import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

class ResultDetail extends Component {
  state = {
    elg_info_open: false,
    tab_value:'include'
  };

  handleToggle = () => {
    const currStat=this.state.elg_info_open;
    this.setState({elg_info_open: !currStat});
  };
  handleTabChange = (value) => {
    this.setState({
      tab_value: value,
    });
  };

  render(){
    var inclusion = this.props.study.criteria_inc;
    var exclusion = this.props.study.criteria_ex;
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleToggle}
      />
    ];
    const reactStringReplace = require('react-string-replace');

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
            <div>
              <RaisedButton label="Eligibility Info" onClick={this.handleToggle} />
              <Dialog
                title="Eligibility Information"
                actions={actions}
                modal={true}
                open={this.state.elg_info_open}
                autoScrollBodyContent={true}
                contentStyle={{height:'70%'}}
              >
                <Tabs
                  value={this.state.tab_value}
                  onChange={this.handleTabChange}
                >
                  <Tab label="Inclusion Criteria" value="include">
                    <div>
                      <p>
                       {this.props.study.criteria_inc}
                      </p>
                    </div>
                  </Tab>
                  <Tab label="Exclusion Criteria" value="exclusion">
                    <div>
                      <p>
                      {this.props.study.criteria_ex}
                      </p>
                    </div>
                  </Tab>
                </Tabs>

              </Dialog>
            </div>
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
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.props.contact.facility_name},${this.props.study.zip}`}
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