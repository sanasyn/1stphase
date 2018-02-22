//display the result
//this will chagne to our result display page
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result() {
    return (
        <table>
            <thead>
                <tr>
                    <th>NCT_ID</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {this.props.quizResult.map(study => (
                    <tr key={study.nct_id}>
                        <td>{study.nct_id}</td>
                        <td>{study.official_title}</td>
                    </tr>
                    ))}
            </tbody>
        </table>
    );
}


export default Result;