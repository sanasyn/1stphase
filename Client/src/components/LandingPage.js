import React from 'react';
import Background from '../synapse.jpg';
import Latin from '../latin.png';
import FlatButton from 'material-ui/FlatButton';
import { Image } from 'react-bootstrap';
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
    	<div>
    		<div className="topStyle row">
    			<Image className="col-md-6" circle src={Background}/>
    			<div className="col-md-4 col-md-offset-1 info" >
	    			<h1 className="healingConn">A Healing Connection</h1>
	 		        <p className="startInfo">We connect you to clinical trials for Alzheimer's Disease based on your needs.</p>
	 		        <Link to="/quiz">
 		        			<FlatButton style={StyleButton}>Get Started
 		        			</FlatButton>
 		        		</Link>
	 		    </div>
    		</div>
        <div className="latin">
          < Image className="col-md-offset-3 col-md-6 latinImage" src={Latin}/>
        </div>
        <div className="stepContainer col-md-offset-3 col-md-6">
          <div className="step">
            <h2 className="stepNumber">1</h2>
            <p className="stepDesc">Click Get Started in order to begin a short questionaire.</p>
          </div>
          <div className="step">
            <h2 className="stepNumber">2</h2>
            <p className="stepDesc">We will return a list of studies that fit your needs in a location close to you.</p>
          </div>
          <div className="step">
            <h2 className="stepNumber">3</h2>
            <p className="stepDesc">Click on a study to learn more about it and receive contact information for the facility.</p>
          </div>
        </div>
    	</div>

    )
}