// All express related settings
import express from "express";
var winston = require('winston'),
	expressWinston = require('express-winston');
require('winston-daily-rotate-file');

import jwt from "jsonwebtoken";
import CustomResponse from './CustomResponse'
/**
 * @constructor App
 * @param config {Container}
 * @param router {}
 * @param Response {CustomResponse}
 * @returns {Express}
 */
export default ({ config, router }) => {
	const App = express();
	App.disable("x-powered-by");
	App.use(CustomResponse.middleware);

	// Detect user
	App.use(function(req, res, next) {
		var token= req.getToken();
		if (token) {
			jwt.verify(
				token,
				config.SECRETSTRING,
				function(err, decode) {
					if (err) req.user = undefined;
					else {
						req.user = decode;
					}
					next();
				}
			);
		} else {
			req.user = undefined;
			next();
		}
	});

	if (config.ENV !== "testing") {
		const dailyRotateFileTransport =  new winston.transports.DailyRotateFile({
			filename: `${config.LOGPATH}/%DATE%.log`,
			maxSize: "20m",
			maxDays: "3d",
			zippedArchive: true,
			datePattern: 'YYYY-MM-DD'
		});

		// Enable Console logger
		App.use(
			expressWinston.logger({
				transports: [
					new winston.transports.Console({
						json: true,
						colorize: true
					}),
					dailyRotateFileTransport
				],
				meta: true, // optional: control whether you want to log the meta data about the request (default to true)
				msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
				expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
				colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
				ignoreRoute: function(req, res) {
					return false;
				} // optional: allows to skip some log messages based on request and/or response
			})
		);
	}

	// Mount all routes on /api path
	App.use("/api", router);
	App.use(function(req, res) {
		res.status(404).failure({ message: req.originalUrl + " not found" });
	});
	return App;
};
