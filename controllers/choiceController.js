const Choice = require('../models/Choice');
const CompatibilityRule = require('../models/CompatibilityRule');

// Add a new choice
exports.addChoice = async (req, res) => {
  try {
    const { choiceStrId, name, price, rank, categoryStrId, templateStrId } = req.body;
    const choice = await Choice.create({ choiceStrId, name, price, rank, categoryStrId, templateStrId });
    res.status(201).json(choice);
  } catch (err) {
    console.error('Error adding choice:', err);
    res.status(500).json({ message: 'Failed to add choice', error: err.message });
  }
};

// Get available choices for a given template/category
exports.getAvailable = async (req, res) => {
  try {
    const { templateStrId, categoryStrId } = req.params;
    const selected = req.body.currentSelections || {};

    const rules = await CompatibilityRule.find({ templateStrId });
    const all = await Choice.find({ templateStrId, categoryStrId }).sort({ rank: 1 });

    const filtered = all.filter(c => {
      for (const [cat, pick] of Object.entries(selected)) {
        if (rules.find(r => r.ruleType === 'INCOMPATIBLE_WITH' &&
            r.primaryChoiceStrId === pick &&
            r.secondaryChoiceStrId === c.choiceStrId)) return false;

        const reqs = rules.filter(r => r.ruleType === 'REQUIRES' && r.primaryChoiceStrId === pick);
        if (reqs.length && !reqs.some(r => r.secondaryChoiceStrId === c.choiceStrId)) return false;
      }
      return true;
    });

    res.status(200).json(filtered);
  } catch (err) {
    console.error('Error in getAvailable:', err);
    res.status(500).json({ message: 'Failed to fetch available choices', error: err.message });
  }
};

// Validate selection and calculate price
exports.validateAndCalculate = async (req, res) => {
  try {
    const { selectedChoices } = req.body;
    let totalPrice = 0;
    const incompatible = [];

    for (let i = 0; i < selectedChoices.length; i++) {
      const choice = await Choice.findOne({ choiceStrId: selectedChoices[i] });
      if (!choice) {
        return res.status(404).json({ message: `Choice ${selectedChoices[i]} not found` });
      }
      totalPrice += choice.price;

      for (let j = i + 1; j < selectedChoices.length; j++) {
        const rule = await CompatibilityRule.findOne({
          $or: [
            { primaryChoiceStrId: selectedChoices[i], secondaryChoiceStrId: selectedChoices[j], ruleType: 'INCOMPATIBLE_WITH' },
            { primaryChoiceStrId: selectedChoices[j], secondaryChoiceStrId: selectedChoices[i], ruleType: 'INCOMPATIBLE_WITH' }
          ]
        });
        if (rule) incompatible.push([selectedChoices[i], selectedChoices[j]]);
      }
    }

    if (incompatible.length > 0) {
      return res.status(400).json({ message: 'Incompatible choices', details: incompatible });
    }

    res.json({ totalPrice });
  } catch (err) {
    console.error('Error validating selection:', err);
    res.status(500).json({ message: 'Validation failed', error: err.message });
  }
};
