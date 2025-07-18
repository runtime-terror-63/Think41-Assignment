const mongoose = require('mongoose');
const ChoiceSchema = new mongoose.Schema({
  choiceStrId:{
    type:String
  },
  name:{
    type:String,
    required:true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  rank:{
    type:Number,
    default:0
  }, //ranking system
  categoryStrId: String, 
  templateStrId: String
});

module.exports = mongoose.model('Choice', ChoiceSchema);
