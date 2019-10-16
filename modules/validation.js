'use strict'

const errors = require('../translations/errors_en.json')

const numberInRange = (num) => {
	return Math.floor(num) > 0 || Math.floor(num) < 100
}
 
module.exports = {
	basicValidation(req, res, conversations) {
		if (!req.query.droidId) {
			res.status(400).json({error: errors.noIdPassed})
			return false
		}

		if (!req.query.message) {
			res.status(400).json({error: errors.noMessagePassed})
			return false
		}

		if (
			req.query.message.toUpperCase() !== 'YES' 
			&& req.query.message.toUpperCase() !== 'NO' 
			&& req.query.message.toUpperCase() !== 'HELLO'
			&& !numberInRange(req.query.message)
		) {
			res.status(400).json({error: errors.invalidInput})
			return false
		}
  
		if (conversations[req.query.droidId] && conversations[req.query.droidId].hasProven) {
			res.status(400).json({error: errors.knowledgeProven})
			return false
		}

		return true
	},

	droidConversationExists(droidId, conversations, res) {
		if (!conversations[droidId]) {
			res.status(400).json({error: errors.unknownDroid})
			return false
		}
	},
}