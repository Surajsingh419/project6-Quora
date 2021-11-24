const userModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')



 const createUser= async function (req, res) {
    try{
      let userdetails = req.body
      let userCreated= await userModel.create(userdetails)
      res.status(201).send({ status:true, data: userCreated}); 
    } catch (error) {
        res.status(500).send({ status: false, message: error.message});
    }  
 }; 

const login = async function (req, res) {
    try {
        userName = req.body.name
        userPassword = req.body.password
    
        let user = await userModel.findOne({ name: userName, password: userPassword, isDeleted: false })
        if (user) {
            const generatedToken = jwt.sign({ userId: user._id }, "Radium")
            res.status(200).send({ status: true, data: user._id, token: generatedToken })
        } else {
            res.status(400).send({ status: false, message: 'Invalid credentials' })
        }
    } catch(error){
        res.send(500).send({status:false, message:error.message})
        }
}


const getDetails = async function (req, res) {
    try {
        let userId = req.params.userId
        let decodedUserToken = req.user;
        if (userId == decodedUserToken.userId) {
            let userDetails = await userModel.findOne({ _id: userId, isDeleted: false });
        if (userDetails) {
            res.status(200).send({ status: true, data: userDetails })
        } else {
            res.status(404).send({ status: false, message: 'User not found' })
        }
     
}
else res.status(403).send({ status: false, message: "Prohibited as maybe trying to access a different user's account" })
  }  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateEmail = async function (req, res) {
    try {
        let userId = req.params.userId
        let emailId = req.body.email
        let decodedUserToken = req.user;
      if (userId == decodedUserToken.userId) {
         let userDetails = await userModel.findOneAndUpdate({ "_id": userId }, { "emailId": emailId }, { new: true })
    
          if (user) {
            res.status(200).send({ status: true, data: userDetails })
        } else {
            res.status(404).send({ status: false, message: 'User not found' })
        }
    } else res.status.send({ status: false, message: "Prohibited as maybe trying to access a different user's account", });
} catch (error) {
    res.send(500).send({ status: false, message: error.message })
}
};



module.exports.createUser = createUser
module.exports.login = login
module.exports.getDetails = getDetails
module.exports.updateEmail = updateEmail

