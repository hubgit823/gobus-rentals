import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, FileText, HelpCircle, BookOpen, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { panelPage, panelStatePadding } from "@/lib/panel-page";

export const Route = createFileRoute("/admin/cms")({
  component: AdminCMS,
});

type Item = {
  id: string;
  kind: string;
  title?: string;
  status: string;
  body?: string;
  question?: string;
  answer?: string;
  slug?: string;
  date: string;
};

type ListRes = { items: Item[] };

type BizRes = {
  legalName: string;
  about: string;
  operatingLocations: string;
  contactPhone: string;
  contactEmail: string;
  gstEnabled: boolean;
  gstPercentage: number;
  commissionPercent: number;
};

function AdminCMS() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"blog" | "faq" | "page">("blog");
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [slug, setSlug] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-cms"],
    queryFn: () => api<ListRes>("/api/admin/cms"),
  });

  const bizQ = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => api<BizRes>("/api/admin/settings"),
  });

  const items = (data?.items ?? []).filter((i) => i.kind === tab);

  const createMut = useMutation({
    mutationFn: () => {
      const kind = tab;
      if (kind === "faq") {
        return api("/api/admin/cms", {
          method: "POST",
          body: JSON.stringify({ kind, question, answer, status: "published" }),
        });
      }
      return api("/api/admin/cms", {
        method: "POST",
        body: JSON.stringify({ kind, title, body, slug: slug || undefined, status: "published" }),
      });
    },
    onSuccess: () => {
      toast.success("Content created");
      setCreateOpen(false);
      setTitle("");
      setBody("");
      setQuestion("");
      setAnswer("");
      setSlug("");
      qc.invalidateQueries({ queryKey: ["admin-cms"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api("/api/admin/cms/" + id, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Removed");
      qc.invalidateQueries({ queryKey: ["admin-cms"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const patchMut = useMutation({
    mutationFn: () =>
      api("/api/admin/cms/" + editItem!.id, {
        method: "PATCH",
        body: JSON.stringify(
          editItem!.kind === "faq"
            ? { question, answer, status: "published" }
            : { title, body, slug, status: "published" },
        ),
      }),
    onSuccess: () => {
      toast.success("Updated");
      setEditItem(null);
      qc.invalidateQueries({ queryKey: ["admin-cms"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (i: Item) => {
    setEditItem(i);
    setTitle(i.title ?? "");
    setBody(i.body ?? "");
    setQuestion(i.question ?? "");
    setAnswer(i.answer ?? "");
    setSlug(i.slug ?? "");
  };

  if (isLoading) return <div className={`${panelStatePadding} text-sm text-muted-foreground`}>Loading…</div>;
  if (error) return <div className={`${panelStatePadding} text-sm text-destructive`}>{(error as Error).message}</div>;

  return (
    <div className={panelPage.standard}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Content Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage blogs, FAQs, and pages</p>

      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Live business profile (Settings)</h2>
        </div>
        {bizQ.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading business info…</p>
        ) : bizQ.data ? (
          <div className="text-sm space-y-2 text-muted-foreground">
            <p><span className="text-foreground font-medium">{bizQ.data.legalName}</span></p>
            <p className="line-clamp-3">{bizQ.data.about}</p>
            <p><span className="text-foreground">Areas:</span> {bizQ.data.operatingLocations}</p>
            <p>
              <span className="text-foreground">Contact:</span> {bizQ.data.contactPhone} · {bizQ.data.contactEmail}
            </p>
            <p>
              <span className="text-foreground">GST:</span> {bizQ.data.gstEnabled ? `${bizQ.data.gstPercentage}% on` : "off"} bookings ·{" "}
              <span className="text-foreground">Commission:</span> {bizQ.data.commissionPercent}% (vendor)
            </p>
            <p className="text-xs pt-2">
              Edit in{" "}
              <Link to="/admin/settings" className="text-primary hover:underline">
                Platform Settings
              </Link>
              .
            </p>
          </div>
        ) : null}
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "blog" | "faq" | "page")}>
        <TabsList className="mb-6">
          <TabsTrigger value="blog" className="gap-1"><FileText className="w-4 h-4" /> Blogs</TabsTrigger>
          <TabsTrigger value="faq" className="gap-1"><HelpCircle className="w-4 h-4" /> FAQs</TabsTrigger>
          <TabsTrigger value="page" className="gap-1"><BookOpen className="w-4 h-4" /> Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <div className="flex justify-end mb-4">
            <Button className="gap-2" type="button" onClick={() => { setTab("blog"); setCreateOpen(true); }}><Plus className="w-4 h-4" /> New Blog Post</Button>
          </div>
          <CmsList items={items} onEdit={openEdit} onDelete={(id) => deleteMut.mutate(id)} />
        </TabsContent>

        <TabsContent value="faq">
          <div className="flex justify-end mb-4">
            <Button className="gap-2" type="button" onClick={() => { setTab("faq"); setCreateOpen(true); }}><Plus className="w-4 h-4" /> Add FAQ</Button>
          </div>
          <div className="space-y-3">
            {items.map((f) => (
              <div key={f.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{f.question}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-4">
                    <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => openEdit(f)}><Edit className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" type="button" onClick={() => deleteMut.mutate(f.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No FAQs.</p> : null}
          </div>
        </TabsContent>

        <TabsContent value="page">
          <div className="bg-card rounded-xl border border-border p-8 text-center mb-4">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Static Pages</h3>
            <p className="text-sm text-muted-foreground mb-4">About, guides, legal pages</p>
            <Button className="gap-2" type="button" onClick={() => { setTab("page"); setCreateOpen(true); }}><Plus className="w-4 h-4" /> Create Page</Button>
          </div>
          <CmsList items={items} onEdit={openEdit} onDelete={(id) => deleteMut.mutate(id)} />
        </TabsContent>
      </Tabs>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New {tab === "faq" ? "FAQ" : tab === "page" ? "page" : "blog post"}</DialogTitle>
          </DialogHeader>
          {tab === "faq" ? (
            <div className="space-y-3">
              <div className="space-y-2"><Label>Question</Label><Input value={question} onChange={(e) => setQuestion(e.target.value)} /></div>
              <div className="space-y-2"><Label>Answer</Label><Textarea rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} /></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              {tab === "page" ? <div className="space-y-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="about-us" /></div> : null}
              <div className="space-y-2"><Label>Body</Label><Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="button" disabled={createMut.isPending} onClick={() => createMut.mutate()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          {editItem?.kind === "faq" ? (
            <div className="space-y-3">
              <div className="space-y-2"><Label>Question</Label><Input value={question} onChange={(e) => setQuestion(e.target.value)} /></div>
              <div className="space-y-2"><Label>Answer</Label><Textarea rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} /></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
              <div className="space-y-2"><Label>Body</Label><Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setEditItem(null)}>Cancel</Button>
            <Button type="button" disabled={patchMut.isPending} onClick={() => patchMut.mutate()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CmsList({
  items,
  onEdit,
  onDelete,
}: {
  items: Item[];
  onEdit: (i: Item) => void;
  onDelete: (id: string) => void;
}) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-8 border rounded-xl bg-card">No items.</p>;
  return (
    <div className="bg-card rounded-xl border border-border">
      {items.map((b) => (
        <div key={b.id} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
          <div>
            <h3 className="font-medium text-foreground">{b.title ?? b.slug ?? b.question}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{b.date} • <span className={b.status === "Published" ? "text-chart-2" : "text-chart-5"}>{b.status}</span></p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => onEdit(b)}><Edit className="w-3.5 h-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" type="button" onClick={() => onDelete(b.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
}
