import React from 'react';
import Background from '../synapse.jpg';

// import PropTypes from 'prop-types';
// import ReactCSSTableRowansitionGroup from 'react-addons-css-TableRowansition-group';

export default () => {
    return (
        // <div style={{backgroundImage: `url(${Background})`}}>
        <div>
        <img src={Background} style={{width:"100%"}}/>
        </div>
    )
}