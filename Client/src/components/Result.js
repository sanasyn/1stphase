import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// import PropTypes from 'prop-types';
// import ReactCSSTableRowansitionGroup from 'react-addons-css-TableRowansition-group';

export default (results, stateCheck) => {
    return (
        <Table>
            <TableHeader displaySelectAll={false}>
                <TableRow>

                    <TableHeaderColumn style={{paddingLeft: '0px'}}>NCT_ID</TableHeaderColumn>
                    <TableHeaderColumn style={{paddingLeft: '0px'}}>Title</TableHeaderColumn>
                    <TableHeaderColumn style={{paddingLeft: '0px'}}>City, State</TableHeaderColumn>
                    <TableHeaderColumn style={{paddingLeft: '0px'}}>Zip Codes</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {results.results.map((study, i) => {
                    return (
                        <TableRow key={i}>
                            <TableRowColumn>{study.nct_id}</TableRowColumn>
                            <TableRowColumn>{study.official_title}</TableRowColumn>
                            <TableRowColumn>{study.city},{study.state}</TableRowColumn>
                            <TableRowColumn>{study.zip}</TableRowColumn>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    );
}