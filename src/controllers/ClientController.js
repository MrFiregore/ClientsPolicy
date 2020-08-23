class ClientController {
    constructor({Login, ClientRepository, PolicyRepository})
        {
            this.Login = Login;
            this.ClientRepository = ClientRepository;
            this.PolicyRepository = PolicyRepository;
        }

        async login(req, res){
            return  await this.Login.loginFlow(
                req.body.email,
                req.body.password
            );

        }
    loginRequired(req, res, next) {
        if (req.user) {
            next();
        } else {
            return res.status(401).failure({
                message: "Unauthorised access, please identify yourself and use the Authorization: Bearer <TOKEN> header"
            });
        }
    }
    roleAdminCheck(req, res, next) {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).failure({
                message: "Access only for administrators"
            });
        }
    }

    async getUserById(id) {
        return  await this.ClientRepository.getUserBy("id", id, false);
    }
    async getUserByName(name) {
        return  await this.ClientRepository.getUserBy("name", name);
    }
    async getUserByPolicyNumber(policyNumber){
        let policy = await this.PolicyRepository.getPolicyBy("id", policyNumber)
        // console.log(policy);
        if (!policy.length) {
            return false;
        }

        return await this.ClientRepository.getUserBy("id", policy[0].clientId, false);
    }
}

module.exports = ClientController
