
"use client";

import { useState, useEffect } from "react";
import { StepIndicator } from "@/components/apply/StepIndicator";
import { PersonalInfoStep } from "@/components/apply/PersonalInfoStep";
import { AcademicInfoStep } from "@/components/apply/AcademicInfoStep";
import { ProgramStep } from "@/components/apply/ProgramStep";
import { DocumentsStep } from "@/components/apply/DocumentsStep";
import { DeclarationStep } from "@/components/apply/DeclarationStep";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("uni-admit-draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  const updateFormData = (data: any) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
    localStorage.setItem("uni-admit-draft", JSON.stringify(newData));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (finalData: any) => {
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...finalData }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Submission failed");

      localStorage.removeItem("uni-admit-draft");
      router.push(`/apply/success?id=${result.application_id}`);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: err.message,
      });
    }
  };

  const steps = [
    <PersonalInfoStep key="step0" data={formData.personal} onNext={(d) => { updateFormData({ personal: d }); nextStep(); }} />,
    <AcademicInfoStep key="step1" data={formData.academic} onNext={(d) => { updateFormData({ academic: d }); nextStep(); }} onBack={prevStep} />,
    <ProgramStep key="step2" data={formData.program} onNext={(d) => { updateFormData({ program: d }); nextStep(); }} onBack={prevStep} />,
    <DocumentsStep key="step3" applicantId={formData.applicantId} onNext={nextStep} onBack={prevStep} />,
    <DeclarationStep key="step4" data={formData.declaration} onSubmit={handleSubmit} onBack={prevStep} />
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl text-primary mb-2">University Admission Portal</h1>
          <p className="text-muted-foreground text-lg font-body">Step into your future today. Complete the application below.</p>
        </header>

        <StepIndicator currentStep={currentStep} />

        <Card className="p-8 shadow-xl border-none bg-white/80 backdrop-blur-sm">
          {steps[currentStep]}
        </Card>
      </div>
    </div>
  );
}
