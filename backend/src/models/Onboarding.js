import mongoose from "mongoose";

const Schema = mongoose.Schema;

const onboardigSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // BUSINESS DETAILS
    businessName: {
      type: String,
    },
    businessType: {
      type: String,
    },
    moreBusinesses: {
      type: Boolean,
      default: false,
    },
    businessRegStatus: {
      type: String,
      enum: ["registration in progress", "registered", "not registered"],
      default: "not registered",
    },
    businessExp: {
      type: String,
    },

    // BUSINESS ACTIVITY
    PayingClientsPM: {
      type: String,
    },
    ClientExpectedPayment: {
      type: String,
    },
    MontlyBusinessSpending: {
      type: String,
    },

    // BUSINESS OPERATION
    workFrom: {
      type: String,
    },
    blaqFacilities: {
      type: String,
    },

    // BLAQ RESOURCES
    resourcesToUse: [
      {
        type: String,
      },
    ],
    setBacks: [
      {
        type: String,
      },
    ],

    // BLACK ACCESS
    howToAccessBlaq: {
      type: String,
    },
    interestedInBlaq: {
      type: Boolean,
      default: true,
    },

    // USER GOAL
    targetBusinessGoal: {
      type: String,
    },
    businessSocialMediaLink: {
      type: String,
    },
  },
  { timestamps: true },
);

const Onboarding = mongoose.model("Onboarding", onboardigSchema);

export default Onboarding;
