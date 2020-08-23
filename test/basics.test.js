import request from "supertest";
import {expect} from "chai";
import container from "../src/core/Container";

const App = container.resolve("App");
let authorization = "";


describe("API - Basics and login", () =>
{
	describe("Testing basics", () =>
	{

		it("Check api status", (done) =>
		{
			request(App)
				.get("/api/api-status").then(response =>
				{
					expect(response.statusCode).to.be.equal(200);
					expect(response.type).to.equal("application/json");
					expect(response.body.status).to.equal("success");
					expect(response.body).to.be.a("object");
					expect(response.body.data.status).to.equal("ok");
					done();
				});
		});
		it("Check api non valid url", (done) =>
		{
			request(App)
				.get("/api/fakeurl").then(response =>
				{
					expect(response.statusCode).to.be.equal(404);
					expect(response.type).to.equal("application/json");
					expect(response.body.status).to.equal("error");
					expect(response.body).to.be.a("object");
					expect(response.body.error.message).to.equal("/api/fakeurl not found");
					done();
				});
		});
	});

	describe("Testing Login", () =>
	{

		it("Testing Login route", done =>
		{
			request(App)
				.post("/api/clients/login")
				.send({
					email: "britneyblankenship@quotezart.com",
					password: ""
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.then(response =>
				{
					expect(response.statusCode).to.be.equal(200);
					expect(response.type).to.equal("application/json");
					expect(response.body.status).to.equal("success");
					authorization = "Bearer " + response.body.data.token;
					done();
				});
		});
		it("Testing Login route with generated token", done =>
		{
			request(App)
				.post("/api/clients/login")
				.send({
					email: "britneyblankenship@quotezart.com",
					password: ""
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.then(response =>
				{
					let response_token = response.body.data.token;
					request(App)
						.post("/api/clients/login")
						.send({
							email: "britneyblankenship@quotezart.com",
							password: ""
						})
						.set("Content-Type", "application/json")
						.set("Accept", "application/json")
						.set("Authorization", `Bearer ${response_token}`)
						.then(response =>
						{
							expect(response.statusCode).to.be.equal(200);
							expect(response.type).to.equal("application/json");
							expect(response.body.status).to.equal("success");
							expect(response.body.data.token).to.equal(response_token);

							done();
						});
				});

		});
		it("Testing Login route Failure", done =>
		{
			request(App)
				.post("/api/clients/login")
				.send({
					email: "fail@unknow.xyz",
					password: ""
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.then(response =>
				{
					expect(response.statusCode).to.be.equal(401);
					expect(response.type).to.equal("application/json");
					expect(response.body.status).to.equal("error");
					expect(response.body.error.message).to.equal("Incorrect password or email");
					done();
				});
		});
	});



});
