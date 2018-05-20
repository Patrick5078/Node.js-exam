import React from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

export default class ProfileSettingsForm extends React.Component {
    state = {
        checkedA: true,
        checkedB: true,
    };
    onSubmit = (e) => {
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        return <form name={'formChangeSettings'}>
            <div className={'switch'}>
            <p>Enable two step authentication </p>
            <Switch
                color={'primary'}
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
            />
            </div>
            <div className={'switch'}>
                <p>Send me emails about updated subscriptions</p>
            <Switch
                color={'primary'}
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
            />
            </div>
            <Button variant={'raised'} color={'primary'} type={'button'} onClick={this.onSubmit}>Confirm changes</Button>
        </form>
    }
}
