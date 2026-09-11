import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Field =
  | { id: string; label: string; type: "text"; placeholder?: string }
  | { id: string; label: string; type: "textarea"; placeholder?: string }
  | { id: string; label: string; type: "select"; options: string[] }
  | { id: string; label: string; type: "multi"; options: string[]; max?: number };

type Step = {
  id: string;
  title: string;
  description: string;
  fields: Field[];
};

/* ------------------------------------------------------------------ */
/*  Role picker options                                                */
/* ------------------------------------------------------------------ */

const roles = [
  {
    id: "business",
    label: "Business Owner",
    description: "I run or own a business",
    icon: Building2,
  },
  {
    id: "customer",
    label: "Customer",
    description: "I'm here to explore and use services",
    icon: User,
  },
];

/* ------------------------------------------------------------------ */
/*  Shared "About you" step (used by both roles)                       */
/* ------------------------------------------------------------------ */

const aboutYouStep: Step = {
  id: "aboutYou",
  title: "About you",
  description: "A few quick details so we can get to know you.",
  fields: [
    {
      id: "mobileNo",
      label: "Mobile number",
      type: "text",
      placeholder: "+27 82 123 4567",
    },
    {
      id: "ageRange",
      label: "Age range",
      type: "select",
      options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"],
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "City, Country",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Business steps                                                     */
/* ------------------------------------------------------------------ */

const businessSteps: Step[] = [
  aboutYouStep,
  {
    id: "yourBusiness",
    title: "Your business",
    description: "Tell us about what you do.",
    fields: [
      {
        id: "businessName",
        label: "What is the name of your business?",
        type: "text",
        placeholder: "e.g. Blaq Studio",
      },
      {
        id: "businessType",
        label: "What type of business do you run?",
        type: "text",
        placeholder: "e.g. fashion, tech, services",
      },
      {
        id: "moreBusinesses",
        label: "Do you own more than one business?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "businessRegStatus",
        label: "What is your business registration status?",
        type: "select",
        options: ["Registered", "In progress", "Not registered"],
      },
      {
        id: "businessExp",
        label: "How long have you been running your business?",
        type: "select",
        options: ["Less than 1 year", "1–2 years", "3–5 years", "5+ years"],
      },
    ],
  },
  {
    id: "businessActivity",
    title: "Business activity",
    description: "A little about how your business runs month to month.",
    fields: [
      {
        id: "payingClientsPM",
        label: "How many paying clients do you serve per month?",
        type: "select",
        options: ["0–5", "6–15", "16–30", "31–50", "50+"],
      },
      {
        id: "clientExpectedPayment",
        label: "What is the average payment you expect from a client?",
        type: "select",
        options: ["Under R500", "R500–R2k", "R2k–R10k", "R10k–R50k", "R50k+"],
      },
      {
        id: "monthlyBusinessSpending",
        label: "What is your average monthly business spending?",
        type: "select",
        options: ["Under R1k", "R1k–R5k", "R5k–R20k", "R20k+"],
      },
    ],
  },
  {
    id: "howYouOperate",
    title: "How do you operate",
    description: "Where you work and what you already use.",
    fields: [
      {
        id: "workFrom",
        label: "Where do you usually work from?",
        type: "select",
        options: ["Home", "Office", "Shared space", "Other"],
      },
      {
        id: "blaqFacilities",
        label: "Which facilities or resources from Blaq do you currently use?",
        type: "multi",
        options: [
          "Coworking space",
          "Meeting rooms",
          "Wi-Fi & internet",
          "Printing",
          "Event space",
          "None",
        ],
      },
    ],
  },
  {
    id: "resourcesAndChallenges",
    title: "Resources & challenges",
    description: "What you need, and what's holding you back.",
    fields: [
      {
        id: "resourcesToUse",
        label: "Which resources would you like to use from Blaq? (choose up to 3)",
        type: "multi",
        max: 3,
        options: [
          "Mentorship",
          "Funding support",
          "Networking events",
          "Marketing help",
          "Legal & compliance",
          "Workspace",
          "Training & workshops",
        ],
      },
      {
        id: "setBacks",
        label:
          "What setbacks or challenges are you currently facing in your business?",
        type: "textarea",
        placeholder: "Tell us a bit about what's getting in the way…",
      },
    ],
  },
  {
    id: "accessingBlaq",
    title: "Accessing Blaq",
    description: "How you'd like to work with us.",
    fields: [
      {
        id: "howToAccessBlaq",
        label: "How do you plan to access Blaq services?",
        type: "select",
        options: ["In person", "Online", "Both"],
      },
      {
        id: "interestedInBlaq",
        label: "Are you interested in joining Blaq?",
        type: "select",
        options: ["Yes, definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    id: "goals",
    title: "Your business goals",
    description: "What you're working towards.",
    fields: [
      {
        id: "targetBusinessGoal",
        label: "What is your main business goal for the next year?",
        type: "select",
        options: [
          "Grow revenue",
          "Launch a new product",
          "Expand my team",
          "Reach more customers",
          "Build a stronger brand",
        ],
      },
      {
        id: "businessSocialMediaLink",
        label: "Please share a link to your business's social media page.",
        type: "text",
        placeholder: "https://instagram.com/yourbusiness",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Customer steps                                                     */
/* ------------------------------------------------------------------ */

const customerSteps: Step[] = [aboutYouStep];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function OnboardingPage() {
  // "business" | "customer" | null
  const [role, setRole] = useState<"business" | "customer" | null>(null);

  // Which question step we're on (review = questionSteps.length)
  const [currentStep, setCurrentStep] = useState(0);

  // Every answer stored in one flat object
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});

  // Success screen
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  // Pick steps based on role
  const questionSteps = role === "customer" ? customerSteps : businessSteps;
  const totalSteps = questionSteps.length + 1; // +1 for review
  const isReview = currentStep === questionSteps.length;
  const step = questionSteps[currentStep]; // undefined on review

  const progress = isReview ? 100 : ((currentStep + 1) / totalSteps) * 100;

  /* ---------------- Helpers ---------------- */

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMulti(id: string, option: string, max?: number) {
    setFormData((prev) => {
      const current = (prev[id] as string[]) ?? [];
      if (current.includes(option)) {
        return { ...prev, [id]: current.filter((o) => o !== option) };
      }
      if (max && current.length >= max) return prev;
      return { ...prev, [id]: [...current, option] };
    });
  }

  /* ---------------- Navigation ---------------- */

  function goNext() {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  }

  function goBack() {
    if (currentStep === 0) {
      // Go back to role selection
      setRole(null);
      setFormData({});
      return;
    }
    setCurrentStep(currentStep - 1);
  }

  function handleSubmit() {
    // Everything submits at once here
    console.log("Onboarding submitted:", { role, ...formData });
    setSubmitted(true);
  }

  /* ================================================================ */
  /*  Screen 1: Role picker                                           */
  /* ================================================================ */

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex justify-center">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gray-900 text-base font-bold text-white">
                B
              </div>
            </div>

            <h1 className="mt-5 text-center text-2xl font-semibold text-gray-900">
              What can we call you?
            </h1>
            <p className="mt-1 text-center text-sm text-gray-500">
              Pick the option that fits you best.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as "business" | "customer")}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-gray-900 hover:bg-gray-50"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gray-100 text-gray-700 transition group-hover:bg-gray-900 group-hover:text-white">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    {r.label}
                  </span>
                  <span className="text-sm text-gray-500">{r.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Screen 2: Success                                               */
  /* ================================================================ */

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-gray-900" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-gray-900">
            You're all set!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Thanks for sharing. Your dashboard is ready.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Screen 3: Steps + Review                                        */
  /* ================================================================ */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gray-900 text-sm font-bold text-white">
              B
            </div>
            <span className="text-xs font-medium text-gray-500">
              {isReview
                ? "Review"
                : `Step ${currentStep + 1} of ${questionSteps.length}`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Body */}
          <div className="mt-8">
            {!isReview && step ? (
              /* ---------- Question step ---------- */
              <>
                <h1 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>

                <div className="mt-6 space-y-5">
                  {step.fields.map((field) => (
                    <div key={field.id}>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>

                      {/* Text input */}
                      {field.type === "text" && (
                        <input
                          type="text"
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                        />
                      )}

                      {/* Textarea */}
                      {field.type === "textarea" && (
                        <textarea
                          rows={3}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                        />
                      )}

                      {/* Single select (pill buttons) */}
                      {field.type === "select" && (
                        <div className="flex flex-wrap gap-2">
                          {field.options.map((option) => {
                            const selected = formData[field.id] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => updateField(field.id, option)}
                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                  selected
                                    ? "border-gray-900 bg-gray-900 text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Multi select (checkmark cards) */}
                      {field.type === "multi" && (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {field.options.map((option) => {
                            const current =
                              (formData[field.id] as string[]) ?? [];
                            const selected = current.includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  toggleMulti(field.id, option, field.max)
                                }
                                className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                                  selected
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                <span className="text-sm font-medium text-gray-900">
                                  {option}
                                </span>
                                <span
                                  className={`grid h-5 w-5 place-items-center rounded-full border transition ${
                                    selected
                                      ? "border-gray-900 bg-gray-900"
                                      : "border-gray-300 bg-white"
                                  }`}
                                >
                                  {selected && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* ---------- Review step ---------- */
              <>
                <h1 className="text-xl font-semibold text-gray-900">
                  Review your answers
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Make sure everything looks right before submitting.
                </p>

                <div className="mt-6 space-y-4">
                  {questionSteps.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <p className="text-sm font-semibold text-gray-900">
                        {s.title}
                      </p>
                      <dl className="mt-3 space-y-2">
                        {s.fields.map((field) => {
                          const value = formData[field.id];
                          let display: string;

                          if (Array.isArray(value)) {
                            display = value.length ? value.join(", ") : "—";
                          } else if (!value) {
                            display = "—";
                          } else {
                            display = value;
                          }

                          return (
                            <div
                              key={field.id}
                              className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                            >
                              <dt className="text-xs text-gray-500 sm:max-w-[60%]">
                                {field.label}
                              </dt>
                              <dd className="text-sm font-medium text-gray-900 sm:text-right">
                                {display}
                              </dd>
                            </div>
                          );
                        })}
                      </dl>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {!isReview ? (
              <button
                type="button"
                onClick={goNext}
                className="flex h-10 items-center gap-1.5 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex h-10 items-center gap-1.5 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Submit
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;