
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Calendar, MapPin, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/track?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Application not found");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500 hover:bg-green-600';
      case 'rejected': return 'bg-red-500 hover:bg-red-600';
      case 'under_review': return 'bg-blue-500 hover:bg-blue-600';
      case 'waitlisted': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl text-primary mb-4">Track Your Application</h1>
          <p className="text-muted-foreground text-lg">Enter your Application ID or CNIC to check your admission status.</p>
        </div>

        <Card className="mb-12 shadow-lg border-none">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                placeholder="EU-2025-XXXX or 42201-1234567-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 text-lg"
              />
              <Button type="submit" disabled={loading} className="h-12 px-8 bg-primary hover:bg-primary/90">
                {loading ? <Loader2 className="animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                Search
              </Button>
            </form>
            {error && <p className="mt-4 text-destructive font-medium text-center">{error}</p>}
          </CardContent>
        </Card>

        {result && (
          <Card className="shadow-2xl border-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`h-2 ${getStatusColor(result.status)}`} />
            <CardHeader className="bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-headline text-primary">{result.first_name} {result.last_name}</CardTitle>
                  <CardDescription className="text-lg font-medium">{result.application_id}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(result.status)} text-white text-sm px-4 py-1 uppercase tracking-widest`}>
                  {result.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 bg-white pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full text-primary"><GraduationCap size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Program</p>
                    <p className="font-semibold">{result.program} ({result.faculty})</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full text-primary"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Submitted Date</p>
                    <p className="font-semibold">{format(new Date(result.created_at), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
              </div>

              {result.remarks && (
                <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> Reviewer Remarks
                  </h4>
                  <p className="text-blue-800">{result.remarks}</p>
                </div>
              )}

              <div className="pt-6 border-t">
                <h4 className="font-bold text-primary uppercase text-sm mb-4">Application History</h4>
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-muted">
                  <div className="relative flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-white shrink-0 z-10">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="font-bold">Application Received</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(result.created_at), 'PPp')}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-6 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground ring-8 ring-white shrink-0 z-10">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold">Merit Evaluation</p>
                      <p className="text-sm">In progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function CheckCircle2({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
