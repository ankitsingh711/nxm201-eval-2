const jwt = require("jsonwebtoken");

const Authenticate = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try{
        if(token){
            jwt.verify(token, "secretKey", (err, decoded)=>{
                if(decoded){
                    next();
                }else{
                    res.send("Not Authorized");
                }
            })
        }else{
            res.send("Login First");
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = { Authenticate }