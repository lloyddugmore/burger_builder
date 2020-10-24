import React from 'react';

import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    return (
    <Auxilliary>
        <Toolbar/>
        <SideDrawer></SideDrawer>
        <main className={classes.Content}>
            {props.children} 
        </main>
    </Auxilliary>
    );
}

export default layout;