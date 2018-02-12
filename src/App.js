import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import questionaire from './api/questionaire';
// import update from 'react-addons-update';
import Result from './components/Result';
// import AnswerOption from './components/AnswerOption'

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      counter:0,
      questionId: 1,
      question: '',
      answerInputType:'',
      answerOptions: [],
      followupQ:'',
      folloupQFlag: false,
      followupQCnt:'',
      answer: '',
      result:''
    }

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    this.handleClickNext=this.handleClickNext.bind(this);


  }

  componentWillMount(){
    
    this.setState({
      question: questionaire[0].question,
      answerInputType: questionaire[0].type,
      answerOptions: questionaire[0].options,
      followupQ:questionaire[0].followupQ
    });
  }

  setUserAnswer(answer){
    //update function is React's immutability helpers
    //since the state is immutable, this helper function allows me to update the existing andwer count with a new vlaue.
    // const updateAnswersCount = update(this.state.answersCount,{
    //   [answer]: {$apply: (currentValue) => currentValue +1}
    // });
    //console.log("in set user answer function");
    //update the state with the answer value and answer counts.
    this.setState({
      //answersCount: updateAnswersCount,
      answer:answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter+1;
    const questionId = this.state.questionId +1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: questionaire[counter].question,
      answerInputType:questionaire[counter].type,
      answerOptions: questionaire[counter].options,
      followupQ:questionaire[counter].followupQ,
      followupQFlag:false,
      followupQCnt:'',
      answer: ''
    });
  }

  setFollowupQuestion(counter,followCnt){
    //display follow questions
    this.setState({
      counter: counter,
      questionId: this.state.questionId,
      question: questionaire[counter].followupQ[followCnt].question,
      answerInputType:questionaire[counter].followupQ[followCnt].type,
      answerOptions: questionaire[counter].followupQ[followCnt].options,
      followupQFlag:true,
      answer:''
    });
  }

  //This function calculates which answer type (Sony, Microsoft or Nintendo in our case) has the highest number
  getResults(){
    const answersCount = this.state.answersCount;
    //utilising Object.keys to return an array of strings that represent all the properties of an object
    //this will return array with the answer strings
    const answerCountKeys= Object.keys(answersCount);
    const answerCountValues = answerCountKeys.map((key)=>answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answerCountValues);

    return answerCountKeys.filter((key)=> answersCount[key] === maxAnswerCount);
  }

setResults(result){
  if(result.length ===1){
    this.setState({result: result[0]});
  }
  else {
    this.setState({result:'Undetermined'});
  }
}

  //this function will set the answer for the current question and check for any follwo up question and display follow up questions.
  handleAnswerSelected(event){
    var answer = event.currentTarget.value;
    //const counter = this.state.counter;
    this.setUserAnswer(answer);
    //console.log("answer: "+ answer)
    
  }

  //when next button is clicked, set up the next question to be displayed
 handleClickNext(){
   //counter for current question
    const counter = this.state.counter;

    //check if the current question a follow up question
    if(this.state.followupQFlag)
    {
      //current question is a follow up question
      //checking if this is the last follow up qeustion
      if(this.followCnt < questionaire[counter].followupQ.length-1)
      {
        //current question is not the last followup question
         //set up follow up question to display
       var followupQCnt= this.state.followupQCnt+1;

       this.setState({
        followupQCnt: followupQCnt
       })

       setTimeout(()=>this.setFollowupQuestion(counter,followupQCnt),300);

      }
      else
      {
        //current question is the last follow up question so set up the next question
        setTimeout(()=>this.setNextQuestion(),300);
      }

      

    }
    else
    {
      //current question is not a follow up question
      //
      if (this.state.answer === 'Yes' && typeof questionaire[counter].followupQ !=='string')
      {
        //this current question's answer is yes and current question has follow up questions
         if(typeof this.state.followupQCnt === 'string')
        {
          //first time in follow up question
          //set the follow question's counter to 0
          this.setState({
            followupQCnt: 0
          });

          
           //set up followupQuestion
        setTimeout(()=>this.setFollowupQuestion(counter,0),300);

        }


      }
      else{
        //set up next question as normal
        if(this.state.questionId < questionaire.length)
        {
          setTimeout(()=>this.setNextQuestion(),300);
        }
        else{
          //reach to end of the question, send the answer back and diplay result
          //setTimeout(()=>this.setResults(this.getResults()),300);
          console.log("action: send the input to matching and display results")
        }

      }



    }

  }

  renderQuiz(){
    return (
      <Quiz
        answer={this.state.answer}
        answerInputType={this.state.answerInputType}
        answerOptions ={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={questionaire.length}
        onAnswerSelected ={this.handleAnswerSelected}
        onClickNext={this.handleClickNext}/>
    );
  }

  renderResult(){
    return (
      <Result quizResult={this.state.result}/>
    );
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Quiz React Practice</h1>
        </header>
        
    {this.state.result ? this.renderResult():this.renderQuiz()}
        
      </div>
    );
  }
}

export default App;
