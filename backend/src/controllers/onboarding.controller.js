import User from "../models/user.model.js";
import Onboarding from "../models/onboarding.model.js";

export const completeBusinessOnboarding = async (req, res) => {
  try {
    const user = req.user._id;

    const {
      businessName,
      businessType,
      moreBusinesses,
      businessRegStatus,
      businessExp,
      PayingClientsPM,
      ClientExpectedPayment,
      MontlyBusinessSpending,
      workFrom,
      blaqFacilities,
      resourcesToUse,
      setBacks,
      howToAccessBlaq,
      interestedInBlaq,
      targetBusinessGoal,
      businessSocialMediaLink,
    } = req.body;

    if (resourcesToUse && resourcesToUse.length > 3) {
      return res
        .status(400)
        .json({ message: "You can select a maximum of 3 resources." });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingOnboarding = await Onboarding.findOne({ user });
    if (existingOnboarding) {
      return res.status(400).json({ message: "Onboarding already completed" });
    }

    const onboarding = await Onboarding.create({
      user,
      businessName,
      businessType,
      moreBusinesses,
      businessRegStatus,
      businessExp,
      PayingClientsPM,
      ClientExpectedPayment,
      MontlyBusinessSpending,
      workFrom,
      blaqFacilities,
      resourcesToUse,
      setBacks,
      howToAccessBlaq,
      interestedInBlaq,
      targetBusinessGoal,
      businessSocialMediaLink,
      businessCompleted: true,
    });

    existingUser.role = "business";

    await existingUser.save();

    res.status(201).json({
      message: "Onboarding completed successfully",
      onboarding,
    });
  } catch (error) {
    console.log("Error in completeBusinessOnboarding controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const completeProfileOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNo, location, ageRange } = req.body;

    if (!mobileNo || !location || !ageRange)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.mobileNo = mobileNo;
    user.location = location;
    user.ageRange = ageRange;
    user.onBoarded = true;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    console.log("Error in completeProfileOnboarding controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
