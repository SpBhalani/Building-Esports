const { signUpSchema , signInSchema } = require('./index');
const signInValidate = async (req,res,next) => {
    try{
        const  value = await signInSchema.validateAsync(req.body);
        // console.log(value);
    }
    catch(e){
        return res.status(400).json({message : e.details[0].message});
    } 
next();
}
const signUpValidate = async (req,res,next) => {
    try{
        const  value  = await signUpSchema.validateAsync(req.body);
        // console.log(value);
    }
    catch(e){
        return res.status(400).json({message : e.details[0].message});
    }   
next();
}

module.exports ={
    signInValidate,
    signUpValidate
}