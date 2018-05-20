import React from 'react'
import Header from '../Header.js'
import ProfileMenu from '../ProfileMenu'
import ProfileCard from '../ProfileCard'
import {connect} from "react-redux";
import ProfileSettingsForm from '../Forms/ProfileSettingsForm'

class MyProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Header />
                <div id={'profile-container'} className={'main-container'}>
                    <div id={'profile_left_container'}>
                        <ProfileCard profileName={this.props.userData.name} profilePicture={this.props.userData.profilePicture}/>
                        <ProfileMenu activeItem={this.props.match.params.setting}/>
                    </div>
                    <div id={'profile-right-container'}>
                        {this.props.match.params.setting === 'settings' && <h2>Settings</h2> }
                        {this.props.match.params.setting === 'settings' && <ProfileSettingsForm/> }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData : state.userData,
        modalStatus: state.modalStatus
    }
}

export default connect(mapStateToProps)(MyProfilePage)
