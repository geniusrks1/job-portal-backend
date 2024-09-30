const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


const authMiddleware = (req, res, next) => {
  // const token = req.headers.Authorization;
  const authHeader = req.headers['authorization'];  
  if (!authHeader) return res.status(401).json({ message: "No token provided header checked" });
  
  const token = authHeader.split(' ')[1]; // Expecting 'Bearer <token>'
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };
