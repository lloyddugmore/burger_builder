import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <div>
            ...
        </div>
    </header>
)

export default toolbar;