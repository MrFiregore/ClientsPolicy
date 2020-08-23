import jwt from "jsonwebtoken";

class Login {
    constructor({config, ClientRepository})
        {
            this.config = config;
            this.ClientRepository = ClientRepository;
        }

    async loginFlow(email, password)
        {
            var user = await this.ClientRepository.getUserBy("email", email);
            if (!user.length) {
                return {
                    success: false,
                    message: "Incorrect password or email"
                };
            }
            user = user[0];
            const dataPayload = {
            	id: user.id,
            	name: user.name,
            	email: user.email,
            	role: user.role
            };

            const generateToken = jwt.sign(
            	dataPayload,
            	this.config.SECRETSTRING,
            	{
            		expiresIn: "1h"
            	}
            );
            return {
                success: true,
                message: user.name + " has been correctly logged",
                token: generateToken
            };
        }
}

export default Login;
