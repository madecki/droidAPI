const express = require('express')
const app = express()
const validation = require('./modules/validation')
const errors = require('./translations/errors_en.json')
const questionsHandler = require('./modules/questionsHandler')
const conversations = {}

app.get('/', (req, res) => {
	if (!validation.basicValidation(req, res, conversations)) return

	if (req.query.message.trim().toUpperCase() === 'HELLO') {
		questionsHandler.handleHelloMessage(req.query.droidId, req.query.message, res, conversations)
		return
	}

	validation.droidConversationExists(req.query.droidId, conversations, res)

	if (conversations[req.query.droidId]) {
		switch (conversations[req.query.droidId].converationStep) {
		case 1: questionsHandler.handleFirstQuestion(req.query.droidId, req.query.message, res, conversations); break
		case 2: questionsHandler.handleSecondQuestion(req.query.droidId, req.query.message, res, conversations); break
		case 3: questionsHandler.handleThirdQuestion(req.query.droidId, req.query.message, res, conversations); break
		case 4: questionsHandler.handleLastQuestion(req.query.droidId, req.query.message, res, conversations); break
		}
	}
})

app.get('/get-conversation', (req, res) => {
	if (conversations[req.query.droidId]) {
		let beginningTime = conversations[req.query.droidId].beginningTime
		let selectedDate = new Date(req.query.date)

		if (
			beginningTime.getFullYear() === selectedDate.getFullYear()
			&& beginningTime.getMonth() === selectedDate.getMonth()
			&& beginningTime.getDay() === selectedDate.getDay()
		) {
			res.json({conversation: conversations[req.query.droidId].conversationMessages})
		} else {
			res.json({error: errors.incorrectDate})
		}
	} else {
		res.json({error: errors.droidIdNotFound})
	}
})

module.exports = app