const User = require('../model/user')
const jwt = require('jsonwebtoken')

const singnUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).send(`${error} abc`);
            }
            if (user) {
                // return res.status(409).send('User Already Exists')
                return res.status(400).send('User Already Exists')
            }
            else {
                const { fName, lName, email, password } = req.body;
                const _user = new User({
                    fName,
                    lName,
                    email,
                    password,
                })
                _user.save((error, result) => {
                    if (error) return res.status(400).send("Something went wronge...While uploading");
                    if (result) return res.status(200).json(result);
                })
            }
        })

}

const signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).send("Somethng Went Wronge")
            }
            if (user) { 
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
                    res.cookie('token', token, { maxAge: 600000 });
                    res.status(200).json({ user, token });
                }
                else {
                    return res.status(401).json({message:"Invalid password"})
                }   
            }
            else {
                return res.status(404).send("User Not Found") 
            }

        })
} 

const signOut = (req, res) => {
    res.clearCookie('token');   
    res.status(200).send("Logout Successfully")
}










module.exports = {
    singnUp,
    signIn,
    signOut
}