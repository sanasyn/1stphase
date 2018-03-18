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
                    <TableHeaderColumn>Row Number</TableHeaderColumn>
                    <TableHeaderColumn>NCT_ID</TableHeaderColumn>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>City State</TableHeaderColumn>
                    <TableHeaderColumn>Zipcode</TableHeaderColumn>

                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {results.results.map((study, i) => {
                    return (
                        <TableRow key={i}>
                            <TableRowColumn>{i}</TableRowColumn>
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
    );
}