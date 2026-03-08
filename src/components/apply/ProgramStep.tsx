
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { programSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const faculties = {
  "Sciences": ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"],
  "Engineering": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Software Engineering"],
  "Arts & Social Sciences": ["English Literature", "Psychology", "Sociology", "History"],
  "Business & Commerce": ["BBA", "B.Com", "Accounting & Finance"]
};

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "English", "Urdu", "Economics", "Statistics", "History", "Geography", "Islamic Studies"
];

export function ProgramStep({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: data || {
      faculty: "",
      program: "",
      study_mode: "Morning",
      admission_type: "Regular",
      selected_subjects: [],
      emergency_contact_name: "",
      emergency_contact_phone: "",
    },
  });

  const watchFaculty = form.watch("faculty");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Faculty" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(faculties).map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchFaculty}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Program" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(faculties[watchFaculty as keyof typeof faculties] || []).map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="study_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study Mode</FormLabel>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="Morning" /><FormLabel>Morning</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="Evening" /><FormLabel>Evening</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admission_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Type</FormLabel>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="Regular" /><FormLabel>Regular</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="Self Finance" /><FormLabel>Self Finance</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormLabel>Select Subjects (Minimum 3)</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map(subject => (
              <FormField
                key={subject}
                control={form.control}
                name="selected_subjects"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-xl hover:bg-muted/50 cursor-pointer transition-colors">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(subject)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, subject])
                              : field.onChange(field.value?.filter((value: string) => value !== subject))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        {subject}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <FormField
            control={form.control}
            name="emergency_contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl><Input placeholder="Guardian Name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergency_contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Phone</FormLabel>
                <FormControl><Input placeholder="+92 3XX XXXXXXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="h-12 px-8">Back</Button>
          <Button type="submit" className="px-12 bg-primary hover:bg-primary/90 text-white font-bold h-12">Next: Upload Documents</Button>
        </div>
      </form>
    </Form>
  );
}
