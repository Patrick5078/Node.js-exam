import React from 'react'
import Header from '../Header.js'
import {connect} from "react-redux";
import CreateStoryForm from '../forms/CreateStoryForm'

const CreateStoryPage = (props) => (
    <div>
        <Header />
        <div className={'main-container'}>
        <h1> Unleash your imagination! </h1>
        <p>First, write some details about your story, then you can go on to add chapters and the story itself</p>
            <CreateStoryForm/>
    </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        userData : state.userData
    }
}


export default connect(mapStateToProps)(CreateStoryPage)