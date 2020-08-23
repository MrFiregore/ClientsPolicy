import path from "path"
import fs from "fs";
const ENV = process.env.NODE_ENV || "development";
const root_path = path.join(__dirname, "..","..")
import customEnv from "custom-env";

customEnv.env(ENV)
customEnv.env("default")

const logPath = path.join(root_path,"logs",ENV)


//Port to expose the API REST
const port = process.env.PORT || 5000;

if ( !fs.existsSync( logPath ) )
	fs.mkdirSync( logPath, { recursive: true } );

const config = {
	[ENV]: true,
	ENV: ENV,
	PORT: port,

	LOGPATH: logPath,
	ROOT_PATH: root_path,

	// Secrect String to encrypt JSON WEB TOKENS
	SECRETSTRING: process.env.SECRETSTRING || "nodeauthsecret",

	//Database configuration
	CLIENTS: process.env.CLIENTS,
	POLICIES: process.env.POLICIES
};

export { config };
