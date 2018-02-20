import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import questionaire from './api/questionaire';
 import update from 'react-addons-update';
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
      followupQFlag: false,
      followupQCnt:'',
      currAnswer:'',
      answer:{
        zipcode:"",
        age: "",
        sex: "",
        geneticTesting: "no",
        mri: "no",
        pet: "no",
        spinalTap: "no",
        memoryEval: {
          taken: false,
          MMSE: "",
          MoCA: "",
          CDR: ""
        },
        prescriptionDuration: 0,
        medications: [],
        primaryCare:"no"
      },
      result:''
    }

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    this.handleClickNext=this.handleClickNext.bind(this);

    this.handleTextChange=this.handleTextChange.bind(this);


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
      currAnswer: ''
    });
  }

  setFollowupQuestion(counter,followupQCnt){
    //display follow questions
    this.setState({
      counter: counter,
      questionId: this.state.questionId,
      question: questionaire[counter].followupQ[followupQCnt].question,
      answerInputType:questionaire[counter].followupQ[followupQCnt].type,
      answerOptions: questionaire[counter].followupQ[followupQCnt].options,
      followupQFlag:true,
      currAnswer:''
    });
  }


  //this function will set the answer for the current question and check for any follwo up question and display follow up questions.
  handleAnswerSelected(event){
    //this.setUserAnswer(answer);
    var answer=this.state.currAnswer;
    
    
      if(this.state.counter === 6 && this.state.followupQCnt === 0 )
      {
        if((answer=== "amyloidBeta_1" && event.currentTarget.checked && event.currentTarget.value === "P-Tau") || (answer === "pTau_1" && event.currentTarget.checked && event.currentTarget.value === "Amyloid Beta"))
        {
          answer = "both";
        }else if(event.currentTarget.checked && event.currentTarget.value === "Amyloid Beta")
        {
          answer = "amyloidBeta_1";
        }else if(event.currentTarget.checked && event.currentTarget.value === "P-Tau" )
        {
          answer = "pTau_1";
        }else if(this.state.currAnswer==="both" && event.currentTarget.value === "Amyloid Beta")
        {
          answer = "pTau_1";
        }else if(this.state.currAnswer==="both" && event.currentTarget.value === "P-Tau")
        {
          answer = "amyloidBeta_1";
        }

      }else if(this.state.counter === 8 && this.state.followupQCnt ===1)
      {
        if(event.currentTarget.checked && !answer)
        {
          //grab the first element
          answer=[event.currentTarget.value];
        }
        else if(event.currentTarget.checked && answer.indexOf(event.currentTarget.value) <= -1)
        {
          //when answer has 1+ elements, check if current checked element are already in the array to be stored.
          answer.push(event.currentTarget.value);
        }else{
          //console.log("event.currentTarget.checked: "+ event.currentTarget.checked);
          
          //console.log("answer before splice: ", answer);
          var tempCheckedValue=event.currentTarget.value;
          answer.splice(answer.indexOf(tempCheckedValue),1);
          //console.log("answer after splice: ", answer);
        }

      }else
      {
        answer=event.currentTarget.value;
      }
    
    this.setState({
      //answersCount: updateAnswersCount,
      currAnswer:answer
    });
    
  }

  handleTextChange(event){
    var answer= this.state.currAnswer;
    
    if (this.state.counter === 7)
    {
      //console.log("event.currentTarget.value: "+ event.currentTarget.value);
      //console.log("event.currentTarget.name: "+ event.currentTarget.name);
      //when we are in question#8 memory testing
      if(typeof answer === "string")
      {
        //initialize the answer variable into object to store multiple text input from the memory testing question
        answer={
          MMSE:"",
          MoCA:"",
          CDR:""
        }
      }
      else
      {
        answer[event.currentTarget.name] = event.currentTarget.value;
      }

      // if(event.currentTarget.name === "MMSE")
      // {
      //   answer.MMSE=event.currentTarget.value;
      // }

     // console.log("in question#8, answer: ", answer);

    }
    else{
      answer=event.currentTarget.value;
    }

    
    this.setState({
      currAnswer: answer
    });
    
  }

  //when next button is clicked, set up the next question to be displayed
 handleClickNext(){
   //counter for current question
    const counter = this.state.counter;
    var updateAnswer=this.state.answer;

    //
    //put the currAnswer value into the answer object
    //
    switch(counter)
    {
      case 0:
        //for question 1 zipcode
        updateAnswer = update(this.state.answer,{zipcode:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });

        break;

      case 1:
        //for question 2 age
         updateAnswer = update(this.state.answer,{age:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 2:
        //for question 3 sex
         updateAnswer = update(this.state.answer,{sex:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;
      
      case 3:
        //for question 4 genetic testing
        if(this.state.followupQCnt ===0 && this.state.currAnswer==='Yes')
        { 
          updateAnswer = update(this.state.answer,{geneticTesting:{$set:"apoE4_1"}});
        }
        else
        {
          updateAnswer = update(this.state.answer,{geneticTesting:{$set:"no"}});
        }
        this.setState({
          answer:updateAnswer
        });
        break;
      
      case 4:
        //for question 5 MRI
        updateAnswer = update(this.state.answer,{mri:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
      
      break;
      
      case 5:
        //for question 6 PET Scan
        if(this.state.followupQCnt ===0 && this.state.currAnswer==='Yes')
        { 
          updateAnswer = update(this.state.answer,{pet:{$set:"amyloidBeta_1"}});
        }
        else
        {
          updateAnswer = update(this.state.answer,{pet:{$set:"no"}});
        }
        this.setState({
          answer:updateAnswer
        });
      break;

      case 6:
        //for question 7 spinal tap 
        updateAnswer = update(this.state.answer,{spinalTap:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });

      break;

      case 7:
        //for question 8 memory testing
        if(this.state.followupQFlag)
        {
          console.log("currAnswer: "+ this.state.currAnswer);
          //in followup question
          updateAnswer = update(this.state.answer,{memoryEval: {$merge:this.state.currAnswer}});
          console.log("updateAnswer: ", updateAnswer);
          
        }
        else{
          //in regular question
          updateAnswer = update(this.state.answer,{memoryEval: {taken:{$set:true}}});

        }
        this.setState({
          answer:updateAnswer
        });
      break;

      case 8:
        //for question 9 medication 
        if(this.state.followupQCnt === 0)
        { 
          
          updateAnswer = update(this.state.answer,{prescriptionDuration:{$set:this.state.currAnswer}});
        }
        
        if(this.state.followupQCnt ===1)
        { 
          updateAnswer = update(this.state.answer,{medications:{$push:this.state.currAnswer}});
          
        }

        this.setState({
          answer:updateAnswer
        });
      
      break;

      case 9:
        //for question 10 primary care
        updateAnswer = update(this.state.answer,{primaryCare:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
      break;

      default:

        break;

    }

    //
    //below is the flow to set up the next question to display
    //
    //check if the current question a follow up question
    if(this.state.followupQFlag)
    {
      //current question is a follow up question
      //checking if this is the last follow up qeustion
      console.log("total # of follow up q: " +questionaire[counter].followupQ.length);
      if(this.state.followupQCnt < questionaire[counter].followupQ.length-1)
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
      if (this.state.currAnswer === 'Yes' && typeof questionaire[counter].followupQ !=='string')
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
        currAnswer={this.state.currAnswer}
        answerInputType={this.state.answerInputType}
        answerOptions ={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={questionaire.length}
        onAnswerSelected ={this.handleAnswerSelected}
        onClickNext={this.handleClickNext}
        onTextChange={this.handleTextChange}/>
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
