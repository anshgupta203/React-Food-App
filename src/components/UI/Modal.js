import ReactDom from 'react-dom'
import React from 'react'

import styles from './Modal.module.css'

const Backdrop = props =>{
    return <div className={styles.backdrop} onClick={props.onHideCart}></div>
}

const ModalOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
    
}

const portalElement =document.getElementById('overlays')

const Modal = (props) => {
     return <React.Fragment>
        {ReactDom.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
     </React.Fragment>
}

export default Modal