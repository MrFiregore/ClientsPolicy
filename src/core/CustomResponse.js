class CustomResponse {

    static get TYPE()
        {
            return {
                SUCCESS: "success", ERROR: "error"
            };
        }

    static createResponse(status, data, error)
        {

            let msg = {
                status: status
            };
            msg[status == CustomResponse.TYPE.SUCCESS ? "data" : "error"] =
                status == CustomResponse.TYPE.SUCCESS ? data : error;
            return msg;
        }

    static middleware(req, res, next)
        {
            req.getToken = ()=>{
                if (req.headers &&
                    req.headers.authorization){
                    let token = req.headers.authorization.split(" ");
                    return token[0] === "Bearer" ? token[1] : false;
                }

                return false;
            };
            res.success = function (data = [])
                {
                    return res.json(CustomResponse.createResponse(
                        CustomResponse.TYPE.SUCCESS,
                        data
                    ));

                };

            res.failure = function (error = {})
                {
                    return res.json(CustomResponse.createResponse(
                        CustomResponse.TYPE.ERROR,
                        null,
                        error
                    ));
                };
            next();
        }

}

module.exports = CustomResponse;
