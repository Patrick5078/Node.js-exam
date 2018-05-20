const dbUserClass = require('../controllers/dbUser.js')
const dbUser = new dbUserClass

const getUser = async (req, res) => {
    const iUserId = req.query.id
    try {
        const ajUsers = await dbUser.getUser(iUserId)
        return res.json({status: 'ok' , data: ajUsers[0]})
    } catch (e) {
        return res.json({status: 'err', message: e})
    }
}


module.exports = getUser