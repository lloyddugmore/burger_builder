import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilliary from '../Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    let [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(true);
    }

    return (
        <Auxilliary>
            <Toolbar open={sideDrawerOpenHandler} 
                     isAuth={props.isAuthenticated}/>
            <SideDrawer open={showSideDrawer} 
                        closed={sideDrawerClosedHandler} 
                        isAuth={props.isAuthenticated}>
            </SideDrawer>
            <main className={classes.Content}>
                {props.children} 
            </main>
        </Auxilliary>
    )
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);