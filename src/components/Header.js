import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import LoginModal from './LoginModal'
import { connect } from 'react-redux'
import ProfileDropdown from './ProfileDropdown'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    handleOpenModal = () => {
        this.props.dispatch({type: 'OPEN_MODAL'})
    }

    render() {
        return (
            <div id="header-wrapper">
                <LoginModal />
                <div id='header' className='main-container'>
                    <div className='center-left'>
                        <NavLink to='/' className='navLink' activeClassName='activeNavLink' exact={true}><img src={window.location.origin +'/images/logo.png'} /></NavLink>
                    </div>
                    <NavLink to='/browse/' className='navLink' activeClassName='activeNavLink'>Link to browse page</NavLink>
                    <NavLink to='/search' className='navLink' activeClassName='activeNavLink'>Link to search page</NavLink>
                    <NavLink to='/create' className='navLink' activeClassName='activeNavLink'>Link to create page</NavLink>
                    <div id={'logged-in-profile'}>
                        {localStorage.jwt ? <ProfileDropdown profileName={this.props.userData.name} profilePicture={this.props.userData.profilePicture}/>
                            :  <img id='header__profile-pic' onClick={this.handleOpenModal} src={window.location.origin + '/images/' +this.props.userData.profilePicture} />}
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

export default connect(mapStateToProps)(Header)