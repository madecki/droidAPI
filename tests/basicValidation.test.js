const request = require('supertest')
const app = require('../app')

describe('Test the input validation', () => {
	test('It should not work without droidId', (done) => {
		request(app).get('/').then((response) => {
			expect(response.statusCode).toBe(400)
			expect(response.text).toBe('{"error":"No droid ID has been passed!"}')
			done()
		})
	})

	test('It should not work without message', (done) => {
		request(app).get('/?droidId=123456?message=Hello').then((response) => {
			expect(response.statusCode).toBe(400)
			expect(response.text).toBe('{"error":"No message has been passed!"}')
			done()
		})
	})

	test('It should not accept incorrect input', (done) => {
		request(app).get('/?droidId=123456&message=Helo').then((response) => {
			expect(response.statusCode).toBe(400)
			expect(response.text).toBe('{"error":"Message input is invalid!"}')
			done()
		})
	})
})