//compnent that display answer options
//presentation component

import React from 'react';
import PropTypes from "prop-types";
import AnswerOption from "./AnswerOption";


function AnswerInput(props){

    function renderRadioInputOption(data){
        return(
            <AnswerOption 
                key={data}
                inputClassName='radioCustomButton'
                labelClassName="radioCustomLabel"
                answerContent={data}
                inputType={props.answerInputType}
                groupName="radioGroup"
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />
        )
       
    }

    function renderCheckboxInputOption(data){
        return(
            <AnswerOption 
                key={data}
                inputClassName='checkCustomButton'
                labelClassName="checkCustomLabel"
                answerContent={data}
                inputType={props.answerInputType}
                groupName={data}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />

        );
    }
    
    function determineInputType(type){
       
        switch(type){
            case "text":
                return(
                    <input type="text" id="age" name="age"/>
                );

            case "radio":
                return(
                
                    <ul className="answerOptions">
                        {props.answerOptions.map(renderRadioInputOption)}
                    </ul> 
                            
                );
            case "checkbox":
                return(
                
                    <ul className="answerOptions">
                        {props.answerOptions.map(renderCheckboxInputOption)}
                    </ul> 
                            
                );
                    
            default:
                return (<p>no input type</p>);

        }
    }
    

    return(
      
        
        // if({props.answerInputType} === 'text'){
        //     renderTextInput();
        // }
       // <input type="text" id="age" name="age"/>
       <div className="answerInput">{determineInputType(props.answerInputType)}</div>

    );
}

AnswerInput.propTypes={
    answerInputType: PropTypes.string.isRequired,
    // answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
   onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerInput;
