const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  categoryStrId: {
    type:String
  },
  name:{
    type:String,
  },
  templateStrId: {
    type:String
  }
});
module.exports = mongoose.model('Category', schema);
