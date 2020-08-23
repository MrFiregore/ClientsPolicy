import request from "supertest";
import {expect} from "chai";
import container from "../src/core/Container";
import {user_admin_policy, user_admin, normal_user} from "./config";

const App = container.resolve("App");
let authorization = "";

describe("Testing Client routes", () =>
{
	before(async () =>
	{
		if (authorization !== "") return true;
		await request(App)
			.post("/api/clients/login")
			.send({
				email: "britneyblankenship@quotezart.com",
				password: ""
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then(response =>
			{
				authorization = "Bearer " + response.body.data.token;
			});
	});
	it("Testing Get Client by id", done =>
	{
		request(App)
			.get("/api/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.data).to.deep.equal(user_admin);
				expect(response.body.data.name).to.equal("Britney");
				done();
			});
	});
	it("Testing Get Client by non registered id", done =>
	{
		request(App)
			.get("/api/clients/id/xxxxx")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("User not found");
				done();
			});
	});
	it("Testing Get Client by id without login", done =>
	{
		request(App)
			.get("/api/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86")
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(401);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("Unauthorised access, please identify yourself and use the Authorization: Bearer <TOKEN> header");
				done();
			});
	});
	it("Testing Get Client by policy with non admin user", done =>
	{
		request(App)
			.post("/api/clients/login")
			.send({
				email: normal_user.email,
				password: ""
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then(response =>
			{
				let response_token = response.body.data.token;
				request(App)
					.get("/api/clients/policy/a0ece5db-cd14-4f21-812f-966633e7be86")
					.set("Content-Type", "application/json")
					.set("Accept", "application/json")
					.set("Authorization", `Bearer ${response_token}`)
					.then(response =>
					{
						expect(response.statusCode).to.be.equal(401);
						expect(response.type).to.equal("application/json");
						expect(response.body.status).to.equal("error");
						expect(response.body).to.be.a("object");
						expect(response.body.error.message).to.equal("Access only for administrators");

						done();
					});
			});

	});
	it("Testing Get Client by name", done =>
	{
		request(App)
			.get(`/api/clients/name/${user_admin.name}`)
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.data[0]).to.deep.equal(user_admin);
				expect(response.body.data[0].name).to.equal("Britney");
				done();
			});
	});
	it("Testing Get Client by non registered name", done =>
	{
		request(App)
			.get("/api/clients/name/xxxxx")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("User not found");
				done();
			});
	});
	it("Testing Get Client by policy id", done =>
	{
		request(App)
			.get(`/api/clients/policy/${user_admin_policy.id}`)
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.data).to.deep.equal(user_admin);
				expect(response.body.data.name).to.equal("Britney");
				done();
			});
	});
	it("Testing Get Client by non registered policy id", done =>
	{
		request(App)
			.get("/api/clients/policy/xxxxxx")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("User not found");
				done();
			});
	});
});
