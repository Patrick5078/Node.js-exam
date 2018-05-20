import React from 'react'
import AnonymousBlocker from "../AnonymousBlocker";
import {connect} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/FileUpload';

class CreateStoryForm extends React.Component {
    state = {
        storyName: '',
        storyDescription: '',
        romanceTag: false,
        fantasyTag: false,
        scienceFictionTag: false,
        fanfictionTag: false,
        poetryTag: false,
        humorTag: false,
        mysteryTag: false,
        horrorTag: false,
        coverImage: undefined
    };
      onSubmit = (e) => {
          let submitResponse = 'Loading...'
          this.setState(() => ({ submitResponse }))
          e.preventDefault()
          const formCreateStory = document.getElementById('formCreateStory')
          const formData = new FormData(formCreateStory)
          // Api wants ones and zeros
          formData.append('romance', this.state.romanceTag ? 1 : 0)
          formData.append('fantasy', this.state.fantasyTag ? 1 : 0)
          formData.append('science_fiction', this.state.scienceFictionTag ? 1 : 0)
          formData.append('fan_fiction', this.state.fanfictionTag ? 1 : 0)
          formData.append('poetry', this.state.poetryTag ? 1 : 0)
          formData.append('humor', this.state.humorTag ? 1 : 0)
          formData.append('mystery', this.state.mysteryTag ? 1 : 0)
          formData.append('horror', this.state.horrorTag ? 1 : 0)
          fetch('/api/createStory', {
                  method: 'POST',
                  headers: {
                      'Authorization' : `bearer ${localStorage.jwt}`
                  },
                  body: formData
              }).then((response) => {
                  return response.json();
              })
                  .then((jResponse) => {
                      console.log(jResponse)
                  });
      }
      handleImage = (e) => {
          const coverImage = e.target.files[0]
          this.setState(() => ({ coverImage }))
      }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return <form id={'formCreateStory'}>
            <TextField
                id="name"
                label="Story titel"
                name={'name'}
                value={this.state.name}
                onChange={this.handleChange('storyName')}
                margin="normal"
            />
            <div/>
            <TextField
                multiline
                rows="4"
                id="description"
                label="Description"
                name={'description'}
                value={this.state.description}
                onChange={this.handleChange('storyDescription')}
                margin="normal"
            />
            <p>Choose tags that fit with the story</p>
            <div id={'tagGroup'}>
            <Checkbox
                checked={this.state.romanceTag}
                onChange={this.handleChange('romanceTag')}
                value="checkedA"
            />
            <p className={'margin-right'}> Romance </p>
                <Checkbox
                    checked={this.state.fantasyTag}
                    onChange={this.handleChange('fantasyTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Fantasy </p>
                <Checkbox
                    checked={this.state.scienceFictionTag}
                    onChange={this.handleChange('scienceFictionTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Science-Fiction </p>
                <Checkbox
                    checked={this.state.fanfictionTag}
                    onChange={this.handleChange('fanfictionTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Fan-Fiction </p>
                <Checkbox
                    checked={this.state.poetryTag}
                    onChange={this.handleChange('poetryTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Poetry </p>
                <Checkbox
                    checked={this.state.humorTag}
                    onChange={this.handleChange('humorTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Humor </p>
                <Checkbox
                    checked={this.state.mysteryTag}
                    onChange={this.handleChange('mysteryTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Mystery </p>
                <Checkbox
                    checked={this.state.horrorTag}
                    onChange={this.handleChange('horrorTag')}
                    value="checkedA"
                />
                <p className={'margin-right'}> Horror </p>

            </div>
                <div>
                <p>Upload an image to use as the story cover</p>
                    <input id={'realUploadButton'} name={'image'} accept="image/*" type={'file'} onChange={this.handleImage}/>
                    <label htmlFor="realUploadButton">
                    <Button id={'upload-button'} variant="raised" component={'span'} color={'primary'}>
                        Upload Cover
                        <FileUpload/>
                    </Button>
                    </label>
                    <div className={'margin-top'}/>
                <Button id={'createStoryButton'} variant="raised" color={'primary'} type={'button'} onClick={this.onSubmit}> Create Story </Button>
            </div>
        </form>
    }
}

if (!localStorage.jwt) {
    const mapStateToProps = (state) => {
        return {
            modalStatus: state.modalStatus
        }
    }
    CreateStoryForm = connect(mapStateToProps)(AnonymousBlocker(CreateStoryForm))
}

export default CreateStoryForm