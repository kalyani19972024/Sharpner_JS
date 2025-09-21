const { Op, fn, col, literal } = require("sequelize");
const JobApplication = require("../models/jobApplication");
const Company = require("../models/Company");

exports.getDashboardData = async (req, res) => {
  try {
    console.log(" Authenticated user:", req.user);
    const userId = req.user.id;

    // 1. Total applications
    const totalApplications = await JobApplication.count({ where: { userId } });
    
       const interviews = await JobApplication.count({
      where: { userId, status: { [Op.like]: "%Interview%" } }
    });

    const offers = await JobApplication.count({
      where: { userId, status: { [Op.like]: "%Offer%" } }
    });

    const rejections = await JobApplication.count({
      where: { userId, status: { [Op.like]: "%Reject%" } }
    });

    // 2. Applications by status
    const statusCounts = await JobApplication.findAll({
      attributes: ["status", [fn("COUNT", col("status")), "count"]],
      where: { userId },
      group: ["status"],
    });

    // 3. Response rate (Interviewed + Offered / Total)
    const positiveResponses = await JobApplication.count({
      where: {
        userId,
        status: { [Op.in]: ["Interviewed", "Offered"] }, // ✅ treat these as "responded"
      },
    });

    const responseRate =
      totalApplications > 0
        ? ((positiveResponses / totalApplications) * 100).toFixed(1)
        : 0;

    // 4. Weekly applications trend (last 6 weeks)
    const weeklyTrend = await JobApplication.findAll({
      attributes: [
        [fn("YEARWEEK", col("createdAt")), "week"],
        [fn("COUNT", col("id")), "count"],
      ],
      where: { userId },
      group: [literal("YEARWEEK(createdAt)")],
      order: [literal("YEARWEEK(createdAt) ASC")],
      limit: 6,
    });

    // 5. Recent applications with company info
    const recentApplications = await JobApplication.findAll({
      where: { userId },
      include: [{ model: Company, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    // ✅ send clean JSON response
    res.json({
      totalApplications,
      interviews,
      offers,
      rejections,
      statusCounts,
      responseRate,      // percentage (e.g., 45.5)
      weeklyTrend,       // timeline data
      recentApplications,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};
