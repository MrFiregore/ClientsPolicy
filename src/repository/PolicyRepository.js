import axios from 'axios'

class PolicyRepository {
    constructor({config})
        {
            this.config = config;
        }

    async getAll()
        {
            return await axios.get(this.config.POLICIES).then((res) => res.data.policies);
        }

    async getPolicyBy(key, value, all = true)
        {
            let tmp = await this.getAll();
            let filter = tmp.filter(o => o[key] === value);
            return all ? filter : filter.pop();
        }
}

module.exports = PolicyRepository
