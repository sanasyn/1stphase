//compnent that display answer options
//presentation component

import React from 'react';
import PropTypes from "prop-types";
// checked={props.answerContent === props.answer}
function AnswerOption(props){
    return(
    
        <li className="answerOption">
            <input 
                type={props.inputType}
                className={props.inputClassName}
                name={props.groupName}
                
                id={props.answerContent}
                value={props.answerContent}
                onClick={props.onAnswerSelected}
            />
            <label className={props.labelClassName} htmlFor={props.answerContent} >
                {props.answerContent}
            </label>

        </li>

    );
}

AnswerOption.propTypes={
    // answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
