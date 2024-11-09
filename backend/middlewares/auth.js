const {validateToken } = require("../services/auth");

async function checkForAuthentication(req,res,next) {
        // console.log("I am Middleware");
        const tokenCookieValue = req.cookies.token;
        if(!tokenCookieValue){
            res.rediret("/user/signin");
        } 
        
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            // console.log(req.user);
        }
        catch(err){

        }
        return next();
}

module.exports = { checkForAuthentication };

