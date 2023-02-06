const express = require("express");
const app = express();
const RouteRouter = express.Router();
const { UserModel } = require("../model/user.model");
const { GoldModel } = require("../model/gold.model");
const bcrypt = require("bcryptjs");
const { Authenticate } = require("../middleware/authenticate.middleware");
const { Authorization } = require("../middleware/authorization.middleware");  
const jwt = require("jsonwebtoken");
const fs = require("fs");

app.use(express.json());

RouteRouter.post("/signup", async (req, res) => {
    const {username, name, age, mob_num, role, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err,hash)=>{
        if(err){
            console.log(err);
        }else{
            const user = new UserModel({username:username, name, age, mob_num, role, password: hash});
        await user.save();
        res.send("Registered Succesfully");
        }
    })
  } catch (error) {
    console.log(error);
  }
});

RouteRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
  try {
    if(user){
        bcrypt.compare(password, user.password, (err, decoded)=>{
            if(decoded){
                const token = jwt.sign({username}, "secretKey", {expiresIn: 60});
                const refresh_token = jwt.sign({username}, "secretKey2", {expiresIn: 300});
                res.send({message: "Logged In", token:token, refresh_token:refresh_token});
            }else{
                res.send("Wrong Credentials");
            }
        })
    }else{
        res.send("No User Found");
    }
  } catch (error) {
    console.log(error);
  }
});

RouteRouter.get("/goldrate", Authenticate, async (req,res) => {
    try{
      res.send("Gold Rate Accessible");
    }catch(error){
        console.log(error);
    }
})

RouteRouter.get("/userstats",Authenticate, Authorization, async(req,res,next)=>{
  try{
    res.send("<------ User Stats Here ------>");
  }catch(err){
    console.log(err);
  }
})

RouteRouter.get("/logout",  (req,res)=>{
  const token = req.headers.authorization?.split(" ")[1];
  try{
    const blacklist = JSON.parse(fs.readFileSync("./blacklist.txt", "utf-8"));
    blacklist.push(token);
    fs.writeFileSync("./blacklist.txt", JSON.stringify(blacklist));
    res.send("Logged Out");
  }catch(err){
    console.log(err);
  }
})

RouteRouter.get("/getnewtoken", async (req,res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try{
    if(!token){
      res.send("Login Again")
    }
    jwt.verify(refresh_token, "secretKey2", (err,decoded)=>{
      if(err){
        res.send({message:"Please login first", err:err.message});
      }else{
        let user = decoded;
        const token = jwt.sign({username}, "secretKey", {expiresIn: 20});
        res.send({message:"Login Success", token});
      }
    })
  }catch(err){
    console.log(err);
  }
})

module.exports = { RouteRouter };
