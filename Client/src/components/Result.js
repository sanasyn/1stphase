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
            clicked: false,
            notClicked: true,
            study: '',
        }

        this.onStudySelect=this.onStudySelect.bind(this)
    }

    onStudySelect(study) {
        console.log("I'M BEING CLICKED!!! 🤓🤓🤓🤓🤓")
        this.setState({clicked: true, notClicked: false})
        axios.post("/resultDetails", study)
            .then((results) => {
                console.log('STUDY DETAILS: ' + results.data[0])
                this.setState({ study: results.data[0] })
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
            <ResultDetail study={this.state.study}/>
        )

        return (
            <div>
                {this.state.notClicked ? resultTable : null }
                {this.state.clicked ? detailPage : null }
            </div>
        )
    } 
}

export default Result;