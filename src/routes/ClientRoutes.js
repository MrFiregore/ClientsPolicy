// eslint-disable-next-line no-empty-pattern


export default ({ClientController}) =>
    {
        const clientRoutes = require("express").Router();

        clientRoutes
            .post(
                "/login",
                async (req, res) =>
                {
                    if (req.user)
                        return res.success({token: req.getToken()});
                    let resultSignin = await ClientController.login(req, res);
                    if (resultSignin.success)
                        return res.success({token: resultSignin.token});
                    else return res.status(401).failure({message: resultSignin.message});
                });

        /** GET /api/clients/id/:userId - Get user */
        clientRoutes
            .get(
                "/id/:userID",
                ClientController.loginRequired,
                async (req, res) =>
                {
                    var user = await ClientController.getUserById(req.params.userID);
                    if (typeof user === "undefined")
                        return res.status(404).failure({message: "User not found"});
                    return res.success(user);
                });

        /** GET /api/clients/name/:userName - Get user */
        clientRoutes
            .get(
                "/name/:userName",
                ClientController.loginRequired,
                async (req, res) =>
                {
                    var user = await ClientController.getUserByName(req.params.userName);
                    if (!user.length )
                        return res.status(404).failure({message: "User not found"});
                    return res.success(user);
                });

        /** GET /api/clients/policy/:policyID - Get user */
        clientRoutes
            .get(
                "/policy/:policyID",
                [
                    ClientController.loginRequired,
                    ClientController.roleAdminCheck
                ],
                async (req, res) =>
                {
                    var user = await ClientController.getUserByPolicyNumber(req.params.policyID);
                    if (!user)
                        return res.status(404).failure({message: "User not found"});
                    return res.success(user);
                });

        return clientRoutes;

    };
