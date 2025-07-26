const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(403).json({ message:"No Token Provided"})
        try {
            const decoded = jwt.verify(token, "your_jwt_secret_key");
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid Token" });
        }
}
module.exports=verifyToken;