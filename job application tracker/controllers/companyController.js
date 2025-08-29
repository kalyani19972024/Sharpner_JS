const Company = require("../models/Company");

// Add new company profile
exports.createCompany = async (req, res) => {
  try {
    const { name, contactEmail, contactPhone, size, industry, notes } = req.body;
    const company = await Company.create({ name, contactEmail, contactPhone, size, industry, notes });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one company by ID
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });

    await company.update(req.body);
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });

    await company.destroy();
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
