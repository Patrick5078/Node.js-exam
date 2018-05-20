const jwt = require('jsonwebtoken')
const dbUserClass = require('../controllers/dbUser.js')
const dbUser = new dbUserClass
const secretKey = require('../security/secretKey')

const login = async (req,res) => {
    const sUserEmail = req.body.email
    const sUserPassword = req.body.password
    if(!sUserEmail || !sUserPassword){
        return res.json({message:'Unable to get email or password from client'})
    }

    const ajUser = await dbUser.Login(sUserEmail, sUserPassword).catch(err => {
        return res.send(err)
    })
    if (!ajUser.length) {
        return res.json({message: 'No user found matching email and pw'})
    }
// from now on we'll identify the jUser by the id and the id is the only personalized value that goes into our token
    const payload = {id: ajUser[0].id};
    const token = jwt.sign(payload, secretKey);
    return res.json({message: "ok", token: token});
}

module.exports = login
