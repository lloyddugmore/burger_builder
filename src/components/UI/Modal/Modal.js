import React, { useEffect } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

const  Modal = (props) => {   
    return <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>    
            <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
}

//Performance tune here....
export default React.memo(
    Modal, (prevProps, nextProps) => 
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);