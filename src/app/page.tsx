
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Search, FileCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://picsum.photos/seed/univ1/1920/1080" 
              alt="University Campus" 
              className="w-full h-full object-cover"
              data-ai-hint="university campus"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="font-headline text-6xl md:text-8xl text-white mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
              Your Journey <br /> Starts Here
            </h1>
            <p className="text-white/80 text-xl md:text-2xl mb-12 font-body max-w-2xl mx-auto">
              UniAdmit Flow simplifies your path to higher education. Apply to our world-class programs in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/apply">
                <Button size="lg" className="h-14 px-10 text-lg bg-accent hover:bg-accent/90 text-white font-bold rounded-full group">
                  Apply for Admission
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/track">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-white text-white hover:bg-white/10 font-bold rounded-full">
                  Track Application
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-8 rounded-3xl hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap size={32} />
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4">Elite Programs</h3>
                <p className="text-muted-foreground">Access a wide range of undergraduate and graduate programs tailored for your career.</p>
              </div>
              <div className="text-center p-8 rounded-3xl hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search size={32} />
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4">Transparent Tracking</h3>
                <p className="text-muted-foreground">Keep tabs on your application status in real-time with our secure tracking system.</p>
              </div>
              <div className="text-center p-8 rounded-3xl hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileCheck size={32} />
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4">Fast Processing</h3>
                <p className="text-muted-foreground">Our digital-first approach ensures your application moves through review swiftly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-12 text-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-headline text-3xl text-white mb-6">UniAdmit Flow</div>
          <p className="mb-8">Empowering the next generation of leaders through seamless admissions.</p>
          <div className="pt-8 border-t border-white/10 text-sm">
            © {new Date().getFullYear()} UniAdmit Flow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
