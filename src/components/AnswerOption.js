//compnent that display answer options
//presentation component

import React from 'react';
import PropTypes from "prop-types";
// checked={props.answerContent === props.answer}
function AnswerOption(props){
    if(props.inputType === 'radio')
    {
        return(
    
            <li className="answerOption">
                <input 
                    type={props.inputType}
                    className={props.inputClassName}
                    name={props.groupName}
                    checked={props.currAnswer === props.answerContent}
                    id={props.answerContent}
                    value={props.answerContent}
                    onChange={props.onAnswerSelected}
                />
                <label className={props.labelClassName} htmlFor={props.answerContent} >
                    {props.answerContent}
                </label>
    
            </li>
    
        );
    }

    if(props.inputType === 'checkbox')
    {
        return(
    
            <li className="answerOption">
                <input 
                    type={props.inputType}
                    className={props.inputClassName}
                    name={props.groupName}
                    id={props.answerContent}
                    value={props.answerContent}
                    onChange={props.onAnswerSelected}
                />
                <label className={props.labelClassName} htmlFor={props.answerContent} >
                    {props.answerContent}
                </label>
    
            </li>
    
        );
    }

    if(props.inputType === 'text')
    {
        return(
    
            <li className="answerOption">
                <label className={props.labelClassName} htmlFor={props.answerContent} >
                    {props.answerContent} :
                </label>
                <input 
                    type={props.inputType}
                    className={props.inputClassName}
                    name={props.groupName}
                    value={props.currAnswer}
                    onChange={props.onTextChange}
                />
            </li>
    
        );
    }

}

AnswerOption.propTypes={
    // answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    //currAnswer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
