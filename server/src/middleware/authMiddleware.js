import jwt from "jsonwebtoken"

export function authenticateUser(req, res, next){
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
        console.error("No authorizationHeader received!")
        res.status(401).json({
            message: "Authentication failure!"
        })
        return
    }

    const signedToken = authorizationHeader.split(' ')[1]

    if(!signedToken){
        console.error("No authorizationHeader received!")
        res.status(401).json({
            message: "Authentication failure!"
        })
        return
    }

    const secretKey = process.env.JWT_SECRET

    if(!secretKey){
        console.error("No JWT Secret key received!")
        res.status(500).json({
            message: "Internal server error"
        })
        return
    }
    
    try{
        const decodedPayload = jwt.verify(signedToken, secretKey)
        req.user = decodedPayload
        next()
    }
    catch(error){
        console.error(error)
        res.status(401).json({
            message: "Authentication failure!"
        })
        return
    }    
}       