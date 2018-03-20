//component that bring Question, QuestionCount and AnwerOption compontents together
//container component - define how thing work together
//this is also a presentation component

import React from 'react';
import Question from '../components/Question';
// import QuestionCount from '../components/QuestionCount';
import AnswerInput from '../components/AnswerInput';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import AnswerOption from '../components/AnswerOption'


function Quiz(props){
   
    
    return (
        <ReactCSSTransitionGroup
            className="quiz"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div className="quiz">

                <LinearProgress mode="determinate" min={0} max={props.questionTotal} color="#d40027" style={{height: "7px", marginBottom: "25px"}} value={props.counter} />

               
               {/* <QuestionCount
                    counter={props.questionId}
                    total={props.questionTotal}
                /> */ }

                <Question content={props.question}/>
                
                
                <AnswerInput 
                answerInputType={props.answerInputType}
                answerOptions={props.answerOptions}
                questionId={props.questionId}
                currAnswer={props.currAnswer}
                onAnswerSelected={props.onAnswerSelected}
                onTextChange={props.onTextChange}
                />
                

                <FlatButton style={{backgroundColor: "#3b4e8c",fontSize:"2em", hoverColor: "#b63d34", marginTop:"20px", margin:"10px", color:'#fff'}} onClick={props.onClickBack}>BACK</FlatButton>

                <FlatButton style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff',fontSize:"2em",}} onClick={props.onClickNext}> NEXT</FlatButton>

                
            </div>
        </ReactCSSTransitionGroup>
    );
}

Quiz.propTypes ={
    //currAnswer: PropTypes.string.isRequired,
    //answerOptions:PropTypes.array.isRequired,
    //counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
}

export default Quiz;