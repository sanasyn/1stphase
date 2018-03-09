import React from 'react';
import Background from '../synapse.jpg';
import Latin from '../latin.png';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

export default () => {
	const StyleButton = {
		backgroundColor: "#174886",
  	color: "#fff",
  	fontSize: "2em",
  	margin: "20px 10px",
  	padding: "5px",
  	height: "44px",
	}

    return (
        // <div style={{backgroundImage: `url(${Background})`}}>
        <div>
	        <div className="topStyle">
	        	<img className="synapseImage" src={Background}/>
	        		<div className="containDiv">
		        		<h1 className="healingConn">A Healing Connection</h1>
		        		<p className="startInfo">We connect you to clinical trials for Alzheimer's based on your needs.</p>
		        		<Link to="/quiz">
		        			<FlatButton style={StyleButton}>Get Started
		        			</FlatButton>
		        		</Link>
	        		</div>
	        </div>
	        <div className="underTopOut">
	        	<div className="underTopIn">
	        		<img className="latin" src={Latin}/>
	        	</div>
	        </div>
	        <div className="underTopOut2">
	        	<div className="underTopIn2"></div>
	        </div>
	        <div className="bottomStyle">
	        		<div className="containDiv">
	        		</div>
	        </div>
	    </div>
    )
}