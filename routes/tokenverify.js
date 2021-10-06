const jwt=require('jsonwebtoken')

function auth(req,res,next){
    const token=req.header('auth-token')
    if (!token) return res.status(400).send('Denied')

    try{
        const verify=jwt.verify(token,process.env.Secret_Token)
        req.user=verified;
    }catch(err){
        res.status(400).send('Invalid Token')

    }
}