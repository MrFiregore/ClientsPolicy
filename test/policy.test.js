import request from "supertest";
import {user_admin, user_admin_policy} from "./config";
import {expect} from "chai";
import container from "../src/core/Container";

const App = container.resolve("App");
let authorization = "";

describe("Testing Policy routes", () =>
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

	it("Testing Get Policy by client name", done =>
	{
		request(App)
			.get(`/api/policies/client/${user_admin.name}`)
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.data).to.have.length(102);
				expect(response.body.data).to.deep.include.members([user_admin_policy]);
				done();
			});
	});
	it("Testing Get Policy by client name NOT FOUND", done =>
	{
		request(App)
			.get("/api/policies/client/xxxxxxxxxxxxxxx")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(404);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("Policy not found");
				done();

			});
	});

	it("Testing Get Policy by id", done =>
	{
		request(App)
			.get(`/api/policies/id/${user_admin_policy.id}`)
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(200);
				expect(response.type).to.equal("application/json");
				expect(response.body.data).to.deep.equal(user_admin_policy);
				done();
			});
	});

	it("Testing Get Policy by id NOT FOUND", done =>
	{
		request(App)
			.get("/api/policies/id/xxxxxxxx")
			.set("Authorization", authorization)
			.then(response =>
			{
				expect(response.statusCode).to.be.equal(404);
				expect(response.type).to.equal("application/json");
				expect(response.body.status).to.equal("error");
				expect(response.body).to.be.a("object");
				expect(response.body.error.message).to.equal("Policy not found");
				done();
			});
	});
});
