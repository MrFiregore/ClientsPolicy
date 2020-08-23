import bodyParser from "body-parser";
import cors from "cors";
/**
 *
 *
 * @param ClientRoutes {ClientRoutes}
 * @param PolicyRoutes {PolicyRoutes}
 * @returns {Router}
 */
export default ({ClientRoutes, PolicyRoutes}) =>{
	let router = require("express").Router();
	router.use(cors())
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }));

	/** GET /api/api-status - Check service status **/
	router.get("/api-status", (req, res) =>
		res.success({
			status: "ok"
		})
	);
	router.use("/clients", ClientRoutes);
	router.use("/policies", PolicyRoutes);

	return  router;

};
