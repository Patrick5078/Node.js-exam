import React from 'react'
import Modal from 'react-modal'
import LoginForm from './Forms/LoginForm'
import CreateAccountForm from './Forms/CreateAccountForm'
import {connect} from "react-redux";

const customStyle = {
    content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class LoginModal extends React.Component {
    constructor(props) {
        super(props)
    }

    handleCloseModal = () => {
        this.props.dispatch({type: 'CLOSE_MODAL'})
    }

    handleSwitchForm = () => {
        this.props.dispatch({
            type: 'SWITCH_DISPLAY'
        })
    }

    render(){
        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.modalStatus.isOpen}
                contentLabel='Login'
                onRequestClose={this.handleCloseModal}
                style = {customStyle}
            >
                {this.props.modalStatus.isLogin ? <LoginForm /> : <CreateAccountForm />}
                {this.props.modalStatus.isLogin ? <p>New to webfiction?</p> : <p>Have an account?</p>}
                {this.props.modalStatus.isLogin ? <p className={'fake-link'} onClick={this.handleSwitchForm}>Sign up now</p>
                    : <p className={'fake-link'} onClick={this.handleSwitchForm}>Sign in now</p>}
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modalStatus : state.modalStatus
    }
}

export default connect(mapStateToProps)(LoginModal)