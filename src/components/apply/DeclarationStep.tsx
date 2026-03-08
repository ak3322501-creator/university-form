
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { declarationSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeclarationStep({ data, onSubmit, onBack }: { data: any; onSubmit: (data: any) => Promise<void>; onBack: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(declarationSchema),
    defaultValues: data || {
      signature_name: "",
      signature_date: new Date().toISOString().split('T')[0],
      declaration_agreed: false,
      confirm_info: false,
      confirm_original: false,
    },
  });

  const handleFinalSubmit = async (data: any) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFinalSubmit)} className="space-y-8">
        <div className="p-6 bg-muted/30 rounded-2xl border border-dashed border-primary/20">
          <h3 className="font-headline text-2xl text-primary mb-4">Declaration</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I hereby solemnly declare that the information provided in this application is true and correct to the best of my knowledge and belief. I understand that any false information or omission will lead to the cancellation of my admission at any stage. I agree to abide by the rules and regulations of the university.
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="declaration_agreed"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-medium">I have read and agree to the declaration above.</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_info"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-medium">I confirm that all uploaded documents are authentic.</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_original"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-medium">I will present original documents upon request.</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="signature_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (Signature)</FormLabel>
                <FormControl><Input placeholder="Type your full name" {...field} className="font-headline text-lg italic" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signature_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl><Input type="date" {...field} disabled /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-8 border-t">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="h-12 px-8">Back</Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="px-16 bg-accent hover:bg-accent/90 text-white font-bold h-12 text-lg rounded-full"
          >
            {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
