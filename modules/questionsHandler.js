'use strict'

const survey = require('../translations/survey_en.json')
const initializeConversation = require('./conversationInitializer')

const fillMessagesHistory = (droidId, message, answer, conversations) => {
	conversations[droidId].conversationMessages.push({message, answer})
}

const sendAnswer = (droidId, message, answer, res, conversations, isCorrect = false) => {
	fillMessagesHistory(droidId, message, answer, conversations)
	res.json({message: answer})

	if (isCorrect) conversations[droidId].converationStep++
}

const handleHelloMessage = (droidId, message, res, conversations) => {
	if (!conversations[droidId]) {
		initializeConversation(droidId, conversations)
	}
	sendAnswer(droidId, message, survey.welcomeQuestion, res, conversations)
}

const handleFirstQuestion = (droidId, message, res, conversations) => {
	if (message.trim().toUpperCase() === 'YES') {
		sendAnswer(droidId, message, survey.firstSumQuestionCorrect, res, conversations, true)
	} else if (message.trim().toUpperCase() === 'NO') {
		sendAnswer(droidId, message, survey.firstSumQuestionIncorrect, res, conversations)
	}
}

const handleSecondQuestion = (droidId, message, res, conversations) => {
	if (message.trim().toUpperCase() === '17') {
		sendAnswer(droidId, message, survey.tryAnotherOneQuestion, res, conversations, true)
	} else {
		sendAnswer(droidId, message, survey.welcomeQuestionAgain, res, conversations)
	}
}

const handleThirdQuestion = (droidId, message, res, conversations) => {
	if (message.trim().toUpperCase() === 'YES') {
		const a = Math.floor(Math.random() * 10)
		const b = Math.floor(Math.random() * 10)
		conversations[droidId].correctAnswer = a + b
		sendAnswer(droidId, message, `${survey.genericSumQuestion} ${a} ${survey.and} ${b}?`, res, conversations, true)
	} else if (message.trim().toUpperCase() === 'NO') {
		conversations[droidId].converationStep = 1
		sendAnswer(droidId, message, survey.dontWantToAnswerResponse, res, conversations)
	} else {
		sendAnswer(droidId, message, survey.tryAnotherOneQuestion, res, conversations)
	}
}

const handleLastQuestion = (droidId, message, res, conversations) => {
	if (message === conversations[droidId].correctAnswer.toString()) {
		conversations[droidId].hasProven = true
		sendAnswer(droidId, message, survey.genericSumQuestionCorrect, res, conversations, true)
	} else {
		conversations[droidId].converationStep = 1
		sendAnswer(droidId, message, survey.genericSumQuestionIncorrect, res, conversations)
	}
}

module.exports = {
	handleFirstQuestion,
	handleSecondQuestion,
	handleThirdQuestion,
	handleLastQuestion,
	handleHelloMessage,
}