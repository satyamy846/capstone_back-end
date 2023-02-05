import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";
export const auth = {
    async authenticate(req,res,next){
        try{
            let token = req.headers.authorization;
        //we got token
        if(token){
            token = token.split(' ')[1]; //first parameter we right bearer so we extract the token by using index
            //verify the existing token
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id; //we will use this id to fetch the details
        }
        
        else{
            //we did not get the token
            res.status(401).json({message:"Unauthorized user token not found"});
            return;
        }
        next();
        }
        catch(err){
            console.log(err);
            res.status(401).json({message:"Unauthorized user wrong token"});
            return;
        }
    }
}