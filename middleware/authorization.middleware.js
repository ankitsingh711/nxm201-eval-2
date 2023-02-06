const Authorization = (req,res,next) => {
    const role = req.params.role;
    console.log(role);
    try{
        if(role=="manager"){
            next();
        }else{
            res.send("Nobody can access except manager");
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = { Authorization };