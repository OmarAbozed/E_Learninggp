const jwt=require("jsonwebtoken");

function verifytoken(req,res,next)
{
    const token=req.headers.token
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRIT_KEY)
            req.instractor=decoded;
            next();
        } catch (error) {
            res.status(401).json({massage:"invaled token"})
        }
    }else{
            res.status(401).json({massage:"not proved token"})
    }
}

function verfytokenAndAuturiztion(req,res,next){
    verifytoken(req,res,()=>{
        if(req.instractor.id===req.params.id||req.instractor.IsAdmin)
        {
            next();
        }else{
            res.status(403).json({massage:"you are not allawed"})
        }
    })
    
}

function verfytokenAndAdmin(req,res,next)
{
    verifytoken(req,res,()=>{
        if(req.instractor.IsAdmin)
        {
            next();
        }
        else{
            res.status(403).json({massage:"you are not allawed ,only admin"})
        }
    })
}

module.exports={
    verifytoken,
    verfytokenAndAdmin,
    verfytokenAndAuturiztion
}