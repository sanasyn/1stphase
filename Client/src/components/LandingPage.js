import React from 'react';
import Background from '../synapse.jpg';
// import Latin from '../latin.png';
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
    			<div className="col-md-6">
	    			<h1 className="healingConn">A Healing Connection</h1>
	 		        <p className="startInfo">We connect you to clinical trials for Alzheimer's based on your needs.</p>
	 		        <Link to="/quiz">
 		        			<FlatButton style={StyleButton}>Get Started
 		        			</FlatButton>
 		        		</Link>
	 		    </div>
    		</div>
    	</div>
// {
//         <div>
// 	        <div className="topStyle">
// 	        	<img className="synapseImage" src={Background}/>
// 	        		<div className="containDiv">
// 		        		<h1 className="healingConn">A Healing Connection</h1>
// 		        		<p className="startInfo">We connect you to clinical trials for Alzheimer's based on your needs.</p>
// 		        		
// 	        		</div>
// 	        </div>
// 	        <div className="underTopOut">
// 	        	<div className="underTopIn">
// 	        		<img className="latin" src={Latin}/>
// 	        	</div>
// 	        </div>
// 	        <div className="underTopOut2">
// 	        	<div className="underTopIn2"></div>
// 	        </div>
// 	        <div className="bottomStyle">
// 	        		<div className="containDiv2">
// 	        			<h1>Why SanaSyn?</h1>
// 	        			<p>Because finding the right clinical trial should be easy.</p>
// 	        			<h1>What do you have to do?</h1>
// 	        			<p>Answer questions we have tailored specifically to show you trials most relevant and closest to your location.</p>
// 	        			<h1>Why is this search engine different?</h1>
// 	        			<p>We won't show you studies that you don't qualify for</p>

// 	        		</div>
// 	        </div>
// 	    </div>
    	// 		<div className="topStyle">
    	// 		<Image circle style={{display:"block", width:"50%"}} src={Background}/>
    	// 		<div>
	    // 			<h1 className="healingConn">A Healing Connection</h1>
	 		 //        		<p className="startInfo">We connect you to clinical trials for Alzheimer's based on your needs.</p>
	 		 //    </div>
    	// 	</div>


// 	}
    )
}