//component that bring Question, QuestionCount and AnwerOption compontents together
//container component - define how thing work together
//this is also a presentation component

import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerInput from '../components/AnswerInput';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import AnswerOption from '../components/AnswerOption'


function Quiz(props){
    
    return (
        <ReactCSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div className="quiz">
                <QuestionCount
                    counter={props.questionId}
                    total={props.questionTotal}
                />

                <Question content={props.question}/>
                
                
                <AnswerInput 
                answerInputType={props.answerInputType}
                answerOptions={props.answerOptions}
                questionId={props.questionId}
                currAnswer={props.currAnswer}
                onAnswerSelected={props.onAnswerSelected}
                onTextChange={props.onTextChange}
                />
                

                <button onClick={props.onClickNext}>
                Next
                </button>
                
            </div>
        </ReactCSSTransitionGroup>
    );
}

Quiz.propTypes ={
    currAnswer: PropTypes.string.isRequired,
    //answerOptions:PropTypes.array.isRequired,
    //counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
}

export default Quiz;