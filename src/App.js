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
      inFolloupQ: false,
      followupQCnt:'',
      answer: '',
      result:''
    }

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    this.handleClickNext=this.handleClickNext.bind(this);


  }

  componentWillMount(){
   // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    
    this.setState({
      question: questionaire[0].question,
      //answerOptions:shuffledAnswerOptions[0]
      answerInputType: questionaire[0].type,
      answerOptions: questionaire[0].options,
      followupQ:questionaire[0].followupQ
    });
  }

  shuffleArray(array){
    var currentIndex = array.length, temporaryValue, randomeIndex;

    //while there is remain elements to shuffle

    while(0 !== currentIndex)
    {
      //pick a remaining element
      randomeIndex = Math.floor(Math.random()* currentIndex);
      currentIndex -= 1;

      //swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomeIndex];
      array[randomeIndex] = temporaryValue;

    }

    return array;
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
      inFolloupQ:false,
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
      inFolloupQ:true,
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
    const counter = this.state.counter;
    this.setUserAnswer(answer);
    console.log("answer: "+ answer)
   
    //console.log("in answer selected function");
    //check if current question has any followup questions when the answer to the current question is yes
    if(answer === 'Yes' && typeof questionaire[counter].followupQ !=='string' && !this.state.inFolloupQ)
    {
      //check # of items in the followupQ array
      console.log("# of followup Qs: "+ questionaire[counter].followupQ.length);

      //in followup question section
      if(this.state.inFolloupQ)
      {
        if(this.state.followupQCnt < questionaire[counter].followupQ.length)
        {
          var followupQCnt= this.state.followupQCnt+1;

          this.setState({
            followupCnt: followupQCnt
          })

          setTimeout(()=>this.setFollowupQuestion(counter,followupQCnt),300);
        }

      }
      else
      {
        //first time in follow up section
        this.setState({
          followupQCnt: 0
        });

        //set up followupQuestion
      setTimeout(()=>this.setFollowupQuestion(counter,this.state.followupQCnt),300);
      }
      

      
    }
    
  }


  //when next button is clicked, set up the next question to be displayed
 handleClickNext(){
    if(this.state.questionId < questionaire.length)
    {
      setTimeout(()=>this.setNextQuestion(),300);
    }
    else{
      setTimeout(()=>this.setResults(this.getResults()),300);
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
