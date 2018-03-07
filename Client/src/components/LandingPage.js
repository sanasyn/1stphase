import React from 'react';
import Background from '../synapse.jpg';
import FlatButton from 'material-ui/FlatButton';

// import PropTypes from 'prop-types';
// import ReactCSSTableRowansitionGroup from 'react-addons-css-TableRowansition-group';

export default () => {
    return (
        // <div style={{backgroundImage: `url(${Background})`}}>
        <div>
	        <div style={{ background: "#060d16",padding:"0px", textAlign:"center", borderBottomLeftRadius:"100px", position:"relative"}}>
	        	<img src={Background} style={{width:"50%", display:"block", borderBottomLeftRadius:"100px"}}/>
	        		<div style={{position:"absolute", top:"25px", right:"26px",maxWidth:"42%"}}>
		        		<h1 style={{color:"white"}}>A Healing Connection</h1>
		        		<p style={{color:"white", fontSize:"23px",}}>We connect you to clinical trials for Alzheimer's based on your needs.</p>
		        		<FlatButton style={{backgroundColor: "#174886",fontSize:"2em", hoverColor: "#b63d34", marginTop:"20px", margin:"10px", color:'#fff', padding:"5px", height:"44px"}}>Get Started</FlatButton>
	        		</div>
	        </div>
	        <div style={{ background: "#060d16", height:"100px"}}>
	        	<div style={{ background: "#d4d2d2",height:"100px", borderTopRightRadius:"100px"}}>
	        	</div>
	        </div>
	    </div>
    )
}