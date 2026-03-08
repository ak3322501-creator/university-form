
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateApplicationId } from "@/lib/generate-app-id";
import { admissionFormSchema } from "@/lib/validations";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate with Zod
    const validated = admissionFormSchema.parse(body);
    
    // Check for existing CNIC/Email
    const { data: existing } = await supabaseAdmin
      .from('applicants')
      .select('id')
      .or(`cnic.eq.${validated.personal.cnic},email.eq.${validated.personal.email}`)
      .single();

    if (existing) {
      return NextResponse.json({ error: "CNIC or Email already registered" }, { status: 400 });
    }

    const appId = generateApplicationId();
    const percentage = validated.academic.total_marks 
      ? (validated.academic.obtained_marks / validated.academic.total_marks) * 100 
      : 0;

    const { data, error } = await supabaseAdmin
      .from('applicants')
      .insert({
        application_id: appId,
        ...validated.personal,
        ...validated.academic,
        ...validated.program,
        ...validated.declaration,
        percentage,
        status: 'submitted'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      application_id: appId, 
      id: data.id 
    });

  } catch (err: any) {
    console.error("Submission API Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
