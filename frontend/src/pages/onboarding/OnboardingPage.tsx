import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  Target,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Step data — edit this array to change the questions               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    id: "role",
    icon: User,
    title: "What best describes you?",
    description: "This helps us tailor your dashboard.",
    type: "single" as const, // only one option can be picked
    options: [
      { id: "designer", label: "Designer" },
      { id: "developer", label: "Developer" },
      { id: "founder", label: "Founder" },
      { id: "marketer", label: "Marketer" },
    ],
  },
  {
    id: "services",
    icon: Sparkles,
    title: "What services are you interested in?",
    description: "Pick as many as you like.",
    type: "multiple" as const,
    options: [
      { id: "branding", label: "Branding" },
      { id: "web-design", label: "Web design" },
      { id: "ui-ux", label: "UI / UX" },
      { id: "motion", label: "Motion graphics" },
    ],
  },
  {
    id: "goals",
    icon: Target,
    title: "What are your goals?",
    description: "Select everything that applies.",
    type: "multiple" as const,
    options: [
      { id: "launch", label: "Launch a new product" },
      { id: "rebrand", label: "Rebrand my company" },
      { id: "growth", label: "Grow my audience" },
      { id: "hire", label: "Hire a creative team" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function OnboardingPage() {
  // Which step we're on. 0, 1, 2 = questions. 3 = review.
  const [currentStep, setCurrentStep] = useState(0);

  // Stores every selection, grouped by step id.
  // Example: { role: ["designer"], services: ["branding", "ui-ux"] }
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  // Turns true after the user clicks Submit
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const isReview = currentStep === steps.length;
  const step = steps[currentStep]; // undefined on the review step

  // Whether the current step has at least one selection
  const selectedForCurrent = step ? (selections[step.id] ?? []) : [];
  const canContinue = step ? selectedForCurrent.length > 0 : true;

  // Progress bar percentage
  const progress = isReview ? 100 : ((currentStep + 1) / steps.length) * 100;

  /* ---------------- Selection handling ---------------- */

  function toggleOption(
    stepId: string,
    optionId: string,
    type: "single" | "multiple",
  ) {
    setSelections((previous) => {
      const current = previous[stepId] ?? [];

      // Single select: replace with just this option
      if (type === "single") {
        return { ...previous, [stepId]: [optionId] };
      }

      // Multiple select: add or remove
      const alreadyPicked = current.includes(optionId);
      return {
        ...previous,
        [stepId]: alreadyPicked
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  }

  function isSelected(stepId: string, optionId: string) {
    return (selections[stepId] ?? []).includes(optionId);
  }

  /* ---------------- Navigation ---------------- */

  function handleNext() {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleSubmit() {
    // Everything is submitted at once, right here
    console.log("Onboarding submitted:", selections);
    setSubmitted(true);
  }

  /* ---------------- Success screen ---------------- */

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
            Thanks for telling us about yourself. Your dashboard is ready.
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

  /* ---------------- Main onboarding view ---------------- */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header: logo + step counter + progress bar */}
          <div>
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                B
              </div>
              <span className="text-xs font-medium text-gray-500">
                {isReview
                  ? "Review"
                  : `Step ${currentStep + 1} of ${steps.length}`}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="mt-8">
            {!isReview ? (
              /* ---------- Question step ---------- */
              <>
                <div className="flex items-center gap-2">
                  <step.icon className="h-5 w-5 text-gray-400" />
                  <h1 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>

                {/* Option cards */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {step.options.map((option) => {
                    const selected = isSelected(step.id, option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          toggleOption(step.id, option.id, step.type)
                        }
                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border transition ${
                            selected
                              ? "border-gray-900 bg-gray-900"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {selected && <Check className="h-3 w-3 text-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* ---------- Review step ---------- */
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  <h1 className="text-xl font-semibold text-gray-900">
                    Review your answers
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Make sure everything looks right before submitting.
                </p>

                <div className="mt-6 space-y-4">
                  {steps.map((reviewStep) => {
                    // Get the selected labels for this step
                    const selectedIds = selections[reviewStep.id] ?? [];
                    const selectedLabels = reviewStep.options
                      .filter((option) => selectedIds.includes(option.id))
                      .map((option) => option.label);

                    return (
                      <div
                        key={reviewStep.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <reviewStep.icon className="h-4 w-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">
                            {reviewStep.title}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedLabels.length > 0 ? (
                            selectedLabels.map((label) => (
                              <span
                                key={label}
                                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200"
                              >
                                {label}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">
                              None selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 px-4 text-sm font-medium transition ${
                currentStep === 0
                  ? "cursor-not-allowed bg-gray-50 text-gray-300"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {!isReview ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className={`flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition ${
                  canContinue
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
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
