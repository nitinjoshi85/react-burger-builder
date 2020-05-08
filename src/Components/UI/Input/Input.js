import React from 'react';

import classes from './Input.css';

//class Snippet extends Component {
const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    //react-validation package: https://www.npmjs.com/package/react-validation
    //formsy-react package: https://github.com/christianalfoni/formsy-react
    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = (<span>Please enter valid {props.elementConfig.placeholder}</span>);
    }
    switch(props.elementType) {
        case ('input'):
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />
            break;
        case ('select'):    
            let options = props.elementConfig.options.map(opt=> (
                 <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
            ));
            inputElement = <select 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                value={props.value}>
                    {options}
            </select>
            break;    
        default:
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <span className={classes.ValidationError}>
                &nbsp;
                {validationError}
            </span>    
        </div>
    );
}

export default input;