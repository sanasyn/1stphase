import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { BrowserRouter, Route, Link } from 'react-router-dom';
// import AnswerOption from './components/AnswerOption'

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div>
      <MuiThemeProvider>
        <header style={{marginTop: "0", backgroundColor: "#20759c",minHeight:'255',borderTop: "solid #545454 8px", }}>
          <h1 style={{marginTop: "0", padding: "6px", color: "#fff", fontFamily:"Acme", fontSize: "3.0em", marginBottom:"0px"}}><span style={{fontFamily: "Arial", letterSpacing: "-6px", fontSize: "0.7em", paddingRight: "14px", fontStyle: "italic", color: "#CCC515"}}>S&#423;</span>SanaSyn</h1>
          {/* <img src="./SanaSynTitle.svg" alt="SanaSyn" alt="SanaSyn"/> */}
        </header>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/quiz" component={Main} />
        </div>

        
        
    {/* { this.state.results.length? this.renderResult() :
      this.state.answer.opinion.list.length ? this.renderSubmit() : 
      this.renderQuiz()} */}

        </MuiThemeProvider>
      </div>
      </BrowserRouter>
    );
  }

}

export default App;
