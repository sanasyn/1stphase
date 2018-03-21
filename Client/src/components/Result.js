import React, { Component } from 'react';
import ResultDetail from './ResultDetail';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class Result extends Component {
    constructor(props){
        super(props)

        this.state = {
            showResults: true,
            showDetails: false,
            study: '',
            contact: ''
        }

        this.onStudySelect=this.onStudySelect.bind(this)
    }

    onStudySelect(study) {
        console.log("in on Study Select",study);
        this.setState({showDetails: true, showResults: false})
        axios.post("/resultDetails", study)
            .then((results) => {
                this.setState({ 
                    study: results.data.study[0],
                    contact: results.data.contact[0]
                })
            })
    }

    goBack() {
        this.setState({
            showDetails: false,
            showResults:true,
        })
    }

    render(){
        const resultTable = (   
            <Table style={{maxWidth:"90%", margin:"auto"}}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{paddingLeft: '0px'}}>See Details</TableHeaderColumn>
                        <TableHeaderColumn style={{paddingLeft: '0px'}}>NCT_ID</TableHeaderColumn>
                        <TableHeaderColumn style={{paddingLeft: '0px'}}>Title</TableHeaderColumn>
                        <TableHeaderColumn style={{paddingLeft: '0px'}}>City, State</TableHeaderColumn>
                        <TableHeaderColumn style={{paddingLeft: '0px'}}>Zip Codes</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.results.map((study, i) => {
                        return (
                            <TableRow key={i}>
                                <TableRowColumn><FlatButton style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}}  onClick={this.onStudySelect.bind(this, study)}>Details</FlatButton></TableRowColumn>
                                <TableRowColumn>{study.nct_id}</TableRowColumn>
                                <TableRowColumn>{study.official_title}</TableRowColumn>
                                <TableRowColumn>{study.city}, {study.state}</TableRowColumn>
                                <TableRowColumn>{study.zip}</TableRowColumn>
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
            )

        const detailPage = (
            <ResultDetail study={this.state.study} contact={this.state.contact} back={() => this.goBack()}/>
        )

        return (
            <div>
                {this.state.showResults ? resultTable : null }
                {this.state.showDetails ? detailPage : null }
            </div>
        )
    } 
}

export default Result;