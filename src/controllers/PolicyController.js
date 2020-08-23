class PolicyController {
    constructor({ClientRepository, PolicyRepository})
        {
            this.ClientRepository = ClientRepository;
            this.PolicyRepository = PolicyRepository;
        }
    async getPolicyByUserName(userName){
        let user = await this.ClientRepository.getUserBy("name", userName)
        if (!user.length) {
            return false;
        }
        return await this.PolicyRepository.getPolicyBy("clientId",user[0].id);
    }
    async getPolicyById(id){
        return await this.PolicyRepository.getPolicyBy("id",id,false);
    }

}

module.exports = PolicyController
