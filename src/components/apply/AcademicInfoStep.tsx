
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicInfoSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AcademicInfoStep({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: data || {
      qualification: "",
      board_institute: "",
      passing_year: 2024,
      total_marks: 1100,
      obtained_marks: 0,
      result_status: "Pass",
      roll_number: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Qualification</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Matric / O-Level">Matric / O-Level</SelectItem>
                    <SelectItem value="FSc (Pre-Medical)">FSc (Pre-Medical)</SelectItem>
                    <SelectItem value="FSc (Pre-Engineering)">FSc (Pre-Engineering)</SelectItem>
                    <SelectItem value="ICS">ICS</SelectItem>
                    <SelectItem value="I.Com">I.Com</SelectItem>
                    <SelectItem value="A-Level">A-Level</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="board_institute"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board / Institute Name</FormLabel>
                <FormControl><Input placeholder="BIEK Karachi" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passing_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passing Year</FormLabel>
                <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roll_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number / Seat Number</FormLabel>
                <FormControl><Input placeholder="123456" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="total_marks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Marks</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="obtained_marks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Obtained Marks</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="result_status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Result Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-8"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="Pass" /></FormControl>
                    <FormLabel className="font-normal">Result Declared (Pass)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="Awaiting" /></FormControl>
                    <FormLabel className="font-normal">Awaiting Result</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="h-12 px-8">Back</Button>
          <Button type="submit" className="px-12 bg-primary hover:bg-primary/90 text-white font-bold h-12">Next: Program Selection</Button>
        </div>
      </form>
    </Form>
  );
}
