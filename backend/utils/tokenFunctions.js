const jwt= require("jsonwebtoken")
const crypto= require("crypto")

///function for generating the token
const generateToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
}


///function for hshing the token
const hashToken= (token)=>{
    return crypto.createHash("sha256").update(token.toString()).digest("hex")
}

module.exports= {generateToken, hashToken}