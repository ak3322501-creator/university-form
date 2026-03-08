
"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Printer, Home } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center p-12 shadow-2xl border-none">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <CardHeader className="p-0 mb-6">
          <CardTitle className="font-headline text-5xl text-primary">Application Submitted!</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for applying to UniAdmit. Your application has been received successfully and is currently under initial review.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-2xl mb-12 border border-primary/10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">Your Application ID</p>
            <p className="text-4xl font-headline text-primary font-bold">{id || 'EU-2025-XXXX'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/track">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                Track Status <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="h-12 border-2" onClick={() => window.print()}>
              Print Receipt <Printer className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Link href="/">
            <Button variant="link" className="mt-8 text-muted-foreground">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
