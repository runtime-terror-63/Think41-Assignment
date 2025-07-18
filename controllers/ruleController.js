const CompatibilityRule = require('../models/CompatibilityRule');

// Add  compatibility rule
exports.addRule = async (req, res) => {
  try {
    const { templateStrId, ruleType, primaryChoiceStrId, secondaryChoiceStrId } = req.body;

    const rule = await CompatibilityRule.create({
      templateStrId,
      ruleType,
      primaryChoiceStrId,
      secondaryChoiceStrId
    });

    res.status(201).json(rule);
  } catch (err) {
    console.error('Error adding rule:', err);
    res.status(500).json({ message: 'Failed to add rule', error: err.message });
  }
};

// Get rules for a template
exports.getRulesForTemplate = async (req, res) => {
  try {
    const { templateStrId } = req.params;
    const rules = await CompatibilityRule.find({ templateStrId });
    res.json(rules);
  } catch (err) {
    console.error('Error fetching rules:', err);
    res.status(500).json({ message: 'Failed to fetch rules', error: err.message });
  }
};
