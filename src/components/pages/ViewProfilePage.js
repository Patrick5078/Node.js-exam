import React from 'react'
import Header from '../Header.js'

export default class ViewProfilePage extends React.Component {
    state = {
        name: ''
    }
    componentDidMount() {
        fetch('/api/getUser?id=1')
            .then((response) => {
                return response.json();
            })
            .then((ajResponse) => {
                this.setState(() => ({ name: ajResponse[0].name}))
            });
        }
        render() {
            return (
                <div>
                    My name is {this.state.name}
                </div>
            )
        }
}
