class dbStories {
    createStory(jStory) {
        return new Promise((resolve, reject) => {
            global.con.query('INSERT INTO STORIES SET ?', [jStory], (error, ajResult) => {
                if (error) return reject(error);
                return resolve(ajResult)
            })
        })
    }
}

module.exports = dbStories