const {validateToken } = require("../services/auth");

async function checkForAuthentication(req,res,next) {
        // console.log("I am Middleware");
        // const tokenCookieValue = req.cookies.token;
        const tokenCookieValue = req.headers["token"];
        // console.log(tokenCookieValue);
        if(!tokenCookieValue){
           return res.status(200).json({success:false, message:"You are not Authenticated!"});
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

