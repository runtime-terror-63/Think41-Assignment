const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  templateStrId: String,
  ruleType: { 
    type: String, 
    enum: ['REQUIRES','INCOMPATIBLE_WITH'] 
  },
  primaryChoiceStrId: String, secondaryChoiceStrId: String
});
module.exports = mongoose.model('CompatibilityRule', schema);
