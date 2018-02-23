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
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>NCT_ID</TableHeaderColumn>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {results.results.map((study, i) => {
                    return (
                        <TableRow key={i}>
                            <TableRowColumn>{i}</TableRowColumn>
                            <TableRowColumn>{study.nct_id}</TableRowColumn>
                            <TableRowColumn>{study.official_title}</TableRowColumn>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    );
}