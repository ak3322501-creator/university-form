
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: "Query parameter required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('applicants')
      .select('application_id, first_name, last_name, status, faculty, program, created_at, updated_at, remarks')
      .or(`application_id.eq.${query},cnic.eq.${query}`)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "No application found with these details" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
