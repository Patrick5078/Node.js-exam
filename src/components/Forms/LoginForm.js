import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        error: undefined
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };
    onSubmit = (e) => {
        const url = '/api/login';
        const data = this.state

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(jResponse => {
                if(jResponse.token) {
                    localStorage.jwt = jResponse.token
                    location.reload()
                }
                else {
                    this.setState(() => ({ error : 'Incorrect username or password'}))
                }
            });
    }
    render() {
        return <form name={'formLogin'}>
            <h2> Login </h2>
            <TextField onChange={this.onEmailChange} value={this.state.email} label={'Email'}/>
            <div/>
            <TextField type={'password'} onChange={this.onPasswordChange} value={this.state.password}
                   label={'Password'}/>
            <div className={'margin-top'}>
                <Button variant={'raised'} color={'primary'} type={'button'} onClick={this.onSubmit}>Login</Button>
                {this.state.error && <p className={'error'}>{this.state.error}</p>}
            </div>
        </form>
    }
}
