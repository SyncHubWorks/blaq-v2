export interface IProfileOnboarding {
  mobileNo: string;
  location: string;
  ageRange: string;
}

export interface IBusinessOnboarding {
  businessName: string;
  businessType: string;
  moreBusinesses: boolean;
  businessRegStatus:
    | "registration in progress"
    | "registered"
    | "not registered";
  businessExp: string;
  PayingClientsPM: string;
  ClientExpectedPayment: string;
  MontlyBusinessSpending: string;
  workFrom: string;
  blaqFacilities: string;
  resourcesToUse: string[];
  setBacks: string[];
  howToAccessBlaq: string;
  interestedInBlaq: boolean;
  targetBusinessGoal: string;
  businessSocialMediaLink: string;
}
