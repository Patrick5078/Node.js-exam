class DbUser {
    getUser (iUserId) {
        return new Promise((resolve, reject) => {
            global.con.query('SELECT id, name, email, patreon_account, profile_picture, font_size, theme FROM users WHERE id = ?', [iUserId], (error, ajResult) => {
                if (error) reject(error);
                if(!ajResult[0]) {
                    reject('rejection worked')
                }
                resolve(ajResult)
            })
        })
    }
    Login(sUserEmail , sUserPassword) {
        return new Promise((resolve, reject) => {
            global.con.query('SELECT * FROM users WHERE email = ? AND password = ?', [sUserEmail, sUserPassword], (error, ajResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(ajResult)
            })
        })
    }
    createUser(jUser) {
        return new Promise((resolve, reject) => {
            global.con.query('INSERT INTO USERS SET ?', [jUser], (error, ajResult) => {
                if (error) return reject(error);
                return resolve(ajResult)
            })
        })
    }
}

module.exports = DbUser