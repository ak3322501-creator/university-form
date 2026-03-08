
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, FileText, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const requiredDocs = [
  { id: 'cnic_copy', name: 'CNIC Copy / B-Form' },
  { id: 'matric_cert', name: 'Matric Certificate' },
  { id: 'fsc_cert', name: 'Inter / FSc Certificate' },
  { id: 'domicile', name: 'Domicile Certificate' },
  { id: 'photo', name: 'Passport Sized Photo' },
  { id: 'challan', name: 'Paid Fee Receipt' },
];

export function DocumentsStep({ onNext, onBack }: { applicantId: string; onNext: () => void; onBack: () => void }) {
  const [uploads, setUploads] = useState<Record<string, { progress: number, url?: string, name?: string }>>({});
  const { toast } = useToast();

  const handleUpload = async (docId: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "File too large", description: "Max size is 5MB" });
      return;
    }

    setUploads(prev => ({ ...prev, [docId]: { progress: 10 } }));

    // Simulating upload for demo - in real app would POST to /api/upload
    let p = 10;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        clearInterval(interval);
        setUploads(prev => ({ ...prev, [docId]: { progress: 100, name: file.name, url: URL.createObjectURL(file) } }));
      } else {
        setUploads(prev => ({ ...prev, [docId]: { progress: p } }));
      }
    }, 100);
  };

  const isAllUploaded = requiredDocs.every(doc => uploads[doc.id]?.progress === 100);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requiredDocs.map(doc => {
          const upload = uploads[doc.id];
          return (
            <div key={doc.id} className="p-6 border rounded-2xl relative group hover:border-accent transition-colors bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg text-primary"><FileText size={20} /></div>
                  <h4 className="font-bold text-primary">{doc.name}</h4>
                </div>
                {upload?.progress === 100 && <CheckCircle size={20} className="text-green-500" />}
              </div>

              {upload ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="truncate max-w-[200px]">{upload.name || 'Uploading...'}</span>
                    <span>{upload.progress}%</span>
                  </div>
                  <Progress value={upload.progress} className="h-2" />
                  {upload.progress === 100 && (
                    <Button variant="ghost" size="sm" onClick={() => setUploads(prev => { const n = {...prev}; delete n[doc.id]; return n; })} className="text-xs text-destructive hover:text-destructive">
                      <X size={14} className="mr-1" /> Remove
                    </Button>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && handleUpload(doc.id, e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <Button variant="outline" className="w-full border-dashed border-2 h-16 group-hover:bg-muted/50">
                    <Upload size={18} className="mr-2" /> Select File
                  </Button>
                </div>
              )}
              <p className="mt-3 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">JPG, PNG or PDF (Max 5MB)</p>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-8 border-t">
        <Button variant="outline" onClick={onBack} className="h-12 px-8">Back</Button>
        <Button 
          disabled={!isAllUploaded} 
          onClick={onNext} 
          className="px-12 bg-primary hover:bg-primary/90 text-white font-bold h-12"
        >
          Next: Final Declaration
        </Button>
      </div>
    </div>
  );
}
