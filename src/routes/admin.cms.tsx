import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, FileText, HelpCircle, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin/cms")({
  component: AdminCMS,
});

const blogs = [
  { id: 1, title: "Top 10 Bus Rental Tips for Weddings", status: "Published", date: "2025-01-15" },
  { id: 2, title: "How to Choose the Right Bus for Corporate Events", status: "Draft", date: "2025-02-01" },
  { id: 3, title: "Budget Guide: Bus Rental Prices in India 2025", status: "Published", date: "2025-01-20" },
];

const faqs = [
  { id: 1, question: "How do I book a bus?", answer: "Submit your requirement and compare quotes from verified operators." },
  { id: 2, question: "What is the cancellation policy?", answer: "Free cancellation up to 48 hours before the journey." },
  { id: 3, question: "Are drivers included in the price?", answer: "Yes, all quotes include driver charges." },
];

function AdminCMS() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Content Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage blogs, FAQs, and pages</p>

      <Tabs defaultValue="blogs">
        <TabsList className="mb-6">
          <TabsTrigger value="blogs" className="gap-1"><FileText className="w-4 h-4" /> Blogs</TabsTrigger>
          <TabsTrigger value="faqs" className="gap-1"><HelpCircle className="w-4 h-4" /> FAQs</TabsTrigger>
          <TabsTrigger value="pages" className="gap-1"><BookOpen className="w-4 h-4" /> Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="blogs">
          <div className="flex justify-end mb-4">
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Blog Post</Button>
          </div>
          <div className="bg-card rounded-xl border border-border">
            {blogs.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
                <div>
                  <h3 className="font-medium text-foreground">{b.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.date} • <span className={b.status === "Published" ? "text-chart-2" : "text-chart-5"}>{b.status}</span></p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs">
          <div className="flex justify-end mb-4">
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add FAQ</Button>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{f.question}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-4">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages">
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Static Pages</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage About Us, Privacy Policy, Terms of Service, and other pages.</p>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Page</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
