import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    //shouldValidate ensures that only fields that should be validated are checked
    //touched is so that on first load not all fields are seen as invalid (red)
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementtype) { 
        case ('input'):
            inputElement = <input {...props.elementconfig} 
                                value={props.value} 
                                className={inputClasses.join(' ')}
                                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementconfig} 
                                value={props.value} 
                                className={inputClasses.join(' ')}
                                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                    <select 
                        value={props.value} 
                        className={inputClasses.join(' ')}
                        onChange={props.changed}> 
                        {props.elementconfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
            break;
        default:
            inputElement = <input {...props.elementconfig} 
                                value={props.value} 
                                className={inputClasses.join(' ')}
                                onChange={props.changed}/>;
    }

    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    )
};

export default input;
