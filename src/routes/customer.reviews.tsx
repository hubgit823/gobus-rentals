import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { panelPage } from "@/lib/panel-page";

export const Route = createFileRoute("/customer/reviews")({
  component: CustomerReviews,
});

type Rev = { id: string; rating: number; comment?: string; createdAt?: string };
type ListRes = { reviews: Rev[] };

function CustomerReviews() {
  const qc = useQueryClient();
  const [vendorId, setVendorId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const listQ = useQuery({
    queryKey: ["customer-reviews"],
    queryFn: () => api<ListRes>("/api/customer/reviews"),
  });

  const addMut = useMutation({
    mutationFn: () =>
      api("/api/customer/reviews", {
        method: "POST",
        body: JSON.stringify({
          vendorId,
          rating: Number(rating),
          comment,
        }),
      }),
    onSuccess: () => {
      toast.success("Review saved");
      setComment("");
      qc.invalidateQueries({ queryKey: ["customer-reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reviews = listQ.data?.reviews ?? [];

  return (
    <div className={panelPage.standard}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Reviews</h1>
      <p className="text-muted-foreground text-sm mb-6">Your feedback helps other travelers</p>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-8 space-y-3">
        <h2 className="font-semibold text-foreground text-sm">Add review (vendor ID from your API)</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Vendor ID</Label>
            <Input placeholder="Vendor ID from your API" value={vendorId} onChange={(e) => setVendorId(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Rating (1–5)</Label>
            <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Comment</Label>
          <Textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <Button type="button" size="sm" disabled={addMut.isPending || !vendorId} onClick={() => addMut.mutate()}>
          Submit review
        </Button>
      </div>

      {listQ.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-border rounded-xl p-8 text-center bg-card">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Your review</h3>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < r.rating ? "text-chart-5 fill-chart-5" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              {r.createdAt ? <p className="text-xs text-muted-foreground mb-2">{new Date(r.createdAt).toLocaleString()}</p> : null}
              {r.comment ? <p className="text-sm text-foreground">{r.comment}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
