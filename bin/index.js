import container from "../src/core/Container";

const config = container.resolve("config");
const app = container.resolve("App");

app.listen(config.PORT, () => {
	console.log(
		`API Server started and listening on port ${config.PORT}`
	);
});
