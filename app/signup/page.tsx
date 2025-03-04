'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type AccountType = "individual" | "organization";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [formData, setFormData] = useState({
    investmentPreferences: {
      riskTolerance: "",
      investmentGoals: [] as string[],
      preferredMarkets: [] as string[],
    },
  });

  const updateFormData = (updatedFields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleAccountTypeSelection = (type: AccountType) => {
    setAccountType(type);
    setStep(2);
  };



  const handleInvestmentPreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Continue, almost there:", formData);
    router.push("/sign-up");
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="mt-24 space-y-6">
          <h1 className="text-4xl font-bold text-yellow-500 mb-6 text-center">Signup</h1>
          <p className="text-lg text-gray-300 mb-4 text-center">
            Select your account type:
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => handleAccountTypeSelection("individual")}
              className="text-2xl"
            >
              Individual
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAccountTypeSelection("organization")}
              className="text-2xl"
            >
              Organization
            </Button>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-yellow-500 mb-6 text-center">Investment Preferences</h1>
          <form onSubmit={handleInvestmentPreferencesSubmit} className="space-y-4">
            <div>
              <label htmlFor="riskTolerance" className="block text-yellow-500 font-semibold mb-2">
                Risk Tolerance
              </label>
              <input
                type="text"
                id="riskTolerance"
                name="riskTolerance"
                value={formData.investmentPreferences.riskTolerance}
                onChange={(e) =>
                  updateFormData({
                    investmentPreferences: {
                      ...formData.investmentPreferences,
                      riskTolerance: e.target.value,
                    },
                  })
                }
                required
                className="w-full p-3 rounded bg-gray-700 text-yellow-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Low, Medium, High"
              />
            </div>
            <div>
              <label htmlFor="investmentGoals" className="block text-yellow-500 font-semibold mb-2">
                Investment Goals
              </label>
              <input
                type="text"
                id="investmentGoals"
                name="investmentGoals"
                value={formData.investmentPreferences.investmentGoals.join(",")}
                onChange={(e) =>
                  updateFormData({
                    investmentPreferences: {
                      ...formData.investmentPreferences,
                      investmentGoals: e.target.value.split(","),
                    },
                  })
                }
                required
                className="w-full p-3 rounded bg-gray-700 text-yellow-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Separate goals with commas"
              />
            </div>
            <div>
              <label htmlFor="preferredMarkets" className="block text-yellow-500 font-semibold mb-2">
                Preferred Markets
              </label>
              <input
                type="text"
                id="preferredMarkets"
                name="preferredMarkets"
                value={formData.investmentPreferences.preferredMarkets.join(",")}
                onChange={(e) =>
                  updateFormData({
                    investmentPreferences: {
                      ...formData.investmentPreferences,
                      preferredMarkets: e.target.value.split(","),
                    },
                  })
                }
                required
                className="w-full p-3 rounded bg-gray-700 text-yellow-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Separate markets with commas"
              />
            </div>
            <Button type="submit" className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300 text-2xl">
              Submit
            </Button>
          </form>
        </div>
      );
    }
  };

  return (
    <main className="min-h-screen relative bg-[#333333]">
      <FloatingNav />
      <div className="mt-28 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto relative">
        <Card className="bg-black/20 border-yellow-400/30 p-8 lg:p-12">
          {renderStepContent()}
        </Card>
      </div>
      <Footer />
    </main>
  );
}

