import React, { Component } from 'react';

class ResultDetail extends Component {
  render(){
    return (
      <div>
        <h1>NCT ID: {this.props.study.nct_id}</h1>
        <h1>Study Title: {this.props.study.official_title}</h1>
        <h1>Phase: {this.props.study.phase}</h1>
        <h1>Description: {this.props.study.description}</h1>
      </div>
    )
  }
}

export default ResultDetail;