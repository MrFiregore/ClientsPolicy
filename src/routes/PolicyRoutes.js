export default ({ClientController, PolicyController}) =>
    {
        const policyRoutes = require('express').Router()

        /** GET /api/policies/client/:userName - Get policies */
        policyRoutes
            .get('/client/:userName',
                [
                    ClientController.loginRequired,
                    ClientController.roleAdminCheck
                ],
                async (req, res) =>
                {

                    let policies =  await PolicyController.getPolicyByUserName(req.params["userName"]);

                    if (!policies.length )
                        return res.failure({message: "Policy not found"});
                    return res.success(policies);
                })
        /** GET /api/policies/id/:policyId - Get policies */
        policyRoutes
            .get('/id/:policyId',
                [
                    ClientController.loginRequired,
                    ClientController.roleAdminCheck
                ],
                async (req, res) =>
                {

                    let policy =  await PolicyController.getPolicyById(req.params["policyId"]);
                    if (typeof policy === "undefined")
                        return res.failure({message: "Policy not found"});
                    return res.success(policy);
                })
        return policyRoutes;

    }
