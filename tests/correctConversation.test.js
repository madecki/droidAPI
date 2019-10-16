const request = require('supertest')
const app = require('../app')

describe('Test the correct conversation', () => {
	test('It should ask if talks with droid', (done) => {
		request(app).get('/?droidId=123456&message=Hello').then((response) => {
			expect(response.statusCode).toBe(200)
			expect(response.text).toBe('{"message":"Are you a droid?"}')
			done()
		})
	})
	test('It should ask first math question', (done) => {
		request(app).get('/?droidId=123456&message=yes').then((response) => {
			expect(response.statusCode).toBe(200)
			expect(response.text).toBe('{"message":"So then, prove you can do some math. What is the sum of 8 and 9?"}')
			done()
		})
	})
	test('It should tell the answer is correct and ask for another', (done) => {
		request(app).get('/?droidId=123456&message=17').then((response) => {
			expect(response.statusCode).toBe(200)
			expect(response.text).toBe('{"message":"You are right! Wanna try another one?"}')
			done()
		})
	})

	let firstNumber, secondNumber

	test('It should tell another math question', (done) => {
		request(app).get('/?droidId=123456&message=yes').then((response) => {
			let arrayOfWords = response.text.split(' ')
			firstNumber = Math.floor(arrayOfWords[arrayOfWords.length - 1][0])
			secondNumber = Math.floor(arrayOfWords[arrayOfWords.length - 3])
			expect(response.statusCode).toBe(200)
			done()
		})
	})

	test('It should accept final correct answer', (done) => {
		request(app).get(`/?droidId=123456&message=${firstNumber + secondNumber}`).then((response) => {
			expect(response.statusCode).toBe(200)
			expect(response.text).toBe('{"message":"You are right! I’ll remember you can do the maths! EoC."}')
			done()
		})
	})

	test('It should not let proving again', (done) => {
		request(app).get(`/?droidId=123456&message=${firstNumber + secondNumber}`).then((response) => {
			expect(response.statusCode).toBe(400)
			expect(response.text).toBe('{"error":"I already know you\'re good in math, go away!"}')
			done()
		})
	})
})