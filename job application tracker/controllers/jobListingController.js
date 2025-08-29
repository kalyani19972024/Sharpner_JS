
const JobListing = require("../models/JobListing");
const Company=require("../models/Company");

// Create job listing
exports.createListing = async (req, res) => {
  try {
    // const { title, description, url, deadline, CompanyId } = req.body;
    // const listing = await JobListing.create({
    //   title,
    //   description,
    //   url,
    //   deadline,
    //   CompanyId,
    //   UserId: req.user.id
    // });
    // res.json(listing);
    const { companyName, jobTitle, jobLink, notes } = req.body;
    const listing = await JobListing.create({
      title: jobTitle,
      description: notes,
      url: jobLink,
      companyName: companyName,   // optional: only if you add field
      UserId: req.user.id
    });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all saved job listings for user
exports.getListings = async (req, res) => {
  try {
    const listings = await JobListing.findAll({
      where: { UserId: req.user.id }
      // include: [Company]
    });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Convert listing to job application
exports.applyListing = async (req, res) => {
  try {
    const listing = await JobListing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    listing.status = "Applied";
    await listing.save();

    res.json({ message: "Listing marked as Applied", listing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await JobListing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    await listing.destroy();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
