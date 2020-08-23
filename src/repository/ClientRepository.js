import axios from 'axios'

class ClientRepository {
    constructor({config})
        {
            this.config = config;
        }

    async getAll()
        {
            return await axios.get(this.config.CLIENTS).then((res) => res.data.clients);
        }

    async getUserBy(key, value, all = true)
        {
            let tmp = await this.getAll();
            let filter = tmp.filter(o => o[key] === value);
            return all ? filter : filter.pop();
        }
}

module.exports = ClientRepository
