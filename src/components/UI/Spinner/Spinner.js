import React from 'react';

//CSS was taken from spinner.css website. really cool - https://projects.lukehaas.me/css-loaders/
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={classes.Loader}>Loading...</div>
)

export default spinner;