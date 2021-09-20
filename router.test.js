require('dotenv').config();
/* jshint ignore:start */

const request = require('supertest');
const router = require('./router.js');

describe("GET /", () => {
	test("Should respond with a 200 status code", async () => {
		const response = await request(router).get("/")
		expect(response.statusCode).toBe(200)
	})
	test("Should specify json in the content type header", async () => {
		const response = await request(router).get("/")
		expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
	})
})


/* jshint ignore:end */