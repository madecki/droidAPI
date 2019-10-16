const initializeConversation = (droidId, conversations) => {
	conversations[droidId] = {}
	conversations[droidId].beginningTime = new Date()
	conversations[droidId].correctAnswer = null
	conversations[droidId].conversationMessages = []
	conversations[droidId].hasProven = false
	conversations[droidId].converationStep = 1
}

module.exports = initializeConversation