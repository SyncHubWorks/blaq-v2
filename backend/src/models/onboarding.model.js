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
      default: "",
    },
    businessType: {
      type: String,
      default: "",
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
      default: "",
    },

    // BUSINESS ACTIVITY
    PayingClientsPM: {
      type: String,
      default: "",
    },
    ClientExpectedPayment: {
      type: String,
      default: "",
    },
    MontlyBusinessSpending: {
      type: String,
      default: "",
    },

    // BUSINESS OPERATION
    workFrom: {
      type: String,
      default: "",
    },
    blaqFacilities: {
      type: String,
      default: "",
    },

    // BLAQ RESOURCES
    resourcesToUse: {
      type: [String],
      default: [],
    },
    setBacks: {
      type: [String],
      default: [],
    },

    // BLACK ACCESS
    howToAccessBlaq: {
      type: String,
      default: "",
    },
    interestedInBlaq: {
      type: Boolean,
      default: true,
    },

    // USER GOAL
    targetBusinessGoal: {
      type: String,
      default: "",
    },
    businessSocialMediaLink: {
      type: String,
      default: "",
    },
    businessCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Onboarding = mongoose.model("Onboarding", onboardigSchema);

export default Onboarding;
