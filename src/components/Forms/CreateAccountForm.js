import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CreateAccountForm extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        passwordRepeatError: false,
        submitResponse: '',
        status: 'default'
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    onRetypePasswordChange = (e) => {
        const passwordRepeat = e.target.value;
        this.setState(() => ({ passwordRepeat }));
    }
    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
    }
    onSubmit = (e) => {
        let submitResponse = 'Loading...'
        let status
        this.setState(() => ({ submitResponse }))
        e.preventDefault()
        if (this.state.password === this.state.passwordRepeat) {
            fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then((response) => {
                    return response.json();
                })
                .then((jResponse) => {
                    status = jResponse.status ==='ok' ? 'success' : 'error'
                    submitResponse = jResponse.status === 'ok' ? 'Account created successfully' : 'There was an error creating your account'
                    this.setState(() => ({ submitResponse, status }))
                });
        }
        else {
            this.setState(() => ({ passwordRepeatError: true }));
        }
    }
    render() {
        return <form name={'formCreateAccount'}>
            <h2> Create an account </h2>
            <TextField type={'text'} onChange={this.onUsernameChange} value={this.state.username} label={'Username'}/>
            <div className={'margin-top'}/>
            <TextField type={'email'} name='txtUserEmail' onChange={this.onEmailChange} value={this.state.email} label={'Email'}/>
            <div className={'margin-top'}/>
            <TextField type={'password'} onChange={this.onPasswordChange} value={this.state.password} label={'Password'} />
            {this.state.passwordRepeatError && <p className={'error'}>The repeated password does not match</p>}
            <div className={'margin-top'}/>
            <TextField type={'password'} onChange={this.onRetypePasswordChange} value={this.state.passwordRepeat}
                   label={'Repeated Password'}/>
            <div className={'margin-top'}>
            <Button className={'margin-top'} variant={'raised'} color={'primary'} type={'button'} onClick={this.onSubmit}> Create account </Button>
            </div>
            <div className ={this.state.status}>{this.state.submitResponse}</div>
        </form>
    }
}
