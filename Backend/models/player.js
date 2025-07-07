const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },    
  name: { type: String },                                   
  email: { type: String, unique: true, sparse: true },      
  gender: { type: String, enum: ['male', 'female', 'other'] },  
  createdAt: { type: Date, default: Date.now }              
});

mongoose.model("Player", playerSchema);
module.exports = mongoose.model("Player", playerSchema);
