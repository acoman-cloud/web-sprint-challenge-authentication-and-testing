const db = require('../../data/dbConfig')

const checkBodyExists = (req, res, next) => {
	if (!req.body.username || !req.body.password) {
		next({ status: 422, message: 'username and password required' })
	} else {
		next()
	}
}

const checkUsernameExists = async (req, res, next) => {
	try {
		const user = await db('users').where('username', req.body.username)
		if (user.length || user === req.body.username) {
			if (req.originalUrl === '/api/auth/register') {
				next({ status: 401, message: 'username taken' })
			} else {
				next({ status: 401, message: 'Invalid credentials' })
			}
		} else {
			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = {
	checkUsernameExists,
	checkBodyExists,
}