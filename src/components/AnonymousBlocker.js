import React from 'react'

export default (WrappedComponent) => {
    return class WithSimpleState extends React.Component {
        handleSignIn = () => {
            this.props.dispatch({type: 'OPEN_MODAL'})
        }
        handleSignUp = () => {
            this.props.dispatch({type: 'SWITCH_DISPLAY'})
            this.props.dispatch({type: 'OPEN_MODAL'})
        }
        render() {
            return <div className={'box'}>
                <WrappedComponent/>
                <div className={'anonymous-blocker'}>
                    <p> This feature is not available to anonymous users, If you want to continue please sign up </p>
                    <p className={'fake-link'} onClick={this.handleSignUp}>Click here to create an account</p>
                    <div className={'single-line'}>
                        <p>Already have an account? </p>
                        <p className={'fake-link'} onClick={this.handleSignIn}> Sign in</p>
                    </div>
                </div>
            </div>
        }
    }
}