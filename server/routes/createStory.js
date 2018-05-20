const fs = require('fs-extra')
const dbStoriesClass = require('../controllers/dbStories.js')
const dbStories = new dbStoriesClass


const createStory = async (req,res) => {
    if (!req.files.image) {
        return res.json({message: 'Please upload a cover', status: 'error'})
    }
    if(req.files.image.mimetype.split('/')[0] !== 'image'){
        return res.json({message: 'Uploaded file must be an image', status: 'error'})
    }
    const id = req.files.image.uuid
    const srcPath = req.files.image.file
    const fileExtension = req.files.image.mimetype.split('/')[1]
    const filename = `${id}.${fileExtension}`
    const targetPath = `${__dirname}/../public/images/${filename}`
    fs.move(srcPath, targetPath, err => {
        if (err) return console.error(err)
    })
    const jStory = {
        users_id: req.user.id,
        views: 0,
        story_cover: filename,
        name: req.body.name,
        description: req.body.description,
        romance: req.body.romance,
        horror: req.body.horror,
        science_fiction: req.body.science_fiction,
        fan_fiction: req.body.fan_fiction,
        fantasy: req.body.fantasy
    }
    await dbStories.createStory(jStory).catch(err => {
        console.log(err)
        return res.json({message: 'error saving story to db' , status: 'error'})
    })
    return res.json({message: 'The story has been saved'})
}

module.exports = createStory