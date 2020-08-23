import CustomResponse from "./CustomResponse";
import {config} from "../config/index";

import {createContainer, asClass, asFunction, asValue, Lifetime, InjectionMode} from "awilix";

import App from "./App";

import router from "../routes";
import ClientRoutes from "../routes/ClientRoutes";
import PolicyRoutes from "../routes/PolicyRoutes";

import Login from '../services/Login';

import ClientController from '../controllers/ClientController';
import PolicyController from '../controllers/PolicyController';

import ClientRepository from '../repository/ClientRepository';
import PolicyRepository from '../repository/PolicyRepository';

const container = createContainer();

// let tmp = container.loadModules(
// 	["../routes/*.js"],
// 	{
// 		// We want ClassicalService to be registered as classicalService.
// 		formatName: "camelCase",
// 		resolverOptions: {
// 			lifetime: Lifetime.SINGLETON
// 		},
// 		cwd: __dirname,
// 	}
// );
container
	.register({
		config: asValue(config)
	})

	.register({
		ClientController: asClass(ClientController).singleton()
	})
	.register({
		PolicyController: asClass(PolicyController).singleton()
	})
	.register({
		ClientRepository: asClass(ClientRepository).singleton()
	})

	.register({
		PolicyRepository: asClass(PolicyRepository).singleton()
	})
	.register({
		Login: asClass(Login).singleton()
	})
	.register({
		App: asFunction(App).singleton()
	})

	.register({
		router: asFunction(router).singleton()
	})
	.register({
		ClientRoutes: asFunction(ClientRoutes).singleton()
	})
	.register({
		PolicyRoutes: asFunction(PolicyRoutes).singleton()
	})
;

/**
 * @constructor Container
 * @type {AwilixContainer<any>}
 */
module.exports = container;
