const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
// const {checkSchema  } = require('express-validator');

const dotenv=require('dotenv');
dotenv.config();

const { User } = require('../schema/user.schema');

//register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // const result = await checkSchema({
  //   email: { isEmail: true, errorMessage: 'Must be a valid e-mail address' },
  //   password: { isLength: { options: { min: 8 } },errorMessage: 'password must be 8 character long' },
  // }).run(req);

  // if (!result.isEmpty) {
  //   console.log('Failed validation');
  //   return res.status(400).json({message:result.map(err=>err.context.message).join(', ')});
  // }



  const ifUserExists = await User.findOne({ email }); // if user exists

  if (ifUserExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  res.status(201).json({ message: "User created successfully" });
});

// get all user
router.get('/',async (req,res)=>{
  const users=await User.find().select("-password -_id");
  res.status(200).json(users);
})

//get user by email
router.get('/:email',async (req,res)=>{
  const{email}=req.params;
  const user=await User.findOne({email});
  if(!user) return res.status(404).json({message:"user not found"})
  res.status(200).json(user);
})

//login user
router.post('/login',async (req,res)=>{
  const { email, password } = req.body; 

  const user=await User.findOne({email});
  if(!user) return res.status(404).json({message:"wrong email or password"})
 
    const isPasswordMatched=await bcrypt.compare(password,user.password);

if(!isPasswordMatched) return res.status(404).json({message:"wrong password"})

  const payload={id: user._id}
  const token=jsonwebtoken.sign(payload,process.env.JWT_SECRET);
  res.status(200).json({token});

});

//
router.patch('/',async(req,res)=>{

})

module.exports = router;
