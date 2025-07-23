const Donation = require("../model/Donation");

exports.getUserImpact = async (req, res) => {
  const userId = req.params.userId;

  try {
    const donations = await Donation.find({ userId });

    let totalKg = 0;
    donations.forEach(d => totalKg += d.quantity);

    const impact = {
      totalDonations: donations.length,
      totalKg,
      totalMeals: totalKg * 2.5,
      totalWaterSaved: totalKg * 1500,     // in Liters
      totalCarbonSaved: totalKg * 2.5,
    };

    res.json(impact);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate impact" });
  }
};
