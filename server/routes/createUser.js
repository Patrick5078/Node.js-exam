const dbUserClass = require('../controllers/dbUser.js')
const dbUser = new dbUserClass

const createUser = async (req,res) => {

    const sUserEmail = req.body.email
    const sUserPassword = req.body.password
    const sUsername = req.body.username
    const sUserImage = 'default.png'
    if (!(sUserPassword && sUserEmail && sUsername)) {
        return res.json({status: 'error', message: 'Missing email, password or name'})
    }
    let jUser = {}
    jUser.name = sUsername
    jUser.email = sUserEmail
    jUser.password = sUserPassword
    jUser.profile_picture = sUserImage
    try {
        await dbUser.createUser(jUser)
        return res.json({status: 'ok' , message: 'User created'})
    } catch (e) {
        return console.log(e)
    }
}

module.exports= createUser
