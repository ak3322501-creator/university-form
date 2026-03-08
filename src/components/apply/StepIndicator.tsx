
import { cn } from "@/lib/utils";
import { User, BookOpen, GraduationCap, FileText, CheckCircle2 } from "lucide-react";

const steps = [
  { name: "Personal", icon: User },
  { name: "Academic", icon: BookOpen },
  { name: "Program", icon: GraduationCap },
  { name: "Documents", icon: FileText },
  { name: "Confirm", icon: CheckCircle2 },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-12">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isActive = idx <= currentStep;
        const isCurrent = idx === currentStep;

        return (
          <div key={step.name} className="flex flex-col items-center relative flex-1">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground",
                isCurrent && "ring-4 ring-accent ring-offset-2"
              )}
            >
              <Icon size={20} />
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-semibold uppercase tracking-wider",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "absolute h-[2px] w-full top-6 left-1/2 -z-0",
                  idx < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
